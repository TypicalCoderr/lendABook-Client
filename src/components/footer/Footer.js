import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLinksContainer">
        <div className="footerLinksWrapper">
          <div className="footerLinkItem">
            <div className="footerLinkTitle ">About Us</div>
            <Link className="footerLink" to="/sign-up">
              How it works
            </Link>
            <Link className="footerLink" to="/">
              Testimonials
            </Link>
            <Link className="footerLink" to="/">
              Careers
            </Link>
            <Link className="footerLink" to="/">
              Investors
            </Link>
            <Link className="footerLink" to="/">
              Terms of Service
            </Link>
          </div>
          <div className="footerLinkItem">
            <div className="footerLinkTitle ">Contact Us</div>
            <Link className="footerLink" to="/">
              Contact
            </Link>
            <Link className="footerLink" to="/">
              Support
            </Link>
            <Link className="footerLink" to="/">
              Destinations
            </Link>
            <Link className="footerLink" to="/">
              Sponsorships
            </Link>
          </div>
        </div>
        <div className="footerLinksWrapper">
          <div className="footerLinkItem">
            <div className="footerLinkTitle ">Videos</div>
            <Link className="footerLink" to="/">
              Submit Video
            </Link>
            <Link className="footerLink" to="/">
              Ambassadors
            </Link>
            <Link className="footerLink" to="/">
              Agency
            </Link>
            <Link className="footerLink" to="/">
              Influencer
            </Link>
          </div>
          <div className="footerLinkItem">
            <div className="footerLinkTitle ">Social Media</div>
            <Link className="footerLink" to="/">
              Instagram
            </Link>
            <Link className="footerLink" to="/">
              Facebook
            </Link>
            <Link className="footerLink" to="/">
              Youtube
            </Link>
            <Link className="footerLink" to="/">
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <div className="socialMedia">
        <div className="socialMediaWrap">
          <div className="socialLogo" to="/">
            <i class="fas fa-book-open" />
            Lend-A-Book
          </div>
          <div className="websiteRights">Lend-A-Book © 2021</div>
          <div className="socialIcons">
            <div
              className="socialIconLink"
              href="/"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </div>
            <div
              className="socialIconLink"
              href="/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </div>
            <div
              className="socialIconLink"
              href={
                "//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber"
              }
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Youtube"
            >
              <FaYoutube />
            </div>
            <div
              className="socialIconLink"
              href="/"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter />
            </div>
            <div
              className="socialIconLink"
              href="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
