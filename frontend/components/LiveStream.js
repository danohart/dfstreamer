import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
      <>
        <h1 className="center-align">Please Wait</h1>
        <div className="stream-container">
          <div className="stream-wrapper">
            <div className="stream">
              <h1>LOADING...</h1>
            </div>
          </div>
        </div>
      </>
    );
  if (error)
    return (
      <>
        <h3>Sorry, there was an error.</h3>
        <p>{error.message}</p>
      </>
    );

  const video = props.twitchUser;

  return (
    <>
      <h1 className="center-align">
        {video == 'df_thelivingroom'
          ? 'Living Room'
          : video == 'df_thebedroom'
          ? 'Bedroom'
          : video == 'df_thegarage'
          ? 'Garage'
          : video}
      </h1>
      <div className="stream-container">
        <div className="stream-wrapper" key={video.id}>
          <div className="stream">
            <iframe
              src={`https://player.twitch.tv/?channel=${video}&parent=distancefest.com&autoplay=true&muted=false`}
              height="300"
              width="900"
              frameBorder="0"
              scrolling="no"
              allowFullScreen="yes"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default withData()(LiveStream);
