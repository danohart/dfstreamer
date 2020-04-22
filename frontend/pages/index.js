import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Videos from '../components/Videos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import LiveStream from '../components/LiveStream';
import Events from '../components/Events';
import Notification from '../components/Notification';

function Home() {
  const ref = useRef('');
  const [isChatHidden, setChatHidden] = useState(true);
  const [
    twitchUserName,
    setTwitchUserName,
    twitchUserViews,
    setTwitchUserViews,
  ] = useState('df_thelivingroom');
  const [name, setName] = useState('');
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    setSticky(ref.current.getBoundingClientRect().top <= 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const changeUser = (e) => {
    e.preventDefault();
    setTwitchUserName(name);
    setTwitchUserViews(data.twitchUserStream.viewer_count);
  };

  const changeUserSelect = (e) => {
    e.preventDefault();
    setTwitchUserName(e.target.value);
  };
  const { loading, data } = useQuery(LIVE_STREAMS);
  if (loading) return <p>Waiting</p>;

  return (
    <>
      <div className={!isChatHidden ? 'home chat-open' : 'home'}>
        <form onSubmit={changeUser}>
          <div className="user-field">
            <input
              type="text"
              placeholder="Enter a username"
              value={name}
              onChange={handleChange.bind(this)}
            />
            <input type="submit" />
          </div>
        </form>
        <div className="stream-dropdown">
          <label htmlFor="live-streams">Pick a Stream</label>
          <select id="live-streams" onChange={changeUserSelect}>
            <option>Live Streams</option>
            {data.twitchUserStream.map((user) => (
              <option key={user.user_name}>{user.user_name}</option>
            ))}
          </select>
          <div className="dropdown-icon">
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </div>
        </div>
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
          <LiveStream twitchUser={twitchUserName} />
        </div>
        {/* <Videos userId="512333628" />
      <Videos userId="512372287" />
      <Videos userId="512337495" /> */}
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
      <Events />
      <div className="notifications">
        <Notification twitchUserName={twitchUserName} />
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
