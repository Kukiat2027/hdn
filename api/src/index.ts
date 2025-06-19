import { Elysia } from "elysia";
// import { multipart } from '@elysiajs/multipart'
import { image } from "./image";
import { langchain } from "./langchain";

const app = new Elysia()
  .use(langchain)
  .use(image)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
