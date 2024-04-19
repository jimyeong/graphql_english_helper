import express, { Application, Express, Request, Response } from "express";
import dotenv from "dotenv";
import { GraphQLSchema, buildSchema } from "graphql";
import { createHandler } from "graphql-http";
import { ruruHTML } from "ruru/server";
import { ApolloServer, gql, ServerRegistration } from "apollo-server-express";

// Import your GraphQL schema
// import typeDefs from "./schema.graphql";
const typeDefs = `
  type Query {
    hello: String
  }
`;

dotenv.config();

const app = express() as ServerRegistration["app"];
const port = process.env.PORT || 4000;
const resolvers = {
  Query: {
    hello: () => "hello world",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

let applicationMiddlewareOption: ServerRegistration = { app };
server.applyMiddleware(applicationMiddlewareOption);

app.listen(port, () => {
  console.log(`server is running at http://localhost::${port}`);
});
