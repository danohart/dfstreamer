const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('now-env');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const dbPassword = process.env.dbPassword;
const dbUrl = `mongodb+srv://danielhart:${dbPassword}@cluster0-zfdv9.mongodb.net/test?retryWrites=true&w=majority`;

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const PORT = 4444;

const client = new MongoClient(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1,
});

const database = client.connect(function (err, client) {
  db = client.db('dfstreamer');
  console.log('😎 mongoDB connected');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  database,
});

server.applyMiddleware({ app, path: '*' });

app.listen(PORT, function () {
  console.log(`🚀 Server is running http://localhost:${PORT}`);
});

// Enable CORS
app.use(function (req, res, next) {
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
