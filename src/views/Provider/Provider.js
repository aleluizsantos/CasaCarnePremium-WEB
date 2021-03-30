import React, { useState, useEffect } from "react";

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
  Label,
  Col,
  Table,
} from "reactstrap";

import imgProvider from "../../assets/img/provider.png";
import { getProvider } from "../../hooks/provider";
import { ModalView, SelectDropdown, Pagination } from "../../components";

const Provider = () => {
  const [dataProvider, setDataProvider] = useState([]);
  const [modalAddProvider, setModalAddProvider] = useState(false);

  useEffect(() => {
    (() => {
      searchProvider("").then((response) => setDataProvider(response));
    })();
  }, []);

  // Buscar lista de Fornecedores conforme parameto passado
  const searchProvider = async (inputValue) => {
    const provider = await getProvider(inputValue);
    return provider;
  };

  return (
    <div className="content">
      <ModalView
        size="lg"
        title="Fornecedor"
        modal={modalAddProvider}
        toggle={() => setModalAddProvider(!modalAddProvider)}
        confirmed={() => {}}
      >
        <Form>
          <FormGroup row>
            <Label for="provider" sm={2}>
              Fornecedor
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="provider"
                id="provider"
                placeholder="Nome do fornecedor"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="contact" sm={2}>
              Nome contato
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="nameContact"
                id="contact"
                placeholder="Nome do contato"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="phone" sm={2}>
              Telefone
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="(00) 0000-0000"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="CEP" sm={2}>
              CEP
            </Label>
            <Col sm={10}>
              <Input type="text" name="CEP" id="CEP" placeholder="00000-000" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address" sm={2}>
              Endereço
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Endereço"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="number" sm={2}>
              Número
            </Label>
            <Col sm={4}>
              <Input
                type="text"
                name="number"
                id="number"
                placeholder="Número"
              />
            </Col>
            <Label for="neighborhood" sm={1}>
              Bairro
            </Label>
            <Col sm={5}>
              <Input
                type="text"
                name="neighborhood"
                id="neighborhood"
                placeholder="Bairro"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="city" sm={2}>
              Cidade
            </Label>
            <Col sm={4}>
              <Input type="text" name="city" id="city" placeholder="Cidade" />
            </Col>
            <Label for="uf" sm={1}>
              UF
            </Label>
            <Col sm={5}>
              <Input type="text" name="uf" id="uf" placeholder="UF" />
            </Col>
          </FormGroup>
        </Form>
      </ModalView>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            <div className="imageVisibleMobile">
              <img src={imgProvider} alt="mobile" />
              Fornecedores
            </div>
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Button onClick={() => setModalAddProvider(!modalAddProvider)}>
            Novo Fornecedor
          </Button>

          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Fornecedor</th>
                <th>Nome contato</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Número</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>Dt Cadastro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Agropecuaria Roberto</td>
                <td>Roberto da silva</td>
                <td>(17) 98826-0129</td>
                <td>Rua Sete</td>
                <td>123</td>
                <td>Jd America</td>
                <td>Jales</td>
                <td>SP</td>
                <td>2021-03-19T20:17:02.544</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Provider;
