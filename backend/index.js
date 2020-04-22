const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const MongoClient = require('mongodb').MongoClient;
require('now-env');
const app = express();

const dbPassword = process.env.dbPassword;
const dbUrl = `mongodb+srv://danielhart:${dbPassword}@cluster0-zfdv9.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(function(err) {
  console.log('😎 mongoDB connected');
  db = client.db('dfstreamer');
});

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 4444;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server is running http://localhost:${PORT}`));

server.applyMiddleware({ app, path: '*' });

module.exports = app;
