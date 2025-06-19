import { Elysia, t } from "elysia";
import OpenAI from "openai";

export const image = new Elysia({ prefix: '/image' })
  .post('', async () => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });


      const response = await openai.responses.create({
        model: "gpt-4.1-mini-2025-04-14",
        input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
        tools: [{ type: "image_generation" }],
      });

      return response
    } catch (error) {
      console.log(error)
    }
  })
