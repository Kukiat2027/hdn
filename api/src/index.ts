import { Elysia } from "elysia";
// import { multipart } from '@elysiajs/multipart'
import { langchain } from "./langchain";

const app = new Elysia()
  .use(langchain)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
