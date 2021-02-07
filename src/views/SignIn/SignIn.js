import React from "react";

// reactstrap components
import {
  Form,
  FormGroup,
  Input,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  FormFeedback,
  FormText,
  Label,
  Row,
  Col,
  Button,
} from "reactstrap";

import "./styles.css";

import { userAction } from "../../store/Actions";

const SignIn = () => {
  const login = () => {
    userAction.auth("aleluizsantos@gamil.com", "123456");
  };

  return (
    <div id="page-signin">
      <Row xs="1" sm="1" md="2">
        <Col className="signinImg" />
        <Col className="content">
          <Card className="contentCard">
            <CardHeader className="text-center">
              <CardTitle tag="h4">Sign-In</CardTitle>
              <p className="card-category">
                Bem vindo ao sistema Casa Carne Premium
              </p>
            </CardHeader>
            <CardBody>
              <Form>
                <Col md="12">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      placeholder="e-mail"
                      type="text"
                      valid={false}
                      invalid={false}
                    />
                    <FormFeedback valid>E-mail válido.</FormFeedback>
                    <FormText>Informe seu e-mail email@email.com</FormText>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Senha</Label>
                    <Input
                      placeholder="Senha"
                      type="password"
                      valid={false}
                      invalid={false}
                    />
                  </FormGroup>
                </Col>

                <hr />
                <div className="button-container">
                  <Button onClick={login} outline color="warning" block>
                    LOGIN
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default SignIn;
