import { createServer } from "miragejs";

import data from "./data.json";

export const makeServer = () => {
  return createServer({
    routes() {
      this.namespace = "api";

      this.get("/bookable", (schema, request) => {
        console.log(request.queryParams);
        return data;
      });
    },
  });
};
