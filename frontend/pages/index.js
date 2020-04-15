import React, { useState, useEffect, useRef } from 'react';
import Videos from '../components/Videos';
import LiveStream from '../components/LiveStream';

function Home() {
  const [isChatHidden, setChatHidden] = useState(true);
  const [twitchUserName, setTwitchUserName] = useState('df_thelivingroom');
  const [name, setName] = useState('');
  const [isSticky, setSticky] = useState(false);

  const ref = useRef(null);
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
  };

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
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
          <LiveStream twitchUser={twitchUserName} />
        </div>
        {/* <Videos userId="512333628" />
      <Videos userId="512372287" />
      <Videos userId="512337495" /> */}
      </div>
      <div className="chat-tab" onClick={() => setChatHidden(false)}>
        Chat
      </div>
      {!isChatHidden ? (
        <div className="chat-container expanded">
          <a className="close-chat" onClick={() => setChatHidden(true)}>
            X Close Chat
          </a>
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
    </>
  );
}

export default Home;
