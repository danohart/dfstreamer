const { gql } = require('apollo-server-express');

const typeDefs = gql`

  enum Permission {
    ADMIN
    USER
    EVENTCREATE
    EVENTUPDATE
    EVENTDELETE
    PERMISSIONUPDATE
  }

  type User {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    resetToken: String
    resetTokenExpiry: Float
    permissions: [Permission] 
  }

  type Event {
    title: String
    host: String
    date: String
    startTime: String
    endTime: String
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
      viewer_count: String
  }

  type Query {
    events: [Event]
    twitchUser(twitchUser: String!): [TwitchUser]
    twitchUserVideos(id: ID!): [TwitchUserVideo]
    twitchUserStream(user_id: String): [TwitchUserStream]
  }

  type Mutation {
    createEvent(
      title: String
      host: String
      date: String
      startTime: String
      endTime: String
    ): Event!

    signup(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User!
  }
`;

module.exports = typeDefs;
