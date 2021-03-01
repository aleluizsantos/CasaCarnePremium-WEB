import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { SET_MESSAGE } from "../../store/Actions/types";
import {
  getCategorys,
  getMeasureUnit,
  toCurrency,
  createProduct,
  updateProduct,
} from "../../hooks";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";

const ProductNew = (props) => {
  const { state } = props.location;
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [measureUnit, setMeasureUnit] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [hideMobile, setHideMobile] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [promotion, setPromotion] = useState(0);
  const [pricePromotion, setPricePromotion] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [category_id, setCategory_id] = useState("");
  const [measureUnid_id, setMeasureUnid_id] = useState("");

  useEffect(() => {
    (() => {
      if (state !== undefined) {
        setName(state.name);
        setDescription(state.description);
        setPrice(state.price);
        setPreviewImage([state.image_url]);
        setPromotion(state.promotion ? 1 : 0);
        setPricePromotion(state.pricePromotion);
        setCategory_id(state.category_id);
        setMeasureUnid_id(state.measureUnid_id);
      }
    })();
  }, [state]);

  useEffect(() => {
    (() => {
      getCategorys().then((response) => setCategorys(response));
      getMeasureUnit().then((response) => setMeasureUnit(response));
    })();
  }, []);

  // Selecionar imagem e salvar no state
  // --------------------------------------------------------------------
  const handleSelectImage = (event) => {
    if (!event.target.files) {
      return;
    }
    // método Array.from() cria uma nova instância de um Array quando for
    // passado um array-like ou um iterable object como argumento
    const selectImage = Array.from(event.target.files);
    setImage(selectImage);
    // Cria um novo objeto URL, cujo tempo de vida está ligado ao document na
    // janela na qual este objeto foi criado. O novo objeto URL representa o
    // objeto File
    const selectImagePreview = selectImage.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImage(selectImagePreview);
  };

  const handleRemoverImage = () => {
    setImage([]);
    setPreviewImage([]);
  };

  const handleChangePrice = (number) => {
    const numberFormat = toCurrency(number);
    setPrice(numberFormat);
  };
  const handleChangePricePromotion = (number) => {
    const numberFormat = toCurrency(number);
    setPricePromotion(numberFormat);
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setPromotion(false);
    setPricePromotion(0);
    setCategory_id("");
    setMeasureUnid_id("");
    setImage([]);
    setPreviewImage([]);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    setIsloading(true);

    // validação dos dados
    if (name === "" || description === "" || price === "") {
      setIsloading(false);
      return dispatch({
        type: SET_MESSAGE,
        payload: "Verifique os campos obrigatórios",
      });
    }

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", parseFloat(price));
    data.append("promotion", !!promotion);
    data.append("pricePromotion", parseFloat(pricePromotion));
    data.append("category_id", parseInt(category_id));
    data.append("measureUnid_id", parseInt(measureUnid_id));

    // Incluir todas as imagens selecionadas
    image.forEach((img) => {
      data.append("image", img);
    });

    // Salvar ou criar um novo produto, se existir o state enviado pelo
    // produto ATUALIZAR senão SALVAR
    if (state !== undefined) {
      // ATUALIZAR os dados do produto
      updateProduct(state.id, data).then((response) => {
        response.success &&
          dispatch({
            type: SET_MESSAGE,
            payload: "Seu produto foi atualizado com sucesso.",
          });
        history.goBack();
      });
    } else {
      // SALVAR os dados do novo produto
      createProduct(data).then((response) => {
        response.success &&
          dispatch({
            type: SET_MESSAGE,
            payload: "Seu produto foi adiconado com sucesso.",
          });
        clearFields();
        setIsloading(false);
      });
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="12">
            <Card className="card-user">
              {!hideMobile && (
                <i className="fa fa-mobile fa-3x mobileDisplay" />
              )}
              <CardHeader className="no-gutters">
                <CardTitle tag="h5">Novo Produto</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handlerSubmit}>
                  <Row md="12">
                    <Col md="9">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Nome*</label>
                            <Input
                              placeholder="nome do produto"
                              type="text"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Categoria*</label>
                            <Input
                              type="select"
                              placeholder="Selecione Categoria"
                              onChange={(event) =>
                                setCategory_id(event.target.value)
                              }
                              value={category_id}
                              name="select"
                              id="category"
                            >
                              <option value="0">Selecionar Categoria</option>
                              {categorys.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Unid. Medida*</label>
                            <Input
                              type="select"
                              name="select"
                              id="selectMeasure"
                              onChange={(event) =>
                                setMeasureUnid_id(event.target.value)
                              }
                              value={measureUnid_id}
                            >
                              <option value="0">Selecionar Unid. Medida</option>
                              {measureUnit.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.description}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Preço*</label>
                            <Input
                              placeholder="0,00"
                              type="text"
                              onChange={(event) =>
                                handleChangePrice(event.target.value)
                              }
                              value={price}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Em Estoque</label>
                            <Input
                              type="text"
                              placeholder="0.0"
                              value={stockQuantity}
                              onChange={(event) =>
                                setStockQuantity(event.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Promoção</label>
                            <Input
                              type="select"
                              name="select"
                              value={promotion}
                              onChange={(event) => {
                                setPromotion(parseInt(event.target.value, 10));
                              }}
                            >
                              <option value={0}>Não</option>
                              <option value={1}>Sim</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Preço Promocional</label>
                            <Input
                              placeholder="0.0"
                              type="text"
                              value={pricePromotion}
                              onChange={(event) =>
                                handleChangePricePromotion(event.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Exibir Produto com quantidade ZERADA</label>
                            <Input
                              type="select"
                              name="select"
                              id="AmountProduct"
                            >
                              <option value={0}>Não</option>
                              <option value={1}>Sim</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Ocultar produto do aplicativo</label>
                            <Input
                              type="select"
                              name="select"
                              value={hideMobile}
                              onChange={(event) => {
                                setHideMobile(parseInt(event.target.value, 10));
                              }}
                            >
                              <option value={0}>Não</option>
                              <option value={1}>Sim</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Descrição</label>
                            <Input
                              type="textarea"
                              value={description}
                              onChange={(event) =>
                                setDescription(event.target.value)
                              }
                              placeholder="Informe a descrição do produto"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="3" className="row justify-content-center">
                      <div className="contentImageProdut">
                        {previewImage.length > 0 ? (
                          previewImage.map((image, idx) => (
                            <div key={idx}>
                              <img src={image} alt="carne" className="cover" />
                              <i
                                className="fa fa-times-circle close"
                                aria-hidden="true"
                                onClick={() => handleRemoverImage()}
                              />
                            </div>
                          ))
                        ) : (
                          <label htmlFor="icon-button-file">
                            <i className="fa fa-camera fa-2x" />
                          </label>
                        )}
                        <input
                          id="icon-button-file"
                          type="file"
                          accept="image/*"
                          onChange={handleSelectImage}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <CardFooter>
                      <div className="ml-auto mr-auto">
                        <Button color="dark" onClick={() => history.goBack()}>
                          Voltar
                        </Button>{" "}
                        <Button color="dark" onClick={() => {}}>
                          Nova Categoria
                        </Button>{" "}
                        <Button disabled={isLoading} color="info" type="submit">
                          {isLoading && <Spinner size="sm" color="warning" />}{" "}
                          {state === undefined
                            ? "Cadastrar"
                            : "Salvar Alterações"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductNew;
