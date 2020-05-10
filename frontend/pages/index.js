import React from 'react';
import Countdown from '../components/Countdown';

function Home() {
  return (
    <>
      <div className="home">
        <Countdown />
        <div className="submission">
          <div className="submission-title">
            <h2 className="center-align" data-text="Artist Submissions">
              Artist Submissions
            </h2>
          </div>
          <iframe
            height="800"
            title="Embedded Form"
            allowtransparency="true"
            frameBorder="0"
            scrolling="no"
            style={{ width: '100%', border: 'none', color: 'white' }}
            src="https://danohart.wufoo.com/embed/qxlil4n1bcmypk/"
          ></iframe>
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
      <div className="schedule">
        <img src="../static/Schedule.png" />
        <h3 data-text="Coming Soon!">Coming Soon!</h3>
      </div>
    </>
  );
}

export default Home;
