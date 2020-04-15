const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 4000;
// The `listen` method launches a web server.
app.listen(port, () =>
  console.log(`🚀 Server is running http://localhost:${port}`));

server.applyMiddleware({ app, path: "*" });

module.exports = app;
