const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('now-env');
const app = express();

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 4444;

app.listen(PORT, function() {
  console.log(`🚀 Server is running http://localhost:${PORT}`);
});

server.applyMiddleware({ app, path: '*' });

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

module.exports = app;
