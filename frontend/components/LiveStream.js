function LiveStream(props) {
  const video = props.twitchUser;

  return (
    <>
      <h1 className='center-align'>
        {video == 'df_thelivingroom'
          ? 'Living Room'
          : video == 'df_thebedroom'
          ? 'Bedroom'
          : video == 'df_thegarage'
          ? 'Garage'
          : video}
      </h1>
      <div className='stream-container'>
        <div className='stream-wrapper' key={video.id}>
          <div className='stream'>
            <iframe
              src={`https://player.twitch.tv/?channel=${video}&parent=distancefest.com&autoplay=true&muted=false`}
              height='300'
              width='900'
              frameBorder='0'
              scrolling='no'
              allowFullScreen='yes'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveStream;
