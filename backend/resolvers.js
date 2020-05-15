const fetch = require('isomorphic-unfetch');
require('now-env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twitchClientID = process.env.twitchClientID;
const MongoClient = require('mongodb').MongoClient;

const dbPassword = process.env.dbPassword;
const dbUrl = `mongodb+srv://danielhart:${dbPassword}@cluster0-zfdv9.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(function (err) {
  db = client.db('dfstreamer');
  console.log('😎 mongoDB connected');
});

const events = [
  {
    title: 'Mark Rose',
    host: 'df_thebedroom',
    date: '05162020',
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    title: 'Sam Heinrichson',
    host: 'df_thegarage',
    date: '05162020',
    startTime: '17:30',
    endTime: '18:00',
  },
  {
    title: 'Norman Lake',
    host: 'df_thelivingroom',
    date: '05162020',
    startTime: '18:00',
    endTime: '18:30',
  },
  {
    title: 'Grey Slush',
    host: 'df_thebedroom',
    date: '05162020',
    startTime: '18:30',
    endTime: '19:00',
  },
  {
    title: 'Austin Fillmore',
    host: 'df_thelivingroom',
    date: '05162020',
    startTime: '19:00',
    endTime: '19:45',
  },
  {
    title: 'HEAVENWORLD (DJ Set A)',
    host: 'df_thebedroom',
    date: '05162020',
    startTime: '19:45',
    endTime: '20:30',
  },
  {
    title: 'b lowd',
    host: 'df_thegarage',
    date: '05162020',
    startTime: '20:30',
    endTime: '21:15',
  },
  {
    title: 'darkhurst',
    host: 'df_thegarage',
    date: '05162020',
    startTime: '21:15',
    endTime: '22:00',
  },
  {
    title: 'Bodyman',
    host: 'df_thebedroom',
    date: '05162020',
    startTime: '22:00',
    endTime: '23:00',
  },
  {
    title: 'Vertical Axium',
    host: 'df_thegarage',
    date: '05162020',
    startTime: '23:00',
    endTime: '00:00',
  },
];

const events2 = [
  {
    title: 'DYSTOPIA KID',
    host: 'df_thegarage',
    date: '05172020',
    startTime: '15:30',
    endTime: '16:00',
  },
  {
    title: 'Spencer Lantz',
    host: 'df_thelivingroom',
    date: '05172020',
    startTime: '16:00',
    endTime: '16:30',
  },
  {
    title: 'Mel Senese',
    host: 'df_thebedroom',
    date: '05172020',
    startTime: '16:30',
    endTime: '17:00',
  },
  {
    title: 'The Evening Attraction',
    host: 'df_thegarage',
    date: '05172020',
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    title: 'Rain Garden ',
    host: 'df_thelivingroom',
    date: '05172020',
    startTime: '17:30',
    endTime: '18:00',
  },
  {
    title: 'Tyronic',
    host: 'df_thebedroom',
    date: '05172020',
    startTime: '18:00',
    endTime: '18:30',
  },
  {
    title: '??? (YBC Tha Nerd)',
    host: 'df_thegarage',
    date: '05172020',
    startTime: '18:30',
    endTime: '19:00',
  },
  {
    title: 'Terribly Happy',
    host: 'df_thelivingroom',
    date: '05172020',
    startTime: '19:00',
    endTime: '19:45',
  },
  {
    title: 'Bluprint',
    host: 'df_thebedroom',
    date: '05172020',
    startTime: '19:45',
    endTime: '20:30',
  },
  {
    title: 'The Royalists',
    host: 'df_thegarage',
    date: '05172020',
    startTime: '20:30',
    endTime: '21:15',
  },
  {
    title: 'HEAVENWORLD (DJ SET B)',
    host: 'df_thelivingroom',
    date: '05172020',
    startTime: '21:15',
    endTime: '22:00',
  },
  {
    title: 'NUMA',
    host: 'df_thebedroom',
    date: '05172020',
    startTime: '22:00',
    endTime: '23:00',
  },
  {
    title: 'Collin Reeve',
    host: 'df_thegarage',
    date: '05172020',
    startTime: '23:00',
    endTime: '00:00',
  },
];

const resolvers = {
  Query: {
    events() {
      return events;
    },

    events2() {
      return events2;
    },

    async twitchUser(parent, args) {
      const { twitchUser } = args;
      const response = await fetch(
        `https://api.twitch.tv/helix/users?login=${twitchUser}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Client-ID': `${twitchClientID}`,
          },
        }
      );
      const twitchUserInfo = await response.json();
      return twitchUserInfo.data;
    },

    async twitchUserVideos(parent, args) {
      const { id } = args;
      const response = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Client-ID': `${twitchClientID}`,
          },
        }
      );
      const twitchVideoInfo = await response.json();
      return twitchVideoInfo.data;
    },

    async twitchUserStream(parent, args) {
      const { user_id } = args;
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?${
          !user_id ? '' : `user_login=${user_id}`
        }`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Client-ID': `${twitchClientID}`,
          },
        }
      );
      const twitchVideoInfo = await response.json();
      return twitchVideoInfo.data;
    },
  },

  Mutation: {
    async createEvent(parent, args, ctx, info) {
      console.log({ ...args, hello: 'there' });
      event = await db.collection('schedule').insertOne(args);
      return args;
    },

    async signup(parent, args, res, info) {
      args.email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);

      const user = await db.collection('users').insertOne(
        {
          ...args,
          password,
          permissions: ['USER'],
        },
        function (error, response) {
          if (error) {
            console.log('Error occurred while inserting');
            // return
          } else {
            const userCreated = response.ops[0];
            console.log('inserted record', userCreated);
            return userCreated;
          }
        }
      );
      return args;
    },
  },
};

module.exports = resolvers;
