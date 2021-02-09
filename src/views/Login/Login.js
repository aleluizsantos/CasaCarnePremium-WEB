import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signIn } from "../../store/Actions";

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
import { isAuthenticated } from "../../hooks";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.Message);

  useEffect(() => {
    (() => {
      isAuthenticated() && history.push("/dashboard");
    })();
  }, [history]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(signIn(email, password)).then(() => {
      history.push("/dashboard");
    });
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
              <Form onSubmit={handleLogin}>
                <Col md="12">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      placeholder="e-mail"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      valid={false}
                      invalid={false}
                    />
                  </FormGroup>
                </Col>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}

                <hr />
                <div className="button-container">
                  <Button type="submit" color="warning" block>
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
export default Login;
