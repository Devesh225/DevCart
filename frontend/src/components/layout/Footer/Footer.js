import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/appstore.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Android and IOS</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appStore" />
      </div>

      <div className="midFooter">
        <h1>DevCart</h1>
        <p>High Quality Products, <br /> Higher Quality Customers.</p>

        <p>Copyright 2022 &copy; Devesh Tulshyan</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Me</h4>
        <a href="http://instagram.com/deveshxoxo">Instagram</a>
        <a href="http://twitter.com/TulshyanDevesh">Twitter</a>
        <a href="http://github.com/Devesh225">Github</a>
      </div>
    </footer>
  )
}

export default Footer