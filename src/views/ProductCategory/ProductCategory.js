import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import validade from "validate.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  FormGroup,
  Input,
  Spinner,
  Label,
  CustomInput,
  FormText,
} from "reactstrap";

import "./styles.css";
import {
  getProductGroupCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  visibleAppCategory,
  getTypeAdditional,
  createTypeAdditional,
  updateTypeAdditional,
  deleteTypeAdditional,
  getAdditional,
  createAdditional,
  updateAdditional,
  deleteAdditional,
} from "../../hooks";

import { SET_MESSAGE } from "../../store/Actions/types";
import { ModalView } from "../../components";
import icoTrash from "../../assets/img/icoTrash-64.gif";
import icoUploadToCloud from "../../assets/img/icon-upload-to-cloud.svg";
import icoEdit from "../../assets/img/icoEdit_64.png";
import icoPlus from "../../assets/img/icoPlus.gif";
import imgNoMobile from "../../assets/img/noMobile.png";
import imgMobile from "../../assets/img/mobile.png";
import imgUniqueChoice from "../../assets/img/imgUniqueChoice.svg";
import imgMultChoice from "../../assets/img/imgMultChoice.svg";
import { url } from "../../services/host";
let FormStateProps = {
  isValid: false,
  isEdit: false,
  isDelete: false,
  typeForm: "",
  touched: {},
  values: {},
  errors: {},
  image: [],
};

// Definido os tipos de Formulário na page
const typeForm = {
  CATEGORY: "CATEGORY",
  TYPE_ADDITIONAL: "TYPE_ADDITIONAL",
  ADDITIONAL: "ADDITIONAL",
};

