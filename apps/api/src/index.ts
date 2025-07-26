import { Hono } from "hono";
import {
  components,
  paths,
} from "@workspace/tsp-openapi-ts/openapi-ts-output/schema";
import { cors } from "hono/cors";
import openApiDoc from "@workspace/tsp-openapi-ts/tsp-output/schema/openapi.json";
import { swaggerUI } from "@hono/swagger-ui";

const app = new Hono();

app.use("/*", cors());

app.get("/doc", (c) => c.json(openApiDoc));
app.get("/ui", swaggerUI({ url: "/doc" }));

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
