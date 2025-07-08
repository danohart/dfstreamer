import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LiveStream from "../components/LiveStream";
import Stream from "../components/Stream";
import Events from "../components/Events";
import Notification from "../components/Notification";
import Fundraiser from "../components/Fundraiser";

// Configuration
const ROOMS = [
  { id: "df_thelivingroom", name: "Living Room" },
  { id: "df_thebedroom", name: "Bedroom" },
  { id: "df_thegarage", name: "Garage" },
];

const SHEET_API_CONFIG = {
  url: "https://api.sheetson.com/v2/sheets/DFData",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer HUH6MgEQHEYCXAl6mxcFzbJuiY6Fuw6JYNDmNdU7DCkf2q6U9jdCLdux3Pg",
    "X-Spreadsheet-Id": "1QlhQOT_sZqiKiPeizDO8FvE-57gCwaVXjyZ4I0W5Cg8",
  },
};

const LIVE_STREAMS = gql`
  query LIVE_STREAMS {
    twitchUserStream {
      user_name
      viewer_count
    }
  }
`;

function Live() {
  const stickyRef = useRef(null);
  const [isChatHidden, setChatHidden] = useState(true);
  const [twitchUserName, setTwitchUserName] = useState("df_thelivingroom");
  const [fundAmount, setFundAmount] = useState("20");
  const [isSticky, setSticky] = useState(false);
  const [notification, setNotification] = useState(false);

  const { loading, data } = useQuery(LIVE_STREAMS);

  // Handle scroll for sticky header
  const handleScroll = () => {
    if (stickyRef.current) {
      setSticky(stickyRef.current.getBoundingClientRect().top <= 0);
    }
  };

  // Fetch sheet data
  const getSheetData = async () => {
    try {
      const response = await fetch(SHEET_API_CONFIG.url, {
        headers: SHEET_API_CONFIG.headers,
      });
      const sheetData = await response.json();

      if (sheetData.results?.[0]) {
        setTwitchUserName(sheetData.results[0].room);
        setFundAmount(sheetData.results[0].amount);
      }

      return sheetData;
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    }
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setChatHidden((prev) => !prev);
    if (isChatHidden) {
      window.scrollTo({ top: 450, behavior: "smooth" });
    }
  };

  // Switch between streams
  const switchStream = (roomId) => {
    setTwitchUserName(roomId);
    showNotification();
    window.scrollTo({ top: 300, left: 100, behavior: "smooth" });
  };

  // Show notification temporarily
  const showNotification = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), 8000);
  };

  // Render stream thumbnail or fullscreen indicator
  const renderStreamThumbnail = (room) => {
    if (twitchUserName === room.id) {
      return (
        <div className='stream-wrapper' key={room.id}>
          <h4 className='title center-align'>{room.name}</h4>
          <div className='stream fullscreened'>
            <div className='video'>Fullscreened</div>
          </div>
        </div>
      );
    }

    return (
      <Stream
        key={room.id}
        twitchUser={room.id}
        switchStream={() => switchStream(room.id)}
      />
    );
  };

  // Setup effects
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    getSheetData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <p>Waiting</p>;

  return (
    <>
      <Head>
        <title>Live - Distance Fest</title>
      </Head>

      <div className={!isChatHidden ? "home chat-open" : "home"}>
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

        <div
          className={`sticky-wrapper${isSticky ? " sticky" : ""}`}
          ref={stickyRef}
        >
          <LiveStream twitchUser={twitchUserName} />
        </div>

        <h3 className='center-align' data-text='Switch Rooms'>
          Switch Rooms
        </h3>

        <div className='stream-thumbs'>{ROOMS.map(renderStreamThumbnail)}</div>
      </div>

      {/* Chat Tab */}
      {isChatHidden && (
        <div className='chat-tab' onClick={toggleChat}>
          Chat
        </div>
      )}

      {/* Chat Container */}
      {!isChatHidden && (
        <div className='chat-container expanded'>
          <div className='close-chat' onClick={toggleChat}>
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
            />
          </div>
        </div>
      )}

      <Fundraiser amount={fundAmount} />

      <div className={!isChatHidden ? "events chat-open" : "events"}>
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

export default Live;
