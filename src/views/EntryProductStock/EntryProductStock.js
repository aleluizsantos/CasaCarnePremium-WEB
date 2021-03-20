import React, { useState, useEffect } from "react";

// reactstrap componentss
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  Table,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";

import { ModalView } from "../../components";
import imgEntryProduct from "../../assets/img/inventory.png";

import { formatDateTime, formatCurrency } from "../../hooks/format";
import { getEntryProducts } from "../../hooks/entryProductStock";

const EntryProductStock = () => {
  const [modalAddStock, setModalAddStock] = useState(false);
  const [dataEntryProduct, setDataEntryProduct] = useState([]);

  useEffect(() => {
    (() => {
      getEntryProducts().then((response) => {
        setDataEntryProduct(response);
      });
    })();
  }, []);

  return (
    <div className="content">
      <ModalView
        size="lg"
        title="Adicionar produto no estoque"
        modal={modalAddStock}
        toggle={() => setModalAddStock(!modalAddStock)}
        confirmed={() => {}}
      >
        <Form>
          <Row>
            <Col className="pl-3" md="8">
              <FormGroup>
                <Label>Nome fornecedor</Label>
                <Input placeholder="nome do fornecedor" type="select">
                  <option value="1">ARCON</option>
                  <option value="2">Rogério</option>
                  <option value="3">Sergio</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="pl-3" md="4">
              <FormGroup>
                <Label for="exampleDatetime">Data compra</Label>
                <Input
                  type="date"
                  name="date"
                  id="exampleDate"
                  placeholder="date placeholder"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ background: "#f1f1f1", paddingTop: 15 }}>
            <Col md="6">
              <FormGroup>
                <Label>Produto</Label>
                <Input placeholder="Produto" type="select">
                  <option value="1">Picanha</option>
                  <option value="2">Alcatra</option>
                  <option value="3">Acém</option>
                </Input>
              </FormGroup>
              <Button outline color="success" size="sm">
                <i className="fa fa-plus" /> Adicionar
              </Button>{" "}
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Quantidade</Label>
                <Input placeholder="Quantidade" type="text" />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Preço</Label>
                <Input placeholder="0.00" type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Table responsive>
              {/* <thead className="text-primary">
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>P. Unit</th>
                  <th>Total</th>
                </tr>
              </thead> */}
              <tbody>
                <tr>
                  <td>
                    <div className="groupItem">
                      <i className="fa fa-times" />
                      Coxa e sobrecoxa
                    </div>
                  </td>
                  <td>50</td>
                  <td>25.00</td>
                  <td className="text-right">1.250,00</td>
                </tr>
                <tr>
                  <td>
                    <div className="groupItem">
                      <i className="fa fa-times" />
                      Coxa e sobrecoxa
                    </div>
                  </td>
                  <td>50</td>
                  <td>25.00</td>
                  <td className="text-right">1.250,00</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Form>
        <div>
          <span className="title">Valor da nota:</span>
          <span style={{ paddingLeft: 20 }}>R$ 1.250,00:</span>
        </div>
      </ModalView>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            <div className="imageVisibleMobile">
              <img src={imgEntryProduct} alt="mobile" />
              Entrada de produto
            </div>
          </CardTitle>
        </CardHeader>

        <CardBody>
          <CardTitle tag="h5">Lançamentos de entrada</CardTitle>
          <Button onClick={() => setModalAddStock(!modalAddStock)}>
            <i className="fa fa-plus" /> Adicinar
          </Button>
          <CardText style={{ color: "#c6c6c6" }}>
            São exibidas as ultimas dez lançamentos de entrada.
          </CardText>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th className="text-center">Data</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th className="text-right">Preço Unitário</th>
                <th className="text-right">P. Total</th>
                <th>Fornecedor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dataEntryProduct.map((item, idx) => (
                <tr key={idx}>
                  <td>{formatDateTime(item.data_entry)}</td>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>
                    {formatCurrency(Number(item.amount) * Number(item.price))}
                  </td>
                  <td>{item.nameProvider}</td>
                  <td> + + </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  );
};

export default EntryProductStock;
