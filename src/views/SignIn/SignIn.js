import React from "react";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";

const SignIn = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col />
          <Col lg="8">
            <Jumbotron>
              <h3>
                <u>Login Form</u>
              </h3>
              <hr />
              <Card>
                <CardBody>{/* <LoginForm /> */}</CardBody>
              </Card>
            </Jumbotron>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};
export default SignIn;
