import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { withData } from "../lib/withData";

export const USER_INFO = gql`
  query USER_INFO($twitchUser: String!, $user_id: String!) {
    twitchUser(twitchUser: $twitchUser) {
      id
      display_name
      offline_image_url
    }
    twitchUserStream(user_id: $user_id) {
      user_name
      type
    }
  }
`;

function Stream(props) {
  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { twitchUser: props.twitchUser, user_id: props.twitchUser },
  });
  if (loading) return <p>Loading ...</p>;
  if (error)
    return (
      <>
        <h3>Sorry, there was an error.</h3>
        <p>{error.message}</p>
      </>
    );
  const video = data.twitchUser[0];
  if (data.twitchUserStream == "")
    return (
      <div className="stream-wrapper">
        <img src={video.offline_image_url} />
      </div>
    );
  return (
    <>
      <div className="stream-wrapper" key={video.id}>
        <div className="stream">
          <iframe
            src={`https://player.twitch.tv/?channel=${video.display_name}&parent=distancefest.com&autoplay=false`}
            height="300"
            width="900"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div className="fullscreen">View Fullscreen</div>
      </div>
    </>
  );
}

export default withData()(Stream);
