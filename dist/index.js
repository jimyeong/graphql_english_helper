import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
const typeDefs = `
  type Query {
    hello: String
  }
`;
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const resolvers = {
    Query: {
        hello: () => "hello world",
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
let applicationMiddlewareOption = { app };
server.applyMiddleware(applicationMiddlewareOption);
app.listen(port, () => {
    console.log(`server is running at http://localhost::${port}`);
});
