import React, { useState } from 'react';

export default function UserSwitcher() {
  const [name, setName] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const changeUser = (e) => {
    e.preventDefault();
    Notifications();
    setTwitchUserName(name);
  };
  const changeUserSelect = (e) => {
    e.preventDefault();
    Notifications();
    setTwitchUserName(e.target.value);
  };
  <>
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
  </>;
}
