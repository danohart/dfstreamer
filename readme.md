# DF Streamer

## The Multi-stream Website to mimic physical, multiple stage events, but online

Utilizing the [Twitch API](https://dev.twitch.tv/), DF Streamer is a React frontend, Node/Apollo-Server backend, stream switcher. Just plug in the Twitch username where applicable, and then your viewers can pick what "stage" they want to watch.

## How to Get Up and Running

The frontend and backend are split into two folders in this repository, clone the repo, then in each folder, run...

`npm install`

...then...

`npm run dev`

...to run a local copy. Customize as necessary.

## Local Environment Variables

### Backend

The backend folder uses a now.json file for .env variables. See a sample ...

```
{
  "env": {
    "twitchClientID": "TwitchApiId",
    "dbPassword": "MongoDB Password",
    "APP_SECRET": "Secret for JWT"
  },
}
```

### Frontend

The frontend folder will live on the client side, so no secret variables should be placed in here that you don't want others to know. This uses a config.js file. See a sample ...

```
export const endpoint = `http://localhost:4444`;
export const prodEndpoint = `https://mybackendurl.now.sh/`;
```

## Update Version

This readme is a work in progress. Each folder also has a boilerplate readme to further explain the framework each side is built on. Feel free to open a PR and update for further explaination.
