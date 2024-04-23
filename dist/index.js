import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import fs from "fs";
import http from "http";
import path from "path";
import { resolvers } from "./resolvers/index";
const option = "utf-8";
const typeDefs = [
    fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
];
dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 4000;
const pluginDef = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
];
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: pluginDef,
});
await server.start();
app.use("/", cors(), express.json(), expressMiddleware(server, {
    context: async ({ req, res }) => ({ token: req.headers.token }),
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
app.listen(port, () => {
    console.log(`server is running at http://localhost::${port}`);
});
