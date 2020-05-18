import React from 'react';
import Countdown from '../components/Countdown';
import ArtistSubmission from '../components/ArtistSubmission';

function Home() {
  return (
    <>
      <div className='home'>
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
          <h3 className='center-align' data-text='May 16-17'>
            May 16-17
          </h3>
          <h2 className='center-align'>
            Thanks for another great weekend! <br />
            We'll see you next time!
          </h2>
        </div>
        <div className='submission'>
          <div className='submission-title'>
            <h2 className='center-align' data-text='Artist Submissions'>
              Artist Submissions
            </h2>
            <p>
              If you are inteterested in showcasing your performance in the next
              Distance Fest, please fill out the form below.
            </p>
          </div>
          <ArtistSubmission />
          {/* <div className="submission-form">
            <form onSubmit={handleSubmit}>
              <label>
                Artist Name
                <input type="text" placeholder="Artist Name" />
              </label>
              <label>
                Contact Name
                <input type="text" placeholder="Contact Name" />
              </label>
              <label>
                Email
                <input type="text" placeholder="Email" />
              </label>
              <label>
                Genre
                <input type="text" placeholder="Genre" />
              </label>
              <label>Bio</label>
              <textarea placeholder="Bio" />
              <label>
                Website
                <input type="text" placeholder="Website" />
              </label>
              <label>
                City
                <input type="text" placeholder="City" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
