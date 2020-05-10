function Header() {
  return (
    <div className="header">
      <div className="welcome center-align">
        {/* <a href="/">
          <img src="../static/Welcome.png" />
        </a> */}
        <h1 data-text="Welcome To Distance Fest">
          <a href="/">Welcome To Distance Fest</a>
        </h1>
      </div>
      <h2>Live Music from Safe Spaces</h2>
      <h3 className="center-align" data-text="May 16-17">
        May 16-17
      </h3>
    </div>
  );
}

export default Header;
