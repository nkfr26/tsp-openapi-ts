import { Hono } from "hono";
import { components, paths } from "@workspace/openapi-typescript/src/schema";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/widgets", (c) => {
  try {
    return c.json<
      paths["/widgets"]["get"]["responses"]["200"]["content"]["application/json"]
    >({
      items: [{ id: "string", weight: 0, color: "red" }],
    });
  } catch (err) {
    return c.json<components["schemas"]["Error"]>({
      code: 500,
      message: "エラーが発生しました",
    });
  }
});

export default app;
