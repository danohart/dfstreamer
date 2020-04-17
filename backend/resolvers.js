const fetch = require('isomorphic-unfetch');
require('now-env');
const twitchClientID = process.env.twitchClientID;

const events = [
  {
    title: 'Lil Wayne',
    host: 'df_thelivingroom',
    date: '05012020',
    startTime: '14:00',
    endTime: '14:30',
  },
  {
    title: 'Hozier',
    host: 'df_thebedroom',
    date: '05012020',
    startTime: '14:30',
    endTime: '16:00',
  },
  {
    title: 'The Revivalists',
    host: 'df_thegarage',
    date: '05012020',
    startTime: '16:00',
    endTime: '18:00',
  },
  {
    title: 'Weezer',
    host: 'df_thelivingroom',
    date: '05012020',
    startTime: '16:00',
    endTime: '18:30',
  },
  {
    title: 'Tame Impala',
    host: 'df_thebedroom',
    date: '05012020',
    startTime: '18:00',
    endTime: '19:30',
  },
  {
    title: 'The Strokes',
    host: 'df_thegarage',
    date: '05012020',
    startTime: '19:30',
    endTime: '21:30',
  },
  {
    title: 'Childish Gambino',
    host: 'df_thebedroom',
    date: '05012020',
    startTime: '21:00',
    endTime: '22:30',
  },
];

const resolvers = {
  Query: {
    events() {
      return events;
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
