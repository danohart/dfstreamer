import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withData } from "../lib/withData";

export const ALL_USER_VIDEOS_QUERY = gql`
  query ALL_USER_VIDEOS_QUERY($user_id: ID!) {
    twitchUserVideos(id: $user_id) {
      id
      user_id
      user_name
      thumbnail_url
      url
    }
  }
`;

function Videos(props) {
  const { loading, error, data } = useQuery(ALL_USER_VIDEOS_QUERY, {
    variables: { user_id: props.userId },
  });
  if (loading) return <p>Loading ...</p>;
  if (error)
    return (
      <>
        <h3>Sorry, there was an error.</h3>
        <p>{error.message}</p>
      </>
    );
  return (
    <>
      <h1 className="center-align">
        {data.twitchUserVideos[0].user_name.split("_")[1]} Videos
      </h1>
      <div className="video-container">
        {data.twitchUserVideos.map((video) => (
          <div className="video-wrapper" key={video.id}>
            <div className="video">
              <iframe
                src={`https://player.twitch.tv/?video=${video.id}&parent=distancefest.com&branding=false&autoplay=false`}
                height="300"
                width="900"
                frameBorder="0"
                scrolling="no"
                allowFullScreen="yes"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default withData()(Videos);
