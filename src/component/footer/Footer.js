import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className={"footer"}>
      <div className={"footer-container"}>
        <p className="made-with-love">
          Made with{" "}
          <i className="heart" aria-label="love">
            &#10084;
          </i>{" "}
          by <a href="https://trimurl.online/"> TrimURL</a>
        </p>
      </div>
    </footer>
  );
}
