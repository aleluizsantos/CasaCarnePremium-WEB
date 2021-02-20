import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { url } from "../../services/host";
import { SET_MESSAGE } from "../../store/Actions/types";
import { getProduct, getCategory, deleteProduto } from "../../hooks";
import { Pagination, ModalView } from "../../components";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

const Product = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [totalProduct, setTotalProduct] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [modal, setModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [indexProdModal, setIndexProdModal] = useState("");

  useEffect(() => {
    (() => {
      getProduct(pageCurrent).then((response) => {
        // Calcular numero da paginas
        const { countProducts } = response;
        const numPage = Math.ceil(countProducts / 10);
        setDataProduct(response.products);
        setTotalProduct(countProducts);
        setTotalPages(numPage);
      });
    })();
  }, [pageCurrent]);

  const dropdownToggle = (e) => {
    categorys.length <= 0 &&
      getCategory().then((response) => {
        setCategorys([{ name: "Todas categorias" }, ...response]);
      });
    setDropdownOpen(!dropdownOpen);
  };

  const BadgePromotion = (value) => {
    switch (value) {
      case true:
        return <span className="badge promotion">Promoção</span>;
      case false:
        return <span className="badge">Normal</span>;
      default:
        break;
    }
    return <span>{value ? "Promotion" : "Normal"}</span>;
  };

  const handleNewProduct = () => {
    history.push({ pathname: "productNew" });
  };

  const handleShowModal = (product) => {
    setIndexProdModal(product.id);
    setModal(true);
    setTitleModal("Remover Produto");
    setMessageModal(`Deseja realmente excluir o produto '${product.name}'.`);
  };

  const handleEditProduct = (product) => {
    history.push({
      pathname: "/productNew",
      state: product,
    });
  };

  const handleDeleteProduct = (index) => {
    deleteProduto(index).then((response) => {
      // Remover o produto do array
      const newProduct = dataProduct.filter((item) => item.id !== index);
      setDataProduct(newProduct);

      dispatch({
        type: SET_MESSAGE,
        payload: response.message,
      });
    });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <ModalView
                  index={indexProdModal}
                  title={titleModal}
                  messageModal={messageModal}
                  action={(index) => handleDeleteProduct(index)}
                  modal={modal}
                  toggle={() => setModal(!modal)}
                />
                <CardTitle tag="h4">Meus Produtos </CardTitle>
                <div className="contentButton">
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={(e) => dropdownToggle(e)}
                  >
                    <DropdownToggle>
                      <i className="nc-icon nc-bullet-list-67" />
                      <span> Categoria</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      {categorys.map((item, idx) => (
                        <DropdownItem
                          key={idx}
                          id={item.id}
                          tag="a"
                          onClick={(event) => console.log(event.target.id)}
                        >
                          {item.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Button color="info" onClick={() => {}}>
                    <i className="fa fa-plus-square" aria-hidden="true" /> Novo
                    Categoria
                  </Button>
                  <Button color="info" onClick={() => handleNewProduct()}>
                    <i className="fa fa-plus-square" aria-hidden="true" /> Novo
                    Produto
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th colSpan="2" className="text-center">
                        Produto
                      </th>
                      <th>Descrição</th>
                      <th>Unidade</th>
                      <th className="text-right">Preço</th>
                      <th>Promoção</th>
                      <th className="text-right">P. Promoção</th>
                      <th>Categoria</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataProduct.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="contentImageName">
                            <object
                              data={item.image_url}
                              type="image/png"
                              className="avatar"
                            >
                              <img
                                src={`${url}/uploads/default.png`}
                                alt={item.description}
                                className="avatar"
                              />
                            </object>
                          </div>
                        </td>
                        <td className="title">{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.measureUnid}</td>
                        <td className="text-right">{item.price}</td>
                        <td className="text-center">
                          {BadgePromotion(item.promotion)}
                          {/* {item.promotion ? "Promoção" : "Normal"} */}
                        </td>
                        <td className="text-right">{item.pricePromotion}</td>
                        <td className="text-center">{item.category}</td>
                        <td>
                          <div className="groupButton">
                            <Button
                              className="btn-round btn-icon"
                              color="danger"
                              outline
                              size="sm"
                              onClick={() => handleShowModal(item)}
                            >
                              <i className="fa fa-trash" />
                            </Button>
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                              onClick={() => handleEditProduct(item)}
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
                <span className="totalProduct">
                  Total de produto: <strong>{totalProduct}</strong>{" "}
                </span>
                {!!totalPages && (
                  <Pagination
                    totalPage={totalPages}
                    onChange={setPageCurrent}
                  />
                )}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Product;
