import express from "express";
import dotenv from "dotenv";
import { ApolloServer, gql, ServerRegistration } from "apollo-server-express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import fs from "fs";
import http from "http";
import path from "path";

// import * as typeDefs from "./schema.graphql";
import { resolvers } from "./resolvers/index";
import { ApolloServerPlugin, BaseContext } from "@apollo/server";
import { PluginDefinition } from "apollo-server-core";
// Import your GraphQL schema
// import typeDefs from "./schema.graphql";

const option: BufferEncoding = "utf-8";

// const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
// how can i take schemafile to dist folder
const typeDefs = [
  fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
];

interface MyContext extends BaseContext {
  token?: string;
}
dotenv.config();

const app = express();

const httpServer = http.createServer(app);
const port = process.env.PORT || 4000;

const pluginDef = [
  ApolloServerPluginDrainHttpServer({ httpServer }),
] as PluginDefinition[];

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: pluginDef,
});

await server.start();

app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server as any, {
    context: async ({ req, res }) => ({ token: req.headers.token }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

app.listen(port, () => {
  console.log(`server is running at http://localhost::${port}`);
});
