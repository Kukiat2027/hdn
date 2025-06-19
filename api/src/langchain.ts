import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { AzureChatOpenAI, AzureOpenAIEmbeddings, ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import Elysia, { t } from "elysia";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { connectionConfig } from "./connection";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import OpenAI from "openai";

const whiteList = {
  'ฝันเปียก': {
    answer: 'ทำนายว่าเป็นคนชื่อเก่งเท่านั้น',
    lucky: ['123'],
    outputText: '**ฝันเปียก** หรือ Wet Dream (ชื่อทางวิทยาศาสตร์: Nocturnal emission) เป็นคนชื่อเก่งเท่านั้นที่ฝันเปียก'
  },
  'ฝันแห้ง': {
    answer: 'ทำนายว่าเป็นคนชื่อเก่งเท่านั้น',
    lucky: ['123'],
    outputText: '**ฝันแห้ง** หรือ Dry Dream (ชื่อทางวิทยาศาสตร์: Nocturnal emission) เป็นคนชื่อเก่งเท่านั้นที่ฝันแห้ง'
  }
}
export const langchain = new Elysia({
  prefix: '/langchain',
})
  .post('/search', async ({ body: { keyword } }) => {
    // whitelist user
    if (whiteList[keyword as keyof typeof whiteList]) {
      return whiteList[keyword as keyof typeof whiteList]
    }

    const llm = new ChatOpenAI({
      model: "gpt-4.1-mini",
      temperature: 0.5,
    });

    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-large'
    });

    const vectorStore = await PGVectorStore.initialize(
      embeddings,
      connectionConfig
    );

    const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the user's question based ONLY on the following context:
      <context>
      {context}
      </context>
      Question: {input}
    `);

    const retriever = vectorStore.asRetriever({ k: 8 });
    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt,
    });
    const retrieverChain = await createRetrievalChain({
      retriever,
      combineDocsChain,
    });

    let { answer } = await retrieverChain.invoke({
      input: keyword,
    });

    let luckyNumber: string[] = answer.match(/\b\d{2,3}\b/g) ?? []
    // option on review
    const client = new OpenAI();
    // const { output_text } = await client.responses.create({
    //   model: "gpt-4.1",
    //   input: keyword
    // });

    if (luckyNumber.length <= 0) {
      const response = await client.responses.create({
        model: "gpt-4.1",
        input: `${keyword} มีเลขนำโชคอะไรบ้าง`
      });
      // luckyNumber = response.output_text.match(/\b\d{2,3}\b/g) ?? []
      luckyNumber = Array.from({ length: 100 }, (_, i) => i).map(i => i.toString().padStart(2, '0'))
    }

    if (answer.includes('ไม่มีคำทำนาย')) {
      const response = await client.responses.create({
        model: "gpt-4.1",
        input: `${keyword} มีคำทำนายอะไรบ้าง`
      });

      answer = response.output_text
    }


    return {
      keyword,
      answer,
      luckyNumber,
      outputText: '',
    };
  }, {
    body: t.Object({
      keyword: t.String(),
    }),
  })
  .post('/upload', async () => {
    const loader = new TextLoader("./src/data/keng.txt");
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 20,
    });
    const chunks = await splitter.splitDocuments(docs);
    console.log(chunks)
    const embeddings = new OpenAIEmbeddings({
      // model: 'gpt-4.1-mini'
      // model: 'gpt-4.1-mini'
      model: 'text-embedding-3-large'
    });
    // Initialize PostgreSQL vector store
    const vectorStore = await PGVectorStore.initialize(
      embeddings,
      connectionConfig
    );

    console.log('initialized')
    // Add documents to the vector store
    await vectorStore.addDocuments(chunks);

    return {
      result: 'success'
    }
  })
  .post('/search-az', async ({ body: { keyword } }) => {
    const loader = new TextLoader("./src/data/data3.txt");
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });
    const chunks = await splitter.splitDocuments(docs);

    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "";
    const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "";
    const apiVersion = "2025-01-01-preview";

    const embeddings = new AzureOpenAIEmbeddings({
      azureOpenAIApiEmbeddingsDeploymentName: "text-embedding-ada-002",
      azureOpenAIApiVersion: "2023-05-15",
      azureOpenAIApiKey: "bba1ed7f75084de59cb547e9d8876807",
      azureOpenAIBasePath:
        "https://chaiwat-n-ai-aiservices.cognitiveservices.azure.com/openai/deployments",
    });
    const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

    const llm = new AzureChatOpenAI({
      model: "gpt-4o",
      temperature: 1,
      maxTokens: undefined,
      maxRetries: 2,
      azureOpenAIApiKey: apiKey,
      azureOpenAIApiInstanceName: endpoint,
      azureOpenAIApiDeploymentName: "o4-mini", // 🛠 เปลี่ยนเป็น deployment ของ gpt-4o
      azureOpenAIApiVersion: apiVersion,
    });

    // const llm = new ChatOpenAI({
    //   model: "gpt-4o-mini",
    //   temperature: 0.5,
    // });

    const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the user's question based ONLY on the following context:
      <context>
      {context}
      </context>
      Question: {input}
      `);

    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt,
    });

    const retriever = vectorStore.asRetriever({ k: 8 });

    const retrieverChain = await createRetrievalChain({
      retriever,
      combineDocsChain,
    });

    const result = await retrieverChain.invoke({
      input: keyword,
    }); try {
      const loader = new TextLoader("./src/data/data3.txt");
      const docs = await loader.load();

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });
      const chunks = await splitter.splitDocuments(docs);

      const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "";
      const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "";
      const apiVersion = "2025-01-01-preview";

      const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiEmbeddingsDeploymentName: "text-embedding-ada-002",
        azureOpenAIApiVersion: "2023-05-15",
        azureOpenAIApiKey: "bba1ed7f75084de59cb547e9d8876807",
        azureOpenAIBasePath:
          "https://chaiwat-n-ai-aiservices.cognitiveservices.azure.com/openai/deployments",
      });
      const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

      const llm = new AzureChatOpenAI({
        model: "gpt-4o",
        temperature: 1,
        maxTokens: undefined,
        maxRetries: 2,
        azureOpenAIApiKey: apiKey,
        azureOpenAIApiInstanceName: endpoint,
        azureOpenAIApiDeploymentName: "o4-mini", // 🛠 เปลี่ยนเป็น deployment ของ gpt-4o
        azureOpenAIApiVersion: apiVersion,
      });

      // const llm = new ChatOpenAI({
      //   model: "gpt-4o-mini",
      //   temperature: 0.5,
      // });

      const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the user's question based ONLY on the following context:
        <context>
        {context}
        </context>
        Question: {input}
        `);

      const combineDocsChain = await createStuffDocumentsChain({
        llm,
        prompt,
      });

      const retriever = vectorStore.asRetriever({ k: 8 });

      const retrieverChain = await createRetrievalChain({
        retriever,
        combineDocsChain,
      });

      const result = await retrieverChain.invoke({
        input: keyword,
      });
      return result;
    } catch (error) {
      console.log(error)
    }
    return result;
  }, {
    body: t.Object({
      keyword: t.String(),
    }),
  })
  .post('/generate-image', async ({ body: { prompt } }) => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const result = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json",
      });

      if (result.data && result.data[0].b64_json) {
        return {
          success: true,
          image: result.data[0].b64_json
        };
      }

      return {
        success: false,
        error: "No image data received"
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }, {
    body: t.Object({
      prompt: t.String(),
    }),
  })
