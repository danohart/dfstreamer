import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import LiveStream from '../components/LiveStream';
import Stream from '../components/Stream';
import Events from '../components/Events';
import Notification from '../components/Notification';
import Fundraiser from '../components/Fundraiser';

function StreamTeam() {
  const ref = useRef('');
  const [isChatHidden, setChatHidden] = useState(true);
  const [twitchUserName, setTwitchUserName] = useState('default');

  const [notification, setNotification] = useState(false);

  function chatPopup() {
    isChatHidden === false ? setChatHidden(true) : setChatHidden(false);
    if (isChatHidden === true)
      window.scrollTo({
        top: 450,
        behavior: 'smooth',
      });
  }

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
      <Head>
        <title>Live - Distance Fest</title>
      </Head>
      <div className={!isChatHidden ? 'home chat-open' : 'home'}>
        <div className='header'>
          <div className='welcome center-align'>
            <h1 data-text='Welcome To Distance Fest'>
              <a href='/'>Welcome To Distance Fest</a>
            </h1>
          </div>
        </div>

        <div className='stream-grid'>
          {twitchUserName === 'timthetatman' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>timthetatman</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='timthetatman'
              switchStream={() => switchStream('timthetatman')}
            />
          )}
          {twitchUserName === 'nickmercs' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>nickmercs</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='nickmercs'
              switchStream={() => switchStream('nickmercs')}
            />
          )}

          {twitchUserName === 'cloakzy' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>cloakzy</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='cloakzy'
              switchStream={() => switchStream('cloakzy')}
            />
          )}
          {twitchUserName === 'swagg' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>swagg</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='swagg'
              switchStream={() => switchStream('swagg')}
            />
          )}
        </div>
      </div>

      {isChatHidden ? (
        <div className='chat-tab' onClick={() => chatPopup()}>
          Chat
        </div>
      ) : (
        ''
      )}

      {!isChatHidden ? (
        <div className='chat-container expanded'>
          <div className='close-chat' onClick={() => chatPopup()}>
            <FontAwesomeIcon icon={faTimes} /> Close Chat
          </div>
          <div className='chat'>
            <iframe
              src={`https://www.twitch.tv/embed/${twitchUserName}/chat?parent=distancefest.com`}
              height='900'
              width='400'
              frameBorder='0'
              scrolling='yes'
              id='chat_embed'
            ></iframe>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className='notifications'>
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
export default StreamTeam;
