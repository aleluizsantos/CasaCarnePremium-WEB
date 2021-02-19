import React from "react";
import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const ProductNew = () => {
  const history = useHistory();
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="12">
            <Card className="card-user">
              <CardHeader className="">
                <CardTitle tag="h5">Novo Produto</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row md="12">
                    <Col md="9">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Nome</label>
                            <Input placeholder="nome do produto" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Categoria</label>
                            <Input type="text" />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Unid. Medida</label>
                            <Input type="text" />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Estoque</label>
                            <Input placeholder="0.0" type="number" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Descrição</label>
                            <Input
                              type="textarea"
                              placeholder="Informe a descrição do produto"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md="3"
                      className="row justify-content-center align-items-center"
                    >
                      <div className="contentImageProdut">
                        <i class="fa fa-camera fa-2x" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={() => history.push({ pathname: "product" })}
                      >
                        Voltar
                      </Button>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Cadastrar
                      </Button>
                    </div>
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
