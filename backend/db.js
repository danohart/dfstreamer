const { MongoClient } = require('mongodb');

const dbPassword = process.env.dbPassword;
const dbUrl = `mongodb+srv://danielhart:${dbPassword}@cluster0-zfdv9.mongodb.net/test?retryWrites=true&w=majority`;

// module.exports = async () => {
//   client.connect(function (err, client) {
//     db = client.db('dfstreamer');
//     console.log('😎 mongoDB connected');
//     return db;
//   });
// };

// module.exports = async function () {
//   MongoClient.connect(
//     dbUrl,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     async function (err, client) {
//       const db = client.db('dfstreamer');
//     }
//   );

//   console.log('😎 mongoDB connected');
// };

module.exports = async () => {
  const db = await MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('this is it', db);
  return { dfstreamer: db.db('dfstreamer') };
};
