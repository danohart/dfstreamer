import React from 'react';
import LiveStream from '../components/LiveStream';

function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('This did nothing.');
  };

  return (
    <>
      <div className={'home'}>
        {/* <div className={`sticky-wrapper`}>
          <LiveStream twitchUser={'danohart'} />
        </div> */}
        <div className="submission">
          <div className="submission-title">
            <img src="/static/Artist-Submissions.png" />
          </div>
          <div className="submission-form">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
