import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
} from "reactstrap";

import {
  getProductGroupCategory,
  updateCategory,
  deleteCategory,
} from "../../hooks";
import { SET_MESSAGE } from "../../store/Actions/types";
import { ModalView } from "../../components";

let FormStateProps = {
  isChange: false,
  nameOld: "",
  values: {},
  image: [],
};

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [categorys, setCategorys] = useState([]);
  const [formState, setFormState] = useState(FormStateProps);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalEditCategory, setIsModalEditCategory] = useState(false);
  const [isModalRemove, setIsModalRemove] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    (() => {
      getProductGroupCategory().then((response) => {
        setCategorys(response);
        setTotalProduct(
          response.reduce((total, item) => total + Number(item.TotalProduct), 0)
        );
      });
    })();
  }, [isLoading]);

  const handleSelectCategoy = (category, action) => {
    setFormState({
      ...formState,
      values: category,
      nameOld: category.name,
      image: [],
    });
    switch (action) {
      case "edit":
        setIsModalEditCategory(!isModalEditCategory);
        break;
      case "delete":
        setIsModalRemove(!isModalRemove);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();
    // Alteração na image
    if (event.target.type === "file") {
      setFormState({
        ...formState,
        isChange: true,
        image: Array.from(event.target.files),
      });
    } else {
      // Alteração no formulário
      setFormState({
        ...formState,
        isChange: true,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  // Editar e adicionar nova categoria
  const handleEditCategory = (category) => {
    setIsLoading(true);
    updateCategory(category).then(() => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Categoria atualizada com sucesso.",
      });
      setIsLoading(false);
    });
  };
  // Deletar categoria
  const handleDeleteCategory = (category) => {
    setIsLoading(true);

    deleteCategory(category).then(() => {
      dispatch({
        type: SET_MESSAGE,
        payload: "O produto foi excluído.",
      });
      setIsLoading(false);
    });
  };

  return (
    <div className="content">
      <ModalView
        title="Editar Categoria"
        idObjectSelected={formState}
        modal={isModalEditCategory}
        toggle={() => setIsModalEditCategory(!isModalEditCategory)}
        confirmed={(category) => handleEditCategory(category)}
      >
        <div>
          <div className="text-center">
            <label htmlFor="input-file">
              <img
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
                alt={formState.values.name}
              />
            </label>
            <input
              id="input-file"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => handleChange(event)}
            />
          </div>

          <FormGroup>
            <label>Nome</label>
            <Input
              placeholder="Nome da categoria"
              type="text"
              name="name"
              value={formState.values.name}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
        </div>
      </ModalView>
      <ModalView
        title="Remover Categoria"
        idObjectSelected={formState}
        modal={isModalRemove}
        toggle={() => setIsModalRemove(!isModalRemove)}
        confirmed={(category) => handleDeleteCategory(category)}
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
                            onClick={() => handleSelectCategoy(item, "delete")}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                          <Button
                            className="btn-round btn-icon"
                            color="success"
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
    </div>
  );
};

export default ProductCategory;
