import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  render() {
    if (!this.props.data) return null;

    const project = this.props.data.project;
    const github = this.props.data.github;
    const name = this.props.data.name;
    const description = this.props.data.description;

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
      <header id="home">
        <ParticlesBg type="square" bg={true} velocity={[.5, 3]} />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
            <li>
              <a href="https://wesleyp.substack.com/" target="_blank" rel="noopener noreferrer">Substack <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom triggerOnce>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200} triggerOnce>
              <h3>{description}.</h3>
            </Fade>
            <hr />
            <div className="row">
              <Fade bottom triggerOnce>
                <div className="social">
                  <ul className="social-links">{socialLinks}</ul>
                </div>
              </Fade>
            </div>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
