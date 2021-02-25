import React, { useEffect, useState } from "react";
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
  Form,
  FormGroup,
  Input,
} from "reactstrap";

import { getProductGroupCategory } from "../../hooks";
import { ModalView } from "components";

const ProductCategory = () => {
  const [categorys, setCategorys] = useState([]);
  const [formState, setFormState] = useState({ isChange: false, values: {} });
  const [isModalEditCategory, setIsModalEditCategory] = useState(false);

  useEffect(() => {
    (() => {
      getProductGroupCategory().then((response) => setCategorys(response));
    })();
  }, []);

  const handleSelectCategoy = (category) => {
    setFormState({ ...formState, values: category });
    setIsModalEditCategory(!isModalEditCategory);
  };

  const handleChange = (event) => {
    event.persist();
  };

  console.log(formState);

  // Editar e adicionar nova categoria
  const handleEditorAddCategory = () => {
    return;
  };

  return (
    <div className="content">
      <ModalView
        size="lg"
        title="Editar Categoria"
        idObjectSelected={formState}
        modal={isModalEditCategory}
        toggle={() => setIsModalEditCategory(!isModalEditCategory)}
        confirmed={() => {}}
      >
        <div>
          <div className="text-center">
            <img
              style={{ height: "200px", borderRadius: "8px" }}
              src={formState.values.image_url}
              alt={formState.values.name}
            />
          </div>

          <FormGroup>
            <label>Nome</label>
            <Input
              placeholder="Nome da categoria"
              type="text"
              value={formState.values.name}
              onChange={(event) => setFormState(event.target.value)}
            />
          </FormGroup>
        </div>
      </ModalView>
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
                            onClick={() => handleSelectCategoy(item)}
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
