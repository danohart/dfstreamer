function Header() {
  return (
    <div className="header">
      <div className="welcome center-align">
        <img src="../static/Welcome.png" />
        {/* <h1 data-text="Welcome To Distance Fest">Welcome To Distance Fest</h1> */}
      </div>
      <h2>Live Music from Safe Spaces</h2>
      <h3 className="center-align" data-text="May 16-17">
        May 16-17
      </h3>
    </div>
  );
}

export default Header;
