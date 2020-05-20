const fetch = require('isomorphic-unfetch');
require('now-env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twitchClientID = process.env.twitchClientID;

const resolvers = {
  Query: {
    events: async (root, data, { mongo: { dfstreamer } }) => {
      return await dfstreamer.collection('schedule').find().toArray();
    },

    currentStream: async (root, data, { mongo: { dfstreamer } }) => {
      return await dfstreamer.collection('currentstream').findOne();
    },

    async twitchUser(parent, args) {
      const { twitchUser } = args;
      const response = await fetch(
        `https://api.twitch.tv/helix/users?login=${twitchUser}`,
        {
          method: 'GET',
          headers: {
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

    switchStream: async (root, data, { mongo: { dfstreamer } }) => {
      const response = await dfstreamer
        .collection('currentstream')
        .update({ $set: { streamer: data } }); // 3
      return console.log('i did it'); // 4
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
