import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Stream from './Stream';

import { withData } from '../lib/withData';

export const USER_INFO = gql`
  query USER_INFO($twitchUser: String!) {
    twitchUser(twitchUser: $twitchUser) {
      id
      display_name
    }
  }
`;

function LiveStream(props) {
  const { loading, error, data } = useQuery(USER_INFO, {
    variables: { twitchUser: props.twitchUser },
  });
  if (loading)
    return (
      <div className="stream-container">
        <div className="stream-wrapper">
          <div className="stream">
            <h1>LOADING...</h1>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <>
        <h3>Sorry, there was an error.</h3>
        <p>{error.message}</p>
      </>
    );

  if (!data.twitchUser || !data.twitchUser.length)
    return (
      <div className="stream-container">
        <div className="stream-wrapper">
          <h2>No user {props.twitchUser}. Please try again.</h2>
        </div>
      </div>
    );

  const video = data.twitchUser[0];

  return (
    <>
      <h1 className="center-align">{video.display_name}</h1>
      <div className="stream-container">
        <div className="stream-wrapper" key={video.id}>
          <div className="stream">
            <iframe
              src={`https://player.twitch.tv/?channel=${video.display_name}&parent=distancefest.com&autoplay=true&muted=false`}
              height="300"
              width="900"
              frameBorder="0"
              scrolling="no"
              allowFullScreen="yes"
            ></iframe>
          </div>
        </div>
        <div className="stream-thumbs">
          <Stream twitchUser="df_thelivingroom" />
          <Stream twitchUser="df_thegarage" />
          <Stream twitchUser="df_thebedroom" />
        </div>
      </div>
    </>
  );
}

export default withData()(LiveStream);
