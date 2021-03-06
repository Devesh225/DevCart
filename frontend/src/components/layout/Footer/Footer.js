import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/appstore.png';
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h2>DOWNLOAD THE APP</h2>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appStore" />
      </div>

      <div className="midFooter">
        <h2>DEVCART</h2>
        <p>High Quality Products, <br /> Higher Quality Customers.</p>
        <span>Copyright 2022 &copy; Devesh Tulshyan</span>
      </div>

      <div className="rightFooter">
        <h2>FOLLOW ME</h2>
        <a href="http://instagram.com/deveshxoxo"><AiOutlineInstagram /> Instagram</a>
        <a href="http://twitter.com/TulshyanDevesh"><AiOutlineTwitter /> Twitter</a>
        <a href="http://github.com/Devesh225"><AiOutlineGithub /> Github</a>
      </div>
    </footer>
  )
}

export default Footer