const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('now-env');
const app = express();
const cors = require('cors');

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST'] }));

const connectMongo = require('./db');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const startServer = async function () {
  const mongo = await connectMongo();

  console.log('HELLO MONGO', { mongo });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { mongo },
  });

  server.applyMiddleware({ app, path: '*' });

  const PORT = 4444;

  app.listen(PORT, function () {
    console.log(`🚀 Server is running http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;
