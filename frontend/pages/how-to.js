import Head from 'next/head';

export default function HowTo() {
  return (
    <div className='how'>
      <div className='header'>
        <div className='welcome center-align'>
          {/* <a href="/">
          <img src="../static/Welcome.png" />
        </a> */}
          <h1 data-text='Welcome To Distance Fest'>
            <a href='/'>Welcome To Distance Fest</a>
          </h1>
        </div>
        <h2>Live Music from Safe Spaces</h2>
        <h3 className='center-align' data-text="New Year's Eve">
          New Year's Eve
        </h3>
      </div>
      <Head>
        <title>How To Stream // Distance Fest</title>
      </Head>
      <h1>How To Stream To Distance Fest's Website</h1>
      <p>
        Hey there! Thanks for being a part of Distance Fest, and we hope that
        you have fun! Here are the steps to get you up and running before your
        show.
      </p>
      <p>
        First, we're utilizing Twitch.tv for all streams on our site, and Twitch
        works best with OBS,{' '}
        <a href='https://obsproject.com/' target='_blank'>
          you can download OBS here
        </a>
        . Download it and install it on your computer.
      </p>
      <img src='../how/1.png' />
      <p>
        Once installed, open up OBS and you'll be presented with the screen
        shown above. It's blank, if you were to start streaming now, this
        wouldn't be much fun, so we need to add some input sources so people can
        see and hear you.
      </p>
      <img src='../how/2.png' />
      <p>
        Click on the "plus" sign under the "Sources" box towards the bottom
        middle of the program.
      </p>
      <img src='../how/3.png' />
      <p>
        Then select "Video Capture Device" this is what OBS will call your
        camera/webcam input.
      </p>
      <img src='../how/4.png' />
      <p>
        Then, a box will appear to create a new input...you can name this
        whatever you want, especially if you have multiple cameras, here I named
        mine "Webcam". Then click ok.
      </p>
      <img src='../how/5.png' />
      <p>
        Now, from the "device" dropdown menu, you can select your camera input.
        You may have many, or only one to choose from.
      </p>
      <img src='../how/6.png' />
      <p>
        After you select your device, you can see a preview of what it looks
        like. You can use the default preset, that's fine. Once everything looks
        good to you, then click "OK".
      </p>
      <img src='../how/7.png' />
      <p>
        Now your camera input source is added to your "Scene" in OBS, but some
        cameras do not fill the whole screen...as you can see above, there's
        still black space around my camera image. You can resize your video by
        dragging the red boxes in the corners of your video image.
      </p>
      <img src='../how/8.png' />
      <p>
        There, I resized my video, and centered it the best I could. Now, we
        need to add an audio device so people can hear you.
      </p>
      <img src='../how/9.png' />
      <p>
        Similarly to adding a video device, we're going to add an audio device
        by clicking on the "plus" sign in the "Sources" box, but now we're going
        to click "Audi Input Capture". Then you can select the audio device you
        have hooked up to your computer.
      </p>
      <img src='../how/10.png' />
      <p>
        Now, that your video and audio is set to how you like, what about
        streaming? Well click the "Settings" button on the bottom right side of
        OBS as shown above.
      </p>
      <img src='../how/11.png' />
      <p>Then click "Stream" on the left side menu...</p>
      <img src='../how/12.png' />
      <p>
        Make sure the "Service" is set to "Twitch", we can leave the "Server"
        set to "Auto" like it is, and then copy/paste the key into the "Stream
        Key" spot. You will be given your key to stream live about a half hour
        before you need to go live. Once you paste in your key, click "OK".
      </p>
      <img src='../how/13.png' />
      <p>
        Now you're ready and once you click "Start Streaming", it'll connect for
        a second or two, and then you are LIVE! Have a great show!
      </p>
      <p>
        <strong>TESTING:</strong> Once you have your video and audio set up like
        you want, you can click on "Start Recording" and that will start to
        record a video that once you stop recording, you can listen and watch it
        to see what others will experience while they watch your stream. It's
        recommended to do this so you can see and hear any issues before you go
        live. Test this out a few days before you stream in case you need to
        purchase a cable or some other type of equipment to get things working
        properly for you.
      </p>
    </div>
  );
}
