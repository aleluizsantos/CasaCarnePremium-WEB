import React from "react";

import { Row, Col } from "reactstrap";

import "./styles.css";
import signinImg from "../../assets/img/signIn-img.jpg";

const SignIn = () => {
  return (
    <div id="page-signin">
      <Row>
        <Col className="signinImg" md="5" sx="12">
          <span>image</span>
        </Col>
        <Col className="content" md="7" sx="12">
          <span>main</span>
        </Col>
      </Row>
    </div>
  );
};
export default SignIn;
