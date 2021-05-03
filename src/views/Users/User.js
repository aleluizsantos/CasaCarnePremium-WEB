import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validate from "validate.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  FormText,
  Form,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

import "./Styles.css";

import { LOGIN_SUCCESS, SET_MESSAGE } from "../../store/Actions/types";
import { upgradeUser, upgradePassUser } from "../../hooks";
import { ModalView } from "../../components";
import iconKey from "../../assets/img/icoKey_64.png";

const User = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.Authenticate);
  const [emailUser, setEmailUser] = useState(user.email);
  const [nameUser, setNameUser] = useState(user.name);
  const [phoneUser, setPhoneUser] = useState(user.phone);
  const [modalPassword, setModalPassword] = useState(false);
  const [formStatePass, setFormStatePass] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const schema = {
    oldPassword: {
      presence: { allowEmpty: false, message: "^Senha atual é obrigatório" },
      length: {
        minimum: 6,
        message: "^Senha deve ter no mínimo 6 caracteres",
      },
    },
    newPassword: {
      presence: { allowEmpty: false, message: "^Nova senha é obrigatório" },
      length: {
        minimum: 6,
        message: "^Senha deve ter no mínimo 6 caracteres",
      },
    },
    confPassword: {
      presence: {
        allowEmpty: false,
        message: "^Confirmar senha é obrigatório",
      },
      length: {
        minimum: 6,
        message: "^Senha deve ter no mínimo 6 caracteres",
      },
      equality: {
        // Input we want it to be equal to
        attribute: "newPassword",
        // Error message if passwords don't match
        message: "^A senha digitada não são identicas",
      },
    },
  };

  const handleChange = (event) => {
    event.persist();

    let dataForm = {
      ...formStatePass,
      values: {
        ...formStatePass.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formStatePass.touched,
        [event.target.name]: true,
      },
    };

    const errors = validate(dataForm.values, schema);

    dataForm = {
      ...dataForm,
      isValid: errors ? false : true,
      errors: errors || {},
    };

    setFormStatePass(dataForm);
  };

  // Verificar errors no formulário alterar password
  const hasError = (field) =>
    formStatePass.touched[field] && formStatePass.errors[field] ? true : false;

  // Atualizar o dados do usuário Master
  const handleUpdateUser = async () => {
    const data = {
      user: {
        ...user,
        email: emailUser,
        name: nameUser,
        phone: phoneUser,
      },
      token: token,
    };

    const statuUpgradeUser = await upgradeUser(data.user);

    if (!statuUpgradeUser.success) {
      dispatch({
        type: SET_MESSAGE,
        payload: statuUpgradeUser.error,
      });
      return;
    }

    localStorage.setItem("_activeUserPremium", JSON.stringify(data.user));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  };
  // Alterar a senha do usuário Master
  const handleSaveUpgradePass = async () => {
    if (formStatePass.isValid) {
      const userId = user.id;
      const oldPassword = formStatePass.values.oldPassword;
      const newPassword = formStatePass.values.newPassword;

      const dataUser = {
        userId,
        oldPassword,
        newPassword,
      };

      const statuUpgradePass = await upgradePassUser(dataUser);

      if (statuUpgradePass.success) {
        cleanFieldChangePass();
        dispatch({
          type: SET_MESSAGE,
          payload: "Senha alterado com sucesso",
        });
      } else {
        setFormStatePass({
          ...formStatePass,
          errors: {
            oldPassword: [statuUpgradePass.error],
          },
        });
      }
    } else {
      alert("Campos obrigatórios");
    }
  };

  const cleanFieldChangePass = () => {
    setModalPassword(false);
    setFormStatePass({
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    });
  };

  return (
    <>
      <div className="content">
        <ModalView
          title={
            <>
              <img src={iconKey} alt="add" /> <Label> Alterar Senha</Label>
            </>
          }
          modal={modalPassword}
          toggle={() => setModalPassword(!modalPassword)}
          confirmed={() => handleSaveUpgradePass()}
        >
          <div>
            <FormGroup>
              <Label for="oldPassword">Digite sua senha atual</Label>
              <Input
                name="oldPassword"
                value={formStatePass.values.oldPassword || ""}
                onChange={handleChange}
                type="password"
                invalid={hasError("oldPassword")}
              />
              {formStatePass.touched.oldPassword &&
                Array.isArray(formStatePass.errors.oldPassword) &&
                formStatePass.errors.oldPassword.map((error, idx) => {
                  return <FormText key={idx}>{error}</FormText>;
                })}
            </FormGroup>
            <FormGroup>
              <Label for="newPassword">Nova senha</Label>
              <Input
                name="newPassword"
                value={formStatePass.values.newPassword || ""}
                onChange={handleChange}
                type="password"
                invalid={hasError("newPassword")}
              />
              {formStatePass.touched.newPassword &&
                Array.isArray(formStatePass.errors.newPassword) &&
                formStatePass.errors.newPassword.map((error, idx) => {
                  return <FormText key={idx}>{error}</FormText>;
                })}
            </FormGroup>
            <FormGroup>
              <Label for="confPassword">Nova senha</Label>
              <Input
                name="confPassword"
                value={formStatePass.values.confPassword || ""}
                onChange={handleChange}
                type="password"
                invalid={hasError("confPassword")}
              />
              {formStatePass.touched.confPassword &&
                Array.isArray(formStatePass.errors.confPassword) &&
                formStatePass.errors.confPassword.map((error, idx) => {
                  return <FormText key={idx}>{error}</FormText>;
                })}
            </FormGroup>
          </div>
        </ModalView>
        <Row>
          <Col md="8">
            <Card className="card-user" style={{ height: "100%" }}>
              <CardHeader>
                <CardTitle tag="h5">Meu Perfil</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Estabelecimento</label>
                        <Input
                          defaultValue="Casa Carne Premium"
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Nome</label>
                        <Input
                          placeholder="Company"
                          value={nameUser}
                          onChange={(event) => setNameUser(event.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Telefone</label>
                        <Input
                          placeholder="(__) ____-____"
                          value={phoneUser}
                          onChange={(event) => setPhoneUser(event.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          placeholder="Seu email"
                          value={emailUser}
                          onChange={(event) => setEmailUser(event.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="buttonUsers">
                      <Button className="btn" onClick={handleUpdateUser}>
                        Atualizar
                      </Button>
                      <Button
                        className="btn"
                        onClick={() => setModalPassword(true)}
                      >
                        <i className="fa fa-key" /> Alterar Senha
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user" style={{ height: "100%" }}>
              <div className="image">
                <img alt="..." src={require("assets/img/bgUser.jpg")} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/avatar.png")}
                    />
                    <h5 className="title">{user.name}</h5>
                  </a>
                  <p className="description">@premiumjales·Açougue</p>
                </div>
                <p className="description text-center">
                  Aqui o sabor é sempre de qualidade
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default User;
