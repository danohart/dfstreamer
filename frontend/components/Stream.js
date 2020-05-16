import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { withData } from '../lib/withData';

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
  const video = props.twitchUser;

  return (
    <>
      <div className='stream-wrapper' key={video.id}>
        <h4 className='title center-align'>
          {video == 'df_thelivingroom'
            ? 'Living Room'
            : video == 'df_thebedroom'
            ? 'Bedroom'
            : video == 'df_thegarage'
            ? 'Garage'
            : video}
        </h4>
        <div className='stream'>
          <div className='video'>
            <iframe
              src={`https://player.twitch.tv/?channel=${video}&parent=distancefest.com&autoplay=true&muted=true`}
              height='300'
              width='900'
              frameBorder='0'
              scrolling='no'
            ></iframe>
          </div>
        </div>
        <div className='fullscreen' onClick={props.switchStream}>
          View Fullscreen
        </div>
      </div>
    </>
  );
}

export default withData()(Stream);
