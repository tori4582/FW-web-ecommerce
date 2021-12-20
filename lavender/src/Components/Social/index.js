import React from "react";
import "./style.css";

export default function Index() {
  return (
    <div className="social">
      <ul>
        <li>
          <a
            href="https://www.facebook.com/bii.nhok.1/"
            title="Facebook khanh"
            className="blue"
          >
            <span>
              <i className="fab fa-facebook icon-facebook" />
            </span>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UC4-p8iZx-AOdXJzxEFeVIQg"
            title="Youtube Khanh"
            className="red"
          >
            <span>
              <i className="fab fa-youtube icon-youtube" />
            </span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/biinhok1/"
            title="Instagram Khanhzum"
            className="rainbow"
          >
            <span>
              <i className="fab fa-instagram icon-instagram" />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
