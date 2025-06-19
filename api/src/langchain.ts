import Elysia, { t } from "elysia";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { connectionConfig } from "./connection";

export const langchain = new Elysia({
  prefix: '/langchain',
})
  .post('/search', async ({ body: { keyword } }) => {
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

    const result = await retrieverChain.invoke({
      input: keyword,
    });
    const { answer } = result
    const [luckyPrediction = '', luckyNumber = ''] = answer.split('เลขนำโชค')

    return {
      keyword,
      answer,
      luckyPrediction,
      luckyNumber,
    };
  }, {
    body: t.Object({
      keyword: t.String(),
    }),
  });
