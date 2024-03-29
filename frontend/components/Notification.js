import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Notification(props) {
  return (
    <div className={props.show ? 'notification open' : 'notification'}>
      <div className='notification-close'>
        <FontAwesomeIcon icon={faTimes} onClick={props.isOpen} />
      </div>
      <div className='notification-title'>
        Switched to{' '}
        <span>
          {props.twitchUserName == 'df_thelivingroom'
            ? 'Living Room'
            : props.twitchUserName == 'df_thebedroom'
            ? 'Bedroom'
            : props.twitchUserName == 'df_thegarage'
            ? 'Garage'
            : props.twitchUserName}
        </span>
      </div>
    </div>
  );
}

export default Notification;
