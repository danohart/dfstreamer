import { getYear } from 'date-fns';

function Footer() {
  return (
    <div className="footer">
      <h4>Live Streamer</h4>
      <div className="footer-content">
        &copy; {new Date().getFullYear()} - All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
