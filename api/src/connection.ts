import type { DistanceStrategy } from "@langchain/community/vectorstores/pgvector";
import type { PoolConfig } from "pg";

export const connectionConfig = {
  postgresConnectionOptions: {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  } as PoolConfig,
  tableName: "dream_document",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
  // supported distance strategies: cosine (default), innerProduct, or euclidean
  distanceStrategy: "cosine" as DistanceStrategy,
};