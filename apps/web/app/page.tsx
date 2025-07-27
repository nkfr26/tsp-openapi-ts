"use client";

import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "@workspace/tsp-openapi-ts/openapi-ts-output/schema";

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:8787",
});
const $api = createClient(fetchClient);

export default function Page() {
  const { data, error, isLoading } = $api.useQuery("get", "/widgets");

  if (isLoading || !data) return "Loading...";

  if (error) return `An error occured: ${error.message}`;

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{JSON.stringify(data.items)}</h1>
      </div>
    </div>
  );
}
