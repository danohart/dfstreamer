import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Notification(props) {
  return (
    <div className="notification">
      <div className="notification-close">
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className="notification-title">
        <span>{props.twitchUserName}</span> started streaming
      </div>
      {/* {data.twitchUserStream.viewer_count ? (
      <div className="notification-message">
        Current viewers: {data.twitchUserStream.viewer_count}
      </div>
    ) : (
      ''
    )} */}
    </div>
  );
}

export default Notification;
