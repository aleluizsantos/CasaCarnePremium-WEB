import React from "react";
import { Container, Row } from "reactstrap";

// used for making the prop types of this component
import PropTypes from "prop-types";

const Footer = (props) => {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/premiumjales"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Casa Carne Premium
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, desenvolvido por lesoftware
              - version 1.2.3
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
