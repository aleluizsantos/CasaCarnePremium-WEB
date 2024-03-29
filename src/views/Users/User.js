import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import validate from "validate.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  FormText,
  Form,
  Label,
  Input,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

import "./Styles.css";

import { LOGIN_SUCCESS, SET_MESSAGE } from "../../store/Actions/types";
import {
  upgradeUser,
  upgradePassUser,
  getAddressStore,
  getCep,
  updateAddressStore,
  getOpeningHours,
  updateOpenigHours,
} from "../../hooks";
import { ModalView } from "../../components";
import iconKey from "../../assets/img/icoKey_64.png";

const typeForm = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};
const nameForm = {
  PASSWORD: "PASSWORD",
  ADDRESS_STORE: "ADDRESS_STORE",
};

const User = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.Authenticate);
  const [emailUser, setEmailUser] = useState(user.email);
  const [nameUser, setNameUser] = useState(user.name);
  const [phoneUser, setPhoneUser] = useState(user.phone);
  const [modalPassword, setModalPassword] = useState(false);
  const [formAddressStore, setFormAddressStore] = useState(typeForm);
  const [formStatePass, setFormStatePass] = useState(typeForm);
  const [openingHours, setOpeningHours] = useState([]);
  const [changeTempOpenHours, setChangerTempOpenHours] = useState({
    openModal: false,
    values: [],
  });

  const loadingData = useCallback(() => {
    getAddressStore().then((response) => {
      setFormAddressStore({
        ...formAddressStore,
        values: response,
      });
      getOpeningHours().then((response) => setOpeningHours(response));
    });
  }, [formAddressStore]);

  useEffect(() => {
    loadingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Criado as regras de validação de password
  const schemaPassword = {
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
  // Criar as regas de validação do endereço
  const schemaAddress = {
    cep: { presence: { allowEmpty: false, message: "^CEP é obrigatório" } },
    address: {
      presence: { allowEmpty: false, message: "^Endereço é obrigatório" },
    },
    number: {
      presence: { allowEmpty: false, message: "^Número é obrigatório" },
    },
    neighborhood: {
      presence: { allowEmpty: false, message: "^Bairro é obrigatório" },
    },
    city: { presence: { allowEmpty: false, message: "^Cidade é obrigatório" } },
    uf: { presence: { allowEmpty: false, message: "^UF é obrigatório" } },
  };

  //Atualização de dados do formulário
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

    const errors = validate(dataForm.values, schemaPassword);

    dataForm = {
      ...dataForm,
      isValid: errors ? false : true,
      errors: errors || {},
    };

    setFormStatePass(dataForm);
  };
  //Atualizar dados do Formulário Endereço do Estabelecimento
  const handleChangeAddStore = (event) => {
    event.persist();

    let dataForm = {
      ...formAddressStore,
      values: {
        ...formAddressStore.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formAddressStore.touched,
        [event.target.name]: true,
      },
    };

    const errors = validate(dataForm.values, schemaAddress);

    dataForm = {
      ...dataForm,
      isValid: errors ? false : true,
      errors: errors || {},
    };

    setFormAddressStore(dataForm);
  };

  // Verificar errors no formulário alterar password
  const hasError = (field, form) => {
    switch (form) {
      case nameForm.PASSWORD:
        return formStatePass.touched[field] && formStatePass.errors[field]
          ? true
          : false;
      case nameForm.ADDRESS_STORE:
        return formAddressStore.touched[field] && formAddressStore.errors[field]
          ? true
          : false;
      default:
        break;
    }
  };
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

    localStorage.setItem(
      "_activeUserCasaCarnePremium",
      JSON.stringify(data.user)
    );
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
  // Limpar todos os campos do formulário
  const cleanFieldChangePass = () => {
    setModalPassword(false);
    setFormStatePass({
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    });
  };
  // Salvar Alterações do Endereço do Estabelecimeto
  const handleUpdateAddressStore = async () => {
    await updateAddressStore(formAddressStore.values).then((response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.error
          ? "Ocorreu um erro na atualização de dados"
          : "Dados atualizados",
      });
    });
  };
  // Consultar cep
  const handleCEP = async (cep) => {
    getCep(cep).then((response) => {
      if (response.erro === true) {
        dispatch({
          type: SET_MESSAGE,
          payload: "CEP incorreto.",
        });
      } else {
        let dataForm = {
          ...formAddressStore,
          values: {
            ...formAddressStore.values,
            cep: response.cep,
            address: response.logradouro,
            neighborhood: response.bairro,
            city: response.localidade,
            uf: response.uf,
            number: "",
          },
        };
        const errors = validate(dataForm.values, schemaAddress);

        dataForm = {
          ...dataForm,
          isValid: errors ? false : true,
          errors: errors || {},
        };
        setFormAddressStore(dataForm);
      }
    });
  };
  // Alterar dados do formuário sendo armazenado em uma variavel temporária 'changeTempOpenHours'
  const handleChangeOpeningHours = (id, event) => {
    let nameField = event.target.name;
    // Remover todos os número da string e espaços
    nameField = nameField.replace(/[0-9]/g, "").trim();
    const changeOpening = changeTempOpenHours.values.map((item) =>
      item.id === id
        ? {
            ...item,
            isChanger: true,
            [nameField]:
              event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value,
          }
        : item
    );
    //
    setChangerTempOpenHours({
      ...changeTempOpenHours,
      values: changeOpening,
    });
  };
  // Carregar dados de funcionamentos no Modal
  const handleLoadDateOpeningHours = () => {
    setChangerTempOpenHours({
      openModal: !changeTempOpenHours.openModal,
      values: [...openingHours],
    });
  };
  // Efetivar a atualização do formulário Horário de funcionamento
  const handleSubmitOpeningHours = async () => {
    // Capturar apenas os horáro que foram alterados
    const dataChangeOpeninHours = changeTempOpenHours.values.filter((item) => {
      if (item.isChanger) {
        delete item.isChanger;
        return item;
      }
      return null;
    });
    // Enviar atualização para backenc
    const resp = await updateOpenigHours(dataChangeOpeninHours);
    // Caso a atualização ocorra com sucesso
    if (resp.success) {
      // Atualizar o frontend com os dados novos e remover isChanger
      const changerOpeningHours = changeTempOpenHours.values.map((hours) => {
        delete hours.isChanger;
        return hours;
      });
      // Atualizar variavel do front
      setOpeningHours(changerOpeningHours);
      // Fechar o modal de horário
      setChangerTempOpenHours({
        openModal: false,
        values: [],
      });
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
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
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Meu Perfil</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Estabelecimento</Label>
                        <Input
                          defaultValue="Casa de Carne Premium"
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
                        <Label>Nome</Label>
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
                        <Label>Telefone</Label>
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
                        <Label>Email</Label>
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
                        Salvar alterações
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
        </Row>

        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h6">Endereço do Estabelecimento</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>CEP</Label>
                        <Input
                          name="cep"
                          onBlur={(event) => handleCEP(event.target.value)}
                          placeholder="CEP"
                          value={formAddressStore.values.cep || ""}
                          onChange={(event) => handleChangeAddStore(event)}
                          type="text"
                          invalid={hasError("cep", nameForm.ADDRESS_STORE)}
                        />
                        {formAddressStore.touched.cep &&
                          Array.isArray(formAddressStore.errors.cep) &&
                          formAddressStore.errors.cep.map((error, idx) => {
                            return <FormText key={idx}>{error}</FormText>;
                          })}
                      </FormGroup>
                    </Col>
                    <Col md="7">
                      <FormGroup>
                        <Label>Endereço</Label>
                        <Input
                          name="address"
                          placeholder="Endereço"
                          value={formAddressStore.values.address || ""}
                          onChange={(event) => handleChangeAddStore(event)}
                          type="text"
                          invalid={hasError("address", nameForm.ADDRESS_STORE)}
                        />
                        {formAddressStore.touched.address &&
                          Array.isArray(formAddressStore.errors.address) &&
                          formAddressStore.errors.address.map((error, idx) => {
                            return <FormText key={idx}>{error}</FormText>;
                          })}
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>Número</Label>
                        <Input
                          name="number"
                          placeholder="Número"
                          value={formAddressStore.values.number || ""}
                          onChange={(event) => handleChangeAddStore(event)}
                          type="text"
                          invalid={hasError("number", nameForm.ADDRESS_STORE)}
                        />
                        {formAddressStore.touched.number &&
                          Array.isArray(formAddressStore.errors.number) &&
                          formAddressStore.errors.number.map((error, idx) => {
                            return <FormText key={idx}>{error}</FormText>;
                          })}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Bairro</Label>
                        <Input
                          name="neighborhood"
                          placeholder="Bairro"
                          value={formAddressStore.values.neighborhood || ""}
                          onChange={(event) => handleChangeAddStore(event)}
                          type="text"
                          invalid={hasError(
                            "neighborhood",
                            nameForm.ADDRESS_STORE
                          )}
                        />
                        {formAddressStore.touched.neighborhood &&
                          Array.isArray(formAddressStore.errors.neighborhood) &&
                          formAddressStore.errors.neighborhood.map(
                            (error, idx) => {
                              return <FormText key={idx}>{error}</FormText>;
                            }
                          )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Cidade</Label>
                        <Input
                          name="city"
                          placeholder="Cidade"
                          value={formAddressStore.values.city || ""}
                          onChange={(event) => handleChangeAddStore(event)}
                          type="text"
                          invalid={hasError("city", nameForm.ADDRESS_STORE)}
                        />
                        {formAddressStore.touched.city &&
                          Array.isArray(formAddressStore.errors.city) &&
                          formAddressStore.errors.city.map((error, idx) => {
                            return <FormText key={idx}>{error}</FormText>;
                          })}
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label>UF</Label>
                        <Input
                          name="uf"
                          placeholder="UF"
                          value={formAddressStore.values.uf || ""}
                          onChange={(event) => handleChangeAddStore(event)}
                          type="text"
                          invalid={hasError("uf", nameForm.ADDRESS_STORE)}
                        />
                        {formAddressStore.touched.uf &&
                          Array.isArray(formAddressStore.errors.uf) &&
                          formAddressStore.errors.uf.map((error, idx) => {
                            return <FormText key={idx}>{error}</FormText>;
                          })}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        disabled={!formAddressStore.isValid}
                        onClick={handleUpdateAddressStore}
                      >
                        Salvar alterações
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h6">Horário de funcionamento</CardTitle>
              </CardHeader>
              <CardBody>
                {openingHours.map((item, idx) => (
                  <div key={idx} className="contentOpeningHours border-bottom">
                    <div>{item.week}</div>
                    <div>
                      {item.open ? `${item.start} às  ${item.end}` : "Fechado"}
                    </div>
                  </div>
                ))}
              </CardBody>
              <CardFooter>
                <div className="contentFooter">
                  <i
                    onClick={handleLoadDateOpeningHours}
                    className="fas fa-pen"
                  ></i>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

      {/* MODAL DE ALTERAR SENHA */}
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
              invalid={hasError("oldPassword", nameForm.PASSWORD)}
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
              invalid={hasError("newPassword", nameForm.PASSWORD)}
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
              invalid={hasError("confPassword", nameForm.PASSWORD)}
            />
            {formStatePass.touched.confPassword &&
              Array.isArray(formStatePass.errors.confPassword) &&
              formStatePass.errors.confPassword.map((error, idx) => {
                return <FormText key={idx}>{error}</FormText>;
              })}
          </FormGroup>
        </div>
      </ModalView>

      {/* MODAL EDITA HORÁRIO FUNCIONAMENTO */}
      <ModalView
        title={
          <>
            <i className="fa fa-clock" />{" "}
            <Label> Editar horário de funcionamento</Label>
          </>
        }
        size="lg"
        modal={changeTempOpenHours.openModal}
        toggle={() =>
          setChangerTempOpenHours({
            ...changeTempOpenHours,
            openModal: !changeTempOpenHours.openModal,
          })
        }
        confirmed={() => handleSubmitOpeningHours()}
      >
        {changeTempOpenHours.values.map((item, idx) => (
          <Row key={idx} className="lineOpeningHours">
            <Col md="3">
              <FormGroup>
                <span>{item.week}</span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <CustomInput
                  type="switch"
                  id={`open ${idx}`}
                  name={`open ${idx}`}
                  label={item.open ? "Aberto" : "Fecahdo"}
                  checked={item.open || false}
                  onChange={(event) => handleChangeOpeningHours(item.id, event)}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              {item.open && (
                <FormGroup>
                  <Input
                    name="start"
                    value={item.start || ""}
                    type="time"
                    onChange={(event) =>
                      handleChangeOpeningHours(item.id, event)
                    }
                  />
                </FormGroup>
              )}
            </Col>
            <Col md="3">
              {item.open && (
                <FormGroup>
                  <Input
                    name="end"
                    value={item.end || ""}
                    type="time"
                    onChange={(event) =>
                      handleChangeOpeningHours(item.id, event)
                    }
                  />
                </FormGroup>
              )}
            </Col>
          </Row>
        ))}
      </ModalView>
    </>
  );
};

export default User;