const ProductCategory = (props) => {
  const history = useHistory();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [categorys, setCategorys] = useState([]);
  const [typeAdditional, setTypeAdditional] = useState([]);
  const [additional, setAdditional] = useState([]);
  const [showAdditional, setShowAdditional] = useState({
    show: false,
    selectedTypeAdditional: {},
  });
  const [formState, setFormState] = useState(FormStateProps);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalEditCategory, setIsModalEditCategory] = useState(false);
  const [isModalRemove, setIsModalRemove] = useState(false);
  const [isModalTypeAddit, setIsModalTypeAddit] = useState(
    state?.showTypeAdditional || false
  );
  const [isModalAddit, setIsModalAddit] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);

  const schemaTypeAdditional = {
    description: {
      presence: { allowEmpty: false, message: "^Descrição é obrigatória" },
      length: {
        minimum: 3,
        message: "^Sua descrição deve ter no mínimo 3 caracteres",
      },
    },
  };
  const schemaCategory = {
    name: {
      presence: {
        allowEmpty: false,
        message: "^Nome da categoria obrigatória",
      },
      length: {
        minimum: 3,
        message: "^Nome da categoria deve ter no mínimo 3 caracteres",
      },
    },
  };
  const schemaAdditional = {
    description: {
      presence: { allowEmpty: false, message: "^Descrição é obrigatória" },
      length: {
        minimum: 3,
        message: "^Sua descrição deve ter no mínimo 3 caracteres",
      },
    },
    price: {
      presence: { allowEmpty: false, message: "^Valor obrigatório" },
      numericality: { strict: true, message: "^Valor invalido." },
    },
  };

  useEffect(() => {
    (() => {
      setIsLoading(true);
      //Carregar categoria
      getProductGroupCategory().then((response) => {
        setCategorys(response);
        setTotalProduct(
          response.reduce((acc, item) => acc + Number(item.TotalProduct), 0)
        );
        //Carregar tipo de adicionais
        getTypeAdditional().then((response) => setTypeAdditional(response));
      });
      setIsLoading(false);
    })();
  }, []);

  const clearFormState = () => {
    setFormState({
      isValid: false,
      isEdit: false,
      isDelete: false,
      typeForm: "",
      touched: {},
      values: {},
      errors: {},
      image: [],
    });
  };

  const handleChange = (event) => {
    event.persist();

    let dataForm = {
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
      image:
        (event.target.type === "file" && Array.from(event.target.files)) || [],
    };

    let errors = false;

    //Selecionar o tipo de formulário para Validação dos DADOS
    switch (formState.typeForm) {
      case typeForm.CATEGORY:
        errors = validade(dataForm.values, schemaCategory);
        break;
      case typeForm.TYPE_ADDITIONAL:
        errors = validade(dataForm.values, schemaTypeAdditional);
        break;
      case typeForm.ADDITIONAL:
        errors = validade(dataForm.values, schemaAdditional);
        break;
      default:
        break;
    }

    dataForm = {
      ...dataForm,
      isValid: errors ? false : true,
      errors: errors || {},
    };

    setFormState(dataForm);
  };
  // Verificar errors no formulário alterar password
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  // Deletar categoria
  const handleDeleteCategory = () => {
    deleteCategory(formState).then(() => {
      dispatch({
        type: SET_MESSAGE,
        payload: `Categoria '${formState.values.name}' excluída.`,
      });
      //Remover a categoria da lista da page
      const newListCategorys = categorys.filter(
        (item) => item.categoryId !== formState.values.categoryId
      );
      setCategorys(newListCategorys);
      setIsModalRemove(false);
      clearFormState();
    });
  };
  // Exibe e oculta categoria do aplicativo
  const handleChangeVisibleApp = (item) => {
    visibleAppCategory(item).then((response) => {
      if (response) {
        const newCategory = categorys.map((cat) => {
          if (cat.name === item.name) {
            return {
              ...cat,
              categoryVisible: !item.categoryVisible,
            };
          }
          return cat;
        });
        setCategorys(newCategory);
      }
    });
  };
  // Abrir modal:  Novo tipo de Adiconal
  const handleNewTypeAdditional = () => {
    setFormState({
      ...formState,
      isValid: false,
      isEdit: false,
      typeForm: typeForm.TYPE_ADDITIONAL,
      values: {},
    });
    setIsModalTypeAddit(!isModalTypeAddit);
  };
  // Abrir modal: Novo adicional
  const handleNewAddicional = (idTypeAdditional) => {
    setFormState({
      ...formState,
      isValid: false,
      isEdit: false,
      typeAdditional_id: idTypeAdditional,
      typeForm: typeForm.ADDITIONAL,
      values: {},
    });
    setIsModalAddit(true);
  };
  // Abrir modal: Adicionar nova Categoria
  const handleNewCategory = () => {
    setFormState({
      ...formState,
      isValid: false,
      isEdit: false,
      typeForm: typeForm.CATEGORY,
      values: {},
      image: [],
    });
    setIsModalEditCategory(!isModalEditCategory);
  };
  // Selecionar o tipo de Categorias
  const handleSelectCategoy = (category, action) => {
    switch (action) {
      case "edit":
        setFormState({
          ...formState,
          isEdit: true,
          isValid: true,
          values: category,
          typeForm: typeForm.CATEGORY,
          image: [],
        });
        setIsModalEditCategory(true);
        break;
      case "delete":
        setFormState({
          ...formState,
          isDelete: true,
          isEdit: false,
          isValid: false,
          values: category,
          typeForm: typeForm.CATEGORY,
          image: [],
        });
        setIsModalRemove(true);
        break;
      default:
        break;
    }
  };

  // Selecionar o tipo de Adicioanais
  const handleSelectedTypeAdditional = (selectedTypeAdditional, action) => {
    clearFormState();
    switch (action) {
      case "edit":
        setFormState({
          ...formState,
          isValid: true,
          isEdit: true,
          typeForm: typeForm.TYPE_ADDITIONAL,
          values: selectedTypeAdditional,
        });
        setIsModalTypeAddit(true);
        break;
      case "delete":
        const isDelete = window.confirm(
          `Excluir o item "${selectedTypeAdditional.description}"`
        );
        // Excluir o item tipo de adicional do banco de dados
        if (isDelete) {
          deleteTypeAdditional(selectedTypeAdditional.id);
          // Excluir o item da lista
          const newListaTypeAdditional = typeAdditional.filter(
            (item) => item.id !== selectedTypeAdditional.id
          );
          setTypeAdditional(newListaTypeAdditional);
          setShowAdditional({ show: false, selectedTypeAdditional: "" });
        }
        break;
      case "showAdditional":
        getAdditional(selectedTypeAdditional.id).then((response) => {
          setAdditional(response);
          setShowAdditional({
            show: true,
            selectedTypeAdditional: selectedTypeAdditional,
          });
        });
        break;
      default:
        break;
    }
  };
  // Selecionar um adicional
  const handleSelectedAdditional = (selectedAdditional, action) => {
    clearFormState();
    switch (action) {
      case "edit":
        setFormState({
          ...formState,
          isValid: true,
          isEdit: true,
          typeForm: typeForm.ADDITIONAL,
          values: selectedAdditional,
        });
        setIsModalAddit(true);
        break;
      case "delete":
        const isDelete = window.confirm(
          `Excluir o item "${selectedAdditional.description}"`
        );
        // Excluir o item tipo de adicional do banco de dados
        if (isDelete) {
          deleteAdditional(selectedAdditional.id);
          // Excluir o item da lista
          const newListaAdditional = additional.filter(
            (item) => item.id !== selectedAdditional.id
          );
          setAdditional(newListaAdditional);
        }
        break;
      default:
        break;
    }
  };
  //Enviar dados de Typo de Adicionais
  const handleSubmitTypeAdditional = () => {
    const dataTypeAdditional = {
      description: formState.values.description,
      manySelected: formState.values.manySelected || false,
      typeAdditionVisible: true,
      limitAdditional: formState.values.limitAdditional,
    };

    // Validadação de dados correta
    if (formState.isValid) {
      // Editar um adicional
      if (formState.isEdit) {
        updateTypeAdditional(formState.values).then((response) => {
          const changeTypeAddicional = typeAdditional.map((item) =>
            item.id === response.id ? response : item
          );
          setTypeAdditional(changeTypeAddicional);
          setIsModalTypeAddit(false);
        });
        clearFormState();
      } else {
        // Senão adicionar novo type de adicional
        createTypeAdditional(dataTypeAdditional).then((response) => {
          setTypeAdditional([...typeAdditional, response]);
          setIsModalTypeAddit(false);
          setAdditional([]);
          setShowAdditional({
            show: true,
            selectedTypeAdditional: response,
          });
        });
        clearFormState();
      }
    }
  };
  //Enviar dados tipo de Categoria
  const handleSubmitCategory = async () => {
    // Validadação de dados correta
    if (formState.isValid) {
      if (formState.isEdit) {
        await updateCategory(formState).then(() => {
          //Atualizar tabale da page
          const newListCategory = categorys.map((item) =>
            item.categoryId === formState.values.categoryId
              ? formState.values
              : item
          );
          setCategorys(newListCategory);
          setIsModalEditCategory(false);
          clearFormState();
        });
      } else {
        // Senão não for isEdit=true adicionao nova categoria
        createCategory(formState).then((response) => {
          setCategorys([...categorys, response]);
          setIsModalEditCategory(false);
          clearFormState();
        });
      }
    }
  };
  // Enviar dados adicionais
  const handleSubmitAdditional = async () => {
    // Validadação de dados correta
    if (formState.isValid) {
      // montar o dados para enviar a api
      const dataAdditional = {
        description: formState.values.description,
        price: formState.values.price,
        typeAdditional_id: formState.typeAdditional_id,
      };

      // Editar um adicional
      if (formState.isEdit) {
        updateAdditional(formState).then(() => {
          const newListaAdditional = additional.map((item) =>
            item.id === formState.values.id ? formState.values : item
          );
          setAdditional(newListaAdditional);
          setIsModalAddit(false);
        });
        clearFormState();
      } else {
        createAdditional(dataAdditional).then((response) => {
          setAdditional([...additional, response]);
          setIsModalAddit(false);
        });
        clearFormState();
      }
    }
  };
  // Ativar visible typeAdditional
  const handleShowVisibleTypeAdditional = async (itemTypeAdditional) => {
    const data = {
      ...itemTypeAdditional,
      typeAdditionVisible: !itemTypeAdditional.typeAdditionVisible,
    };
    updateTypeAdditional(data).then((response) => {
      const changeTypeAddicional = typeAdditional.map((item) =>
        item.id === response.id ? response : item
      );
      setTypeAdditional(changeTypeAddicional);
    });
  };

  return (
    <div className="content">
      {/* CATEGORIA */}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Categorias de Produtos</CardTitle>
              <div>
                <Button
                  className="btn"
                  outline
                  size="sm"
                  onClick={handleNewCategory}
                >
                  <i className="fa fa-plus" /> Nova Categoria
                </Button>
                <Button
                  className="btn"
                  outline
                  size="sm"
                  onClick={() => history.push({ pathname: "productNew" })}
                >
                  <i className="fa fa-plus" /> Novo Produto
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Image</th>
                    <th>Categoria</th>
                    <th>Qtd. produto na categoria</th>
                    <th style={{ textAlign: "center" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <object
                          data={item.image_url}
                          type="image/png"
                          className="avatar"
                        >
                          <img
                            src={`${url}/uploads/default.jpg`}
                            alt={item.description}
                            className="avatar"
                          />
                        </object>
                      </td>
                      <td>
                        <img
                          style={{
                            height: 28,
                            paddingRight: 10,
                            cursor: "pointer",
                          }}
                          src={item.categoryVisible ? imgMobile : imgNoMobile}
                          alt="mobile"
                          onClick={() => handleChangeVisibleApp(item)}
                        />
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSelectCategoy(item, "edit")}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td>{item.TotalProduct}</td>
                      <td>
                        <div className="groupButton">
                          <Button
                            className="btn-round btn-icon"
                            color="danger"
                            outline
                            size="sm"
                            onClick={() => handleSelectCategoy(item, "delete")}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                          <Button
                            className="btn-round btn-icon"
                            color="info"
                            outline
                            size="sm"
                            onClick={() => handleSelectCategoy(item, "edit")}
                          >
                            <i className="fa fa-edit" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {isLoading && (
                <div className="isloading">
                  <Spinner color="#f1f1f1" size="md" />
                </div>
              )}
            </CardBody>
            <CardFooter>
              <p>
                <span style={{ paddingRight: "25px" }}>
                  Quantidade de categorias: <strong>{categorys.length}</strong>
                </span>
                <span>
                  Total de produtos: <strong>{totalProduct}</strong>
                </span>
              </p>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {/* TIPO DE ADICIONAIS */}
      <Row>
        <Col md={showAdditional.show ? 6 : 12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Tipos de Adicionais</CardTitle>
              <Label>
                São os tipos de adicionais que irão aparecer nos produtos
              </Label>
              <div>
                <Button
                  className="btn"
                  outline
                  size="sm"
                  onClick={handleNewTypeAdditional}
                >
                  <i className="fa fa-plus" /> Novo tipo
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th style={{ textAlign: "center" }}>Qtd escolha</th>
                    <th>Tipos</th>
                    <th style={{ textAlign: "center" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {typeAdditional.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ textAlign: "center" }}>
                        <img
                          style={{ height: 50 }}
                          src={
                            item.manySelected ? imgMultChoice : imgUniqueChoice
                          }
                          alt="icone unique choice"
                        />
                      </td>

                      <td>
                        <img
                          style={{
                            height: 28,
                            paddingRight: 10,
                            cursor: "pointer",
                          }}
                          src={
                            item.typeAdditionVisible ? imgMobile : imgNoMobile
                          }
                          alt="mobile"
                          onClick={() => handleShowVisibleTypeAdditional(item)}
                        />
                        {item.description}
                      </td>
                      <td>
                        <div className="groupButton">
                          <Button
                            className="btn-round btn-icon"
                            color="danger"
                            outline
                            size="sm"
                            onClick={() =>
                              handleSelectedTypeAdditional(item, "delete")
                            }
                          >
                            <i className="fa fa-trash" />
                          </Button>
                          <Button
                            className="btn-round btn-icon"
                            color="info"
                            outline
                            size="sm"
                            onClick={() =>
                              handleSelectedTypeAdditional(item, "edit")
                            }
                          >
                            <i className="fa fa-edit" />
                          </Button>
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                            onClick={() =>
                              handleSelectedTypeAdditional(
                                item,
                                "showAdditional"
                              )
                            }
                          >
                            <i className="fa fa-forward" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          {showAdditional.show && (
            <Col md="12">
              <Card>
                <CardHeader>
                  <Button
                    close
                    onClick={() =>
                      setShowAdditional({
                        show: false,
                        selectedTypeAdditional: {},
                      })
                    }
                  />
                  <CardTitle tag="h4">
                    {showAdditional.selectedTypeAdditional.description}
                  </CardTitle>
                  <img
                    style={{ height: 50 }}
                    src={
                      showAdditional.selectedTypeAdditional.manySelected
                        ? imgMultChoice
                        : imgUniqueChoice
                    }
                    alt="icone unique choice"
                  />
                  <Label>
                    {" "}
                    Neste tipo de adicionais, o usuário poderá escolher
                    <strong>
                      {" "}
                      {showAdditional.selectedTypeAdditional.manySelected
                        ? " mais de "
                        : " apenas "}
                      uma opção
                    </strong>
                    .
                  </Label>
                </CardHeader>
                <CardBody>
                  {additional.length > 0 && (
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Tipos</th>
                          <th style={{ textAlign: "right" }}>Preço</th>
                          <th style={{ textAlign: "center" }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {additional.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <i
                                style={{
                                  paddingRight: 15,
                                  color: "#C6C6C6",
                                }}
                                className={"fa fa-chevron-right"}
                              />{" "}
                              <span>{item.description}</span>
                            </td>
                            {item.price === "0.00" ? (
                              <td
                                style={{ color: "#008000", textAlign: "right" }}
                              >
                                grátis
                              </td>
                            ) : (
                              <td style={{ textAlign: "right" }}>
                                R$ {item.price}
                              </td>
                            )}
                            <td>
                              <div className="groupButton">
                                <Button
                                  className="btn-round btn-icon"
                                  color="danger"
                                  outline
                                  size="sm"
                                  onClick={() =>
                                    handleSelectedAdditional(item, "delete")
                                  }
                                >
                                  <i className="fa fa-trash" />
                                </Button>
                                <Button
                                  className="btn-round btn-icon"
                                  color="info"
                                  outline
                                  size="sm"
                                  onClick={() =>
                                    handleSelectedAdditional(item, "edit")
                                  }
                                >
                                  <i className="fa fa-edit" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
                <CardFooter>
                  <div>
                    <Button
                      className="btn"
                      outline
                      size="sm"
                      onClick={() =>
                        handleNewAddicional(
                          showAdditional.selectedTypeAdditional.id
                        )
                      }
                    >
                      <i className="fa fa-plus" /> Adicionar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          )}
        </Col>
      </Row>

      {/* ---------------------------------------------------------------------
        * MODAL: ADICIONAR/EDITAR CATEGORIA 
      ------------------------------------------------------------------------*/}
      <ModalView
        title={
          <>
            <img src={icoEdit} alt="icon" />
            <Label>
              {formState.isEdit ? "Editar categoria" : "Nova Categoria"}
            </Label>
          </>
        }
        modal={isModalEditCategory}
        toggle={() => setIsModalEditCategory(!isModalEditCategory)}
        confirmed={handleSubmitCategory}
      >
        <div>
          <FormGroup>
            <label>Nome da Categoria</label>
            <Input
              placeholder="Nome da categoria"
              type="text"
              name="name"
              value={formState.values.name || ""}
              invalid={hasError("name")}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          {formState.touched.name &&
            Array.isArray(formState.errors.name) &&
            formState.errors.name.map((error, idx) => {
              return (
                <FormText key={idx}>
                  <span className="error">{error}</span>
                </FormText>
              );
            })}
          <div className="text-center imgProductCategory">
            {formState.image.length === 0 &&
            formState.values.image_url === undefined ? (
              <div>
                <label htmlFor="input-file">
                  <img src={icoUploadToCloud} alt="icon Upload" />
                </label>
              </div>
            ) : (
              <div className="buttonSelectedImg">
                <span>Clique na imagem para alterar</span>
              </div>
            )}

            <label htmlFor="input-file">
              <object
                style={{
                  cursor: "pointer",
                  height: "200px",
                  borderRadius: "8px",
                }}
                data={
                  formState.image.length === 0
                    ? formState.values.image_url
                    : URL.createObjectURL(formState.image[0])
                }
                type="image/png"
                className="avatar"
              >
                <img
                  src={`${url}/uploads/default.jpg`}
                  alt={formState.values.image_url || ""}
                  className="avatar"
                />
              </object>
              {/* <img
                style={{
                  cursor: "pointer",
                  height: "200px",
                  borderRadius: "8px",
                }}
                src={
                  formState.image.length === 0
                    ? formState.values.image_url
                    : URL.createObjectURL(formState.image[0])
                }
                alt={formState.values.image_url || ""}
              /> */}
            </label>
            <input
              id="input-file"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => handleChange(event)}
            />
          </div>
        </div>
      </ModalView>
      {/* MODAL EXCLUIR CATEGORIA */}
      <ModalView
        title={
          <>
            <img src={icoTrash} alt="trash" style={{ height: 40 }} />{" "}
            <Label> Excluir Categoria </Label>
          </>
        }
        modal={isModalRemove}
        toggle={() => setIsModalRemove(!isModalRemove)}
        confirmed={handleDeleteCategory}
      >
        <div className="text-center">
          <strong>Deseja realmente excluir a categoria?</strong>
          <h5>{formState.values.name}</h5>
          {formState.values.TotalProduct > 0 && (
            <>
              <p className="text-info">
                Você tem nesta categoria{" "}
                <strong>{formState.values.TotalProduct}</strong> produto
                cadastrado.
              </p>
              <p>Se confirmar a excluição o produto também será excluído.</p>
            </>
          )}
        </div>
      </ModalView>
      {/* MODAL NOVO TIPO DE ADICIONAL */}
      <ModalView
        title={
          <>
            <img src={icoPlus} alt="trash" style={{ height: 40 }} />{" "}
            {formState.isEdit ? (
              <Label> Atualizar tipo de adicional </Label>
            ) : (
              <Label> Novo tipo de adicional </Label>
            )}
          </>
        }
        modal={isModalTypeAddit}
        toggle={() => setIsModalTypeAddit(!isModalTypeAddit)}
        confirmed={handleSubmitTypeAdditional}
      >
        <Row>
          <Col md="12">
            <FormGroup>
              <label>Descrição do tipo</label>
              <Input
                placeholder="Descrição"
                type="text"
                name="description"
                invalid={hasError("description")}
                value={formState.values.description || ""}
                onChange={(event) => handleChange(event)}
              />
              {formState.touched.description &&
                Array.isArray(formState.errors.description) &&
                formState.errors.description.map((error, idx) => {
                  return (
                    <FormText key={idx}>
                      <span className="error">{error}</span>
                    </FormText>
                  );
                })}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <span style={{ fontSize: 12, padding: 20 }}>
            Caso o tipo do adicional permite que o usuários escolha mais de uma
            opção, selecione multipla escolha.
          </span>
          <Col md="12">
            <FormGroup>
              <CustomInput
                type="switch"
                id="manySelected"
                name="manySelected"
                label="Multipla escolha."
                checked={formState.values.manySelected || false}
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
          </Col>
        </Row>
        {formState.values.manySelected === true && (
          <>
            <Row>
              <span
                style={{
                  fontSize: 12,
                  paddingTop: 50,
                  paddingLeft: 20,
                  paddingBottom: 15,
                }}
              >
                Informe a quantidade limite de escolha do adicional do produto.
              </span>
            </Row>

            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col md="6">
                <label>Definir o limite:</label>
              </Col>
              <Col md="6">
                <Input
                  name="limitAdditional"
                  type="number"
                  placeholder="ilimitado"
                  value={formState.values.limitAdditional || ""}
                  onChange={(event) =>
                    event.target.value !== "0"
                      ? handleChange(event)
                      : setFormState({
                          ...formState,
                          values: {
                            ...formState.values,
                            limitAdditional: "",
                          },
                        })
                  }
                  min="0"
                  max="100"
                />
              </Col>
            </Row>
          </>
        )}
      </ModalView>
      {/* MODAL ADICIONAIS */}
      <ModalView
        title={
          <>
            <img src={icoPlus} alt="trash" style={{ height: 40 }} />{" "}
            {formState.isEdit ? (
              <Label> Atualizar adicional </Label>
            ) : (
              <Label> Novo adicional </Label>
            )}
          </>
        }
        modal={isModalAddit}
        toggle={() => setIsModalAddit(!isModalAddit)}
        confirmed={handleSubmitAdditional}
      >
        <Row>
          <Col md="12">
            <FormGroup>
              <label>Descrição</label>
              <Input
                placeholder="Descrição"
                type="text"
                name="description"
                invalid={hasError("description")}
                value={formState.values.description || ""}
                onChange={(event) => handleChange(event)}
              />
              {formState.touched.description &&
                Array.isArray(formState.errors.description) &&
                formState.errors.description.map((error, idx) => (
                  <FormText key={idx}>
                    <span className="error">{error}</span>
                  </FormText>
                ))}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <FormGroup>
              <label>Descrição</label>
              <Input
                placeholder="informe o valor"
                type="text"
                name="price"
                invalid={hasError("price")}
                value={formState.values.price || ""}
                onChange={(event) => handleChange(event)}
              />
              {formState.touched.price &&
                Array.isArray(formState.errors.price) &&
                formState.errors.price.map((error, idx) => (
                  <FormText key={idx}>
                    <span className="error">{error}</span>
                  </FormText>
                ))}
            </FormGroup>
          </Col>
        </Row>
      </ModalView>
    </div>
  );
};

export default ProductCategory;
