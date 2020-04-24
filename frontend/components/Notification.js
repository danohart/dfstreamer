import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Notification(props) {
  return (
    <div className={props.show ? 'notification open' : 'notification'}>
      <div className="notification-close">
        <FontAwesomeIcon icon={faTimes} onClick={props.isOpen} />
      </div>
      <div className="notification-title">
        Switched to <span>{props.twitchUserName}</span>
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
