const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type TwitchUser {
      id: String
      display_name: String
      description: String
      profile_image_url: String
      offline_image_url: String
      broadcaster_type: String
      stream: [TwitchUserStream]
  }

  type TwitchUserVideo {
      id: String
      user_id: String
      user_name: String
      title: String
      description: String
      url: String
      thumbnail_url: String
      duration: String
  }

  type TwitchUserStream {
      id: String
      user_id: String
      user_name: String
      title: String
      type: String
      thumbnail_url: String
  }

  type Query {
    books: [Book]
    twitchUser(twitchUser: String!): [TwitchUser]
    twitchUserVideos(id: ID!): [TwitchUserVideo]
    twitchUserStream(user_id: String!): [TwitchUserStream]
  }
`;

module.exports = typeDefs;
