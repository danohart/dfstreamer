const events = [
  {
    title: 'Weezer',
    host: 'df_thelivingroom',
    date: '05012020',
    startTime: '14:00',
    endTime: '14:30',
  },
  {
    title: 'The Strokes',
    host: 'df_thebedroom',
    date: '05012020',
    startTime: '14:30',
    endTime: '16:00',
  },
  {
    title: 'Run The Jewels',
    host: 'df_thegarage',
    date: '05012020',
    startTime: '16:00',
    endTime: '18:00',
  },
];

const fetch = require('isomorphic-unfetch');
require('now-env');
const twitchClientID = process.env.twitchClientID;

const resolvers = {
  Query: {
    events: () => events,

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
        `https://api.twitch.tv/helix/streams?user_login=${user_id}`,
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
