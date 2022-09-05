import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/deveshxoxo";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dkm4o5shv/image/upload/v1661776114/avatars/1646727249242_y9mgik.png"
              alt="Developer"
            />
            <Typography>Devesh Tulshyan</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              I am a Full Stack MERN Developer, and I love to make web applications, always eager to learn new technologies and integrate them into personal projects.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Socials</Typography>
            <a
              href="https://www.linkedin.com/in/devesh-tulshyan-b674421a2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="linkedInSvgIcon" />
            </a>

            <a href="https://instagram.com/deveshxoxo" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;