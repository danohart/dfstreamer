const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 4444;
// The `listen` method launches a web server.
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server is running http://localhost:${PORT}`));

server.applyMiddleware({ app, path: '*' });

module.exports = app;
