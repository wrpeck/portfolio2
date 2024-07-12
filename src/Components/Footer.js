import React, { Component } from "react";
import Fade from "react-awesome-reveal";

class Footer extends Component {
  render() {
    if (!this.props.data) return null;

    const socialLinks = this.props.data.social.map(function (social) {
      return (
        <li key={social.name}>
          <a href={social.url}>
            <i className={social.className}></i>
          </a>
        </li>
      );
    });

    return (
      <footer>
        <div className="row">
          <Fade bottom triggerOnce>
            <div className="twelve columns">
              <ul className="social-links">{socialLinks}</ul>
              <ul className="copyright">
                <li>&copy; Copyright 2024 wesleyp.dev</li>
              </ul>
            </div>
          </Fade>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
