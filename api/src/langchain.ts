import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { AzureChatOpenAI, AzureOpenAIEmbeddings, ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import Elysia, { t } from "elysia";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import OpenAI from "openai";
import { connectionConfig } from "./connection";

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
