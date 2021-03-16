import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { url } from "../../services/host";
import { SET_MESSAGE } from "../../store/Actions/types";
import {
  getProduct,
  getCategorys,
  deleteProduto,
  getCategoryProduct,
  getPromotionProduct,
} from "../../hooks";
import { Pagination, ModalView } from "../../components";
import imgNoMobile from "../../assets/img/noMobile.png";
import imgMobile from "../../assets/img/mobile.png";

// reactstrap componentss
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
  Spinner,
} from "reactstrap";

const Product = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductCategory, setDataProductCategory] = useState([]);
  const [totalProductInit, setTotalProductInit] = useState(0);
  const [totalProductCurrent, setTotalProductCurrent] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [modal, setModal] = useState(false);
  const [idProdSelected, setIdProdSelected] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (() => {
      setIsloading(true);
      getProduct(pageCurrent).then((response) => {
        // Calcular numero da paginas
        const { countProducts } = response;
        const numPage = Math.ceil(countProducts / 10);
        setDataProduct(response.products);
        setTotalProductCurrent(countProducts);
        setTotalProductInit(countProducts);
        setTotalPages(numPage);
        setIsloading(false);
      });
    })();
  }, [pageCurrent]);

  const dropdownToggle = (e) => {
    // Verificar se esta selecionado Produto em promoção
    const exist = selectCategory.findIndex((cat) => cat.id === -1);
    !!!exist && setSelectCategory([]);
    categorys.length <= 0 &&
      getCategorys().then((response) => {
        setCategorys(response);
      });
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectCategoy = (item) => {
    // se não tive objetos na categoria botão desabilitado
    if (categorys.length <= 0) return;

    // Remover da lista Category
    const newListCat = categorys.filter((category) => category.id !== item.id);
    setCategorys(newListCat);
    setSelectCategory([...selectCategory, item]);
    const categoryId = [...selectCategory, item]
      .map((item) => item.id)
      .toString();
    getCategoryProduct(categoryId).then((response) => {
      const { countProducts } = response;
      const numPage = Math.ceil(countProducts / 10);
      setDataProductCategory(response.products);
      setTotalPages(numPage);
      setTotalProductCurrent(countProducts);
    });
    // }
  };

  const handleRemoveSelectCategory = (item) => {
    const newSelectCat = selectCategory.filter((cat) => cat.id !== item.id);
    const newDataProductCat = dataProductCategory.filter(
      (prod) => prod.category_id !== item.id
    );
    setDataProductCategory(newDataProductCat);
    setSelectCategory(newSelectCat);

    if (item.id === -1) {
      setDataProductCategory([]);
    } else {
      setCategorys([...categorys, item]); //Retornar a categoria no Dropbox
    }

    if (newSelectCat.length <= 0) {
      const numPage = Math.ceil(totalProductInit / 10);
      setTotalPages(numPage);
      setTotalProductCurrent(totalProductInit);
    }
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

  const goToAddNewProduct = () => {
    history.push({ pathname: "productNew" });
  };

  const goToEditProduct = (product) => {
    history.push({
      pathname: "/productNew",
      state: product,
    });
  };

  const handleShowModal = (product) => {
    setIdProdSelected(product.id);
    setProductSelected(product);
    setModal(true);
  };

  const handleProductPromotion = () => {
    const exist = selectCategory.findIndex((cat) => cat.id === -1);
    !!exist &&
      getPromotionProduct().then((response) => {
        setDataProductCategory(response);
        setSelectCategory([{ id: -1, name: "Produtos em Promoções" }]);
      });
  };

  const handleDeleteProduct = (index) => {
    deleteProduto(index).then((response) => {
      // Remover o produto do array
      const newProduct = dataProduct.filter((item) => item.id !== index);
      setDataProduct(newProduct);
      // Definir novo total de quantidade de produtos
      const newTotalProduct = totalProductInit - 1;
      setTotalProductInit(newTotalProduct);
      setTotalProductCurrent(newTotalProduct);
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
                  title="Remover Produto"
                  modal={modal}
                  toggle={() => setModal(!modal)}
                  idObjectSelected={idProdSelected}
                  confirmed={(id) => handleDeleteProduct(id)}
                >
                  {productSelected && (
                    <div className="text-center">
                      <strong>Deseje realmente excluir o produto?</strong>
                      <p>
                        O produto <strong>{productSelected.name}</strong> será
                        revomido.
                      </p>
                    </div>
                  )}
                </ModalView>

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
                          onClick={() => handleSelectCategoy(item)}
                        >
                          {item.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    color="primary"
                    onClick={() => handleProductPromotion()}
                  >
                    <i className="fa fa-bookmark" aria-hidden="true" /> Produto
                    em Promoção
                  </Button>
                  <Button color="info" onClick={() => goToAddNewProduct()}>
                    <i className="fa fa-plus-square" aria-hidden="true" /> Novo
                    Produto
                  </Button>
                </div>
                <div className="selectCategory">
                  {selectCategory.length > 0 && <strong>Filtro:</strong>}
                  {selectCategory.map((item) => (
                    <span key={item.id}>
                      <i
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={() => handleRemoveSelectCategory(item)}
                      />{" "}
                      {item.name}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th colSpan="2" className="text-center">
                        Produto
                      </th>
                      <th>Unidade</th>
                      <th className="text-right">Preço</th>
                      <th>Promoção</th>
                      <th className="text-right">P. Promoção</th>
                      <th>Estoque</th>
                      <th>Categoria</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dataProductCategory.length > 0 ||
                    selectCategory.length > 0
                      ? dataProductCategory
                      : dataProduct
                    ).map((item, idx) => (
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
                        <td className="title">
                          <img
                            style={{ height: 28, paddingRight: 10 }}
                            src={item.visibleApp ? imgMobile : imgNoMobile}
                            alt="mobile"
                          />
                          {item.name}
                        </td>
                        <td>{item.measureUnid}</td>
                        <td className="text-right">{item.price}</td>
                        <td className="text-center">
                          {BadgePromotion(item.promotion)}
                        </td>
                        <td className="text-right">{item.pricePromotion}</td>
                        <td className="text-center">{item.inventory}</td>
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
                              onClick={() => goToEditProduct(item)}
                            >
                              <i className="fa fa-edit" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {isloading && (
                  <div className="isloading">
                    <Spinner color="#f1f1f1" size="md" />
                  </div>
                )}
              </CardBody>
              <CardFooter>
                <span className="totalProduct">
                  Total de produto: <strong>{totalProductCurrent}</strong>{" "}
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
