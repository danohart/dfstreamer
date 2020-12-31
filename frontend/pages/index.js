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

function Live() {
  const ref = useRef('');
  const [isChatHidden, setChatHidden] = useState(true);
  const [twitchUserName, setTwitchUserName] = useState('df_thelivingroom');
  const [fundAmount, setFundAmount] = useState('20');

  const [isSticky, setSticky] = useState(false);
  const [notification, setNotification] = useState(false);

  const handleScroll = () => {
    setSticky(ref.current.getBoundingClientRect().top <= 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // getSheetData();

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  async function getSheetData() {
    const fetchData = await fetch(
      'https://cors-anywhere.herokuapp.com/https://api.sheetson.com/v2/sheets/Sheet2',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer HUH6MgEQHEYCXAl6mxcFzbJuiY6Fuw6JYNDmNdU7DCkf2q6U9jdCLdux3Pg`,
          'X-Spreadsheet-Id': '1QlhQOT_sZqiKiPeizDO8FvE-57gCwaVXjyZ4I0W5Cg8',
        },
      }
    );
    const sheetData = await fetchData.json();
    console.log(sheetData);

    setTwitchUserName(sheetData.results[0].room);
    setFundAmount(sheetData.results[0].amount);
    return sheetData;
  }

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
          <h2>Live Music from Safe Spaces</h2>
          <h3 className='center-align' data-text="New Year's Eve">
            New Year's Eve
          </h3>
        </div>
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
          <LiveStream twitchUser={twitchUserName} />
        </div>
        <h3 className='center-align' data-text='Switch Rooms'>
          Switch Rooms
        </h3>
        <div className='stream-thumbs'>
          {twitchUserName === 'df_thelivingroom' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>Living Room</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='df_thelivingroom'
              switchStream={() => switchStream('df_thelivingroom')}
            />
          )}

          {twitchUserName === 'df_thebedroom' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>Bedroom</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='df_thebedroom'
              switchStream={() => switchStream('df_thebedroom')}
            />
          )}
          {twitchUserName === 'df_thegarage' ? (
            <div className='stream-wrapper'>
              <h4 className='title center-align'>Garage</h4>
              <div className='stream fullscreened'>
                <div className='video'>Fullscreened</div>
              </div>
            </div>
          ) : (
            <Stream
              twitchUser='df_thegarage'
              switchStream={() => switchStream('df_thegarage')}
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

      <Fundraiser amount={fundAmount} />
      <div className={!isChatHidden ? 'events chat-open' : 'events'}>
        <Events />
      </div>
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
export default Live;
