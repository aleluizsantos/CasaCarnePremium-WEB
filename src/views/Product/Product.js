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
  const [
    dataProductCategorySelected,
    setDataProductCategorySelected,
  ] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [idProdSelected, setIdProdSelected] = useState("");
  const [productSelected, setProductSelected] = useState(null);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (() => {
      setIsloading(true);
      getProduct(pageCurrent).then((response) => {
        const { countProducts } = response;
        setDataProduct(response.products);
        setTotalRecords(countProducts);
        setIsloading(false);
      });
    })();
  }, [pageCurrent]);

  //Button Categoria carrega todas as catgorias
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

  // Selecionar a categoria escolhida no button
  const handleSelectCategoy = (item) => {
    // se não tive objetos na categoria botão desabilitado
    if (categorys.length <= 0) return;

    // Remover da lista Category
    const newListCat = categorys.filter((category) => category.id !== item.id);
    setCategorys(newListCat);
    setSelectCategory([...selectCategory, item]);

    // Converte o array com todas categorias em string "1,2,3"
    const categoryId = [...selectCategory, item]
      .map((item) => item.id)
      .toString();

    // Realiza um consulta no banco passando a categoria escolhida
    getCategoryProduct(categoryId).then((response) => {
      const { countProducts } = response;
      setDataProductCategorySelected(response.products);
      setTotalRecords(countProducts);
    });
  };
  // Remove o item selecionado das categorias
  const handleRemoveSelectCategory = (item) => {
    const newSelectCat = selectCategory.filter((cat) => cat.id !== item.id);
    const newDataProductCat = dataProductCategorySelected.filter(
      (prod) => prod.category_id !== item.id
    );
    const totalProducts = newDataProductCat.length;

    setDataProductCategorySelected(newDataProductCat);
    setSelectCategory(newSelectCat);

    if (item.id === -1) {
      //Todos os produtos em promoções
      setDataProductCategorySelected([]);
    } else {
      setCategorys([...categorys, item]); //Retornar a categoria no Dropdown
    }

    if (newSelectCat.length <= 0) {
      setPageCurrent(1);
    } else {
      setTotalRecords(totalProducts);
    }
  };
  // Badge retorna style de produto em promoção
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
  //Redirecionar para a página de Cagastro de novo produto
  const goToAddNewProduct = () => {
    history.push({ pathname: "productNew" });
  };
  //Redireciona para a pagina Produto para editar-lo
  const goToEditProduct = (product) => {
    history.push({
      pathname: "/productNew",
      state: product,
    });
  };
  //Abre o modal
  const handleShowModal = (product) => {
    setIdProdSelected(product.id);
    setProductSelected(product);
    setModal(true);
  };
  //Exibe todos os produto em promoção
  const handleProductPromotion = () => {
    const exist = selectCategory.findIndex((cat) => cat.id === -1);
    !!exist &&
      getPromotionProduct().then((response) => {
        setDataProductCategorySelected(response);
        setSelectCategory([{ id: -1, name: "Produtos em Promoções" }]);
      });
  };
  // Excluir um produto
  const handleDeleteProduct = (index) => {
    deleteProduto(index).then((response) => {
      // Remover o produto do array
      const newProduct = dataProduct.filter((item) => item.id !== index);
      setDataProduct(newProduct);

      // Definir novo total de quantidade de produtos
      const newTotalProduct = newProduct.length;
      setTotalRecords(newTotalProduct);

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
                  confirmed={() => handleDeleteProduct(idProdSelected)}
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
                    {(dataProductCategorySelected.length > 0 ||
                    selectCategory.length > 0
                      ? dataProductCategorySelected
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
                        <td
                          style={{ cursor: "pointer" }}
                          className="title"
                          onClick={() => goToEditProduct(item)}
                        >
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
              </CardBody>
              <CardFooter>
                <span className="totalProduct">
                  Total de produto:
                  <strong>{totalRecords}</strong>{" "}
                </span>

                {isloading && (
                  <div className="isloading">
                    <Spinner color="#f1f1f1" size="md" />
                  </div>
                )}

                {!!totalRecords && (
                  <Pagination
                    totalRecords={Number(totalRecords)}
                    pageLimit={10}
                    pageNeighbours={1}
                    onPageChanged={(data) => setPageCurrent(data)}
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
