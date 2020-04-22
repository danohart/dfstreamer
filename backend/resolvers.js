const fetch = require('isomorphic-unfetch');
require('now-env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twitchClientID = process.env.twitchClientID;

const resolvers = {
  Mutation: {
    async createEvent(parent, args, ctx, info) {
      console.log({ ...args, hello: 'there' });
      event = await db.collection('schedule').insertOne(args);
      return args;
    },

    async signup(parent, args, res, info) {
      console.log('args', args);
      args.email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);
      const user = await db.collection('users').insertOne({
        ...args,
        password,
        permissions: { set: ['USER'] },
      });
      // // create the JWT token for them
      // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      // // We set the jwt as a cookie on the response
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
      // });
      console.log(`User created with email ${args.email}`);
      return args;
    },
  },

  Query: {
    events: async () => {
      values = await db.collection('schedule').find().toArray().then(res => {
        return res;
      });
      return values;
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
        `https://api.twitch.tv/helix/streams?${!user_id ? '' : `user_login=${user_id}`}`,
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
};

module.exports = resolvers;
