import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="footer">
      <h4>Live Streamer</h4>
      <div className="footer-links">
        <div>
          <a href="https://instagram.com/distancefest" target="_blank">
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </a>
        </div>
        <div>
          <a href="https://facebook.com/distancefest" target="_blank">
            <FontAwesomeIcon icon={faFacebookF} /> Facebook
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} - All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
