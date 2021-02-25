import React, { useEffect, useState } from "react";
import { getProductGroupCategory } from "../../hooks";

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
} from "reactstrap";

const ProductCategory = () => {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    (() => {
      getProductGroupCategory().then((response) => setCategorys(response));
    })();
  }, []);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Categoria de Produtos</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Image</th>
                    <th>Categoria</th>
                    <th>Qtd. produto na categoria</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <img
                          className="avatar"
                          src={item.image_url}
                          alt={item.name}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.TotalProduct}</td>
                      <td>
                        <div className="groupButton">
                          <Button
                            className="btn-round btn-icon"
                            color="danger"
                            outline
                            size="sm"
                            onClick={() => {}}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                            onClick={() => {}}
                          >
                            <i className="fa fa-edit" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <p>
                Quantidade de categorias: <strong>{categorys.length}</strong>
              </p>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCategory;
