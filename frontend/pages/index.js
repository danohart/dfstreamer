import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import LiveStream from '../components/LiveStream';
import Stream from '../components/Stream';
import Events from '../components/Events';
import Notification from '../components/Notification';

function Home() {
  const ref = useRef('');
  const [isChatHidden, setChatHidden] = useState(true);
  const [twitchUserName, setTwitchUserName] = useState('df_thelivingroom');

  const [isSticky, setSticky] = useState(false);
  const [notification, setNotification] = useState(false);

  const handleScroll = () => {
    setSticky(ref.current.getBoundingClientRect().top <= 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  function Notifications() {
    setNotification(true);
    setTimeout(function () {
      setNotification(false);
    }, 8000);
  }

  const { loading, data } = useQuery(LIVE_STREAMS);
  if (loading) return <p>Waiting</p>;

  const switchStream = (e) => {
    setTwitchUserName(e);
    Notifications();
    window.scrollTo({
      top: 300,
      left: 100,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={!isChatHidden ? 'home chat-open' : 'home'}>
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
          <LiveStream twitchUser={twitchUserName} />
        </div>
        <h3 className="center-align" data-text="Switch Rooms">
          Switch Rooms
        </h3>
        <div className="stream-thumbs">
          <Stream
            twitchUser="df_thelivingroom"
            switchStream={() => switchStream('df_thelivingroom')}
          />
          <Stream
            twitchUser="df_thebedroom"
            switchStream={() => switchStream('df_thebedroom')}
          />
          <Stream
            twitchUser="df_thegarage"
            switchStream={() => switchStream('df_thegarage')}
          />
        </div>
      </div>

      {isChatHidden ? (
        <div className="chat-tab" onClick={() => setChatHidden(false)}>
          Chat
        </div>
      ) : (
        ''
      )}

      {!isChatHidden ? (
        <div className="chat-container expanded">
          <div className="close-chat" onClick={() => setChatHidden(true)}>
            <FontAwesomeIcon icon={faTimes} /> Close Chat
          </div>
          <div className="chat">
            <iframe
              src={`https://www.twitch.tv/embed/${twitchUserName}/chat?parent=distancefest.com`}
              height="900"
              width="400"
              frameBorder="0"
              scrolling="yes"
              id="chat_embed"
            ></iframe>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* <div className={!isChatHidden ? 'events chat-open' : 'events'}>
        <Events />
      </div> */}
      <div className="notifications">
        <Notification
          twitchUserName={twitchUserName}
          show={notification}
          isOpen={() => setNotification(false)}
        />
      </div>
    </>
  );
}

const LIVE_STREAMS = gql`
  query LIVE_STREAMS {
    twitchUserStream {
      user_name
      viewer_count
    }
  }
`;
export default Home;
