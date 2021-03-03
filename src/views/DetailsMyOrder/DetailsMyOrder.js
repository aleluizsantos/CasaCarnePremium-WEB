import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
  Input,
  FormGroup,
} from "reactstrap";

import "./styles.css";
import { url } from "../../services/host";
import { formatDateTime, formatCurrency } from "hooks/format";
import {
  getItemsMyOrders,
  upDateStateMyOrders,
  deletePedido,
  deleteItemPedido,
} from "../../hooks/MyOrders";
import { getProduct, getProductSearch } from "../../hooks/Product";
import { SET_MESSAGE } from "../../store/Actions/types";
import { ModalView } from "../../components";

const DetailsMyOrder = (props) => {
  const history = useHistory();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [currentPorcent, setCurrentPorcent] = useState(0);
  const [descriptioStatus, setDescriptionStatus] = useState(null);
  const [itemsMyOrders, setItemsMyOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [myOrder, setMyOrder] = useState({});
  const [isModalStateMyOrder, setIsModalStateMyOrder] = useState(false);
  const [isModalRemoveItem, setIsModalRemoveItem] = useState(false);
  const [isModalDeleteOrder, setIsModalDeleteOrder] = useState(false);
  const [isModalInsertItem, setIsModalInsertItem] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState([]);
  const [formAddItem, setFormAddItem] = useState({ item: {}, amount: 0 });

  useEffect(() => {
    (() => {
      getItemsMyOrders(state.id).then((response) => setItemsMyOrders(response));
      setMyOrder(state);
      setDescriptionStatus(state.statusRequest);
      state.statusRequest_id <= 4
        ? setCurrentPorcent(state.statusRequest_id * 25)
        : setCurrentPorcent(100);
    })();
  }, [state, state.id, state.statusRequest, state.statusRequest_id]);

  function handleIsModal() {
    if (itemsMyOrders.length <= 0) {
      dispatch({
        type: SET_MESSAGE,
        payload: "Você não possui nenhum item em seu pedido.",
      });
    } else {
      myOrder.statusRequest_id < 5 &&
        setIsModalStateMyOrder(!isModalStateMyOrder);
    }
  }

  function nextStageMyOrder() {
    if (myOrder.statusRequest_id < 5) {
      upDateStateMyOrders(myOrder.id).then((response) => {
        setMyOrder({
          ...myOrder,
          statusRequest_id: response.nextState,
        });
        setDescriptionStatus(response.descriptionNextActionRequest);
        dispatch({
          type: SET_MESSAGE,
          payload: `Pedido ${response.descriptionNextActionRequest}`,
        });
      });
      currentPorcent < 100 && setCurrentPorcent(currentPorcent + 25);
    }
  }

  function handleRemoverOrder() {
    deletePedido(myOrder.id).then(() => {
      dispatch({
        type: SET_MESSAGE,
        payload: `O pedido '#${myOrder.id}' foi excluido.`,
      });
      history.goBack();
    });
  }

  function handleModalRemoveItem(item) {
    setItemSelected(item);
    setIsModalRemoveItem(!isModalRemoveItem);
  }

  function handleRemoverItem() {
    const { id, request_id } = itemSelected;
    deleteItemPedido(request_id, id).then((response) => {
      const newItem = itemsMyOrders.filter(
        (item) => item.id !== itemSelected.id
      );
      setMyOrder(response);
      setItemsMyOrders(newItem);
      setItemSelected({});
    });
  }

  function loadingProduct(page = 1) {
    getProduct(page).then((response) => setProducts(response.products));
  }

  function handleModalItemProduct() {
    products.length <= 0 && loadingProduct();
    setIsModalInsertItem(!isModalInsertItem);
  }

  function handleSearch(event) {
    const productSearch = event.target.value;
    setSearch(productSearch);
    getProductSearch(productSearch).then((response) =>
      setProductSearch(response.products)
    );
  }

  function handleSelectAddItem() {}

  return (
    <div className="content">
      <Row>
        <ModalView
          title="Alterar Status do pedido"
          idObjectSelected={myOrder.id}
          modal={isModalStateMyOrder}
          toggle={() => setIsModalStateMyOrder(!isModalStateMyOrder)}
          confirmed={() => nextStageMyOrder()}
        >
          <div className="text-center">
            {myOrder.statusRequest_id === 1 && (
              <span>
                Aprovar o pedido do cliente <strong>{myOrder.name}</strong>
              </span>
            )}
            {myOrder.statusRequest_id === 2 && (
              <span>Pedido está pronto para a entrega.</span>
            )}
            {myOrder.statusRequest_id === 3 && (
              <span>Produto foi entregue, finalizar o pedido.</span>
            )}
            {myOrder.statusRequest_id === 4 && (
              <span>Produto foi retirado na loja, finalizar o pedido.</span>
            )}
          </div>
        </ModalView>
        <ModalView
          title="Remover Item"
          idObjectSelected={itemSelected}
          modal={isModalRemoveItem}
          toggle={() => setIsModalRemoveItem(!isModalRemoveItem)}
          confirmed={() => handleRemoverItem()}
        >
          <div className="text-center">
            Tem certeza que deseja remover o item '
            <strong>{itemSelected.name || ""}</strong>'?
          </div>
        </ModalView>
        <ModalView
          title="Exclução do pedido"
          idObjectSelected={""}
          modal={isModalDeleteOrder}
          toggle={() => setIsModalDeleteOrder(!isModalDeleteOrder)}
          confirmed={() => handleRemoverOrder()}
        >
          <div className="text-center">
            <span>
              Deseja realmente excluir o pedido, operação irreversível .
            </span>
          </div>
        </ModalView>
        <ModalView
          title="Adicionar item"
          size="lg"
          idObjectSelected={""}
          modal={isModalInsertItem}
          toggle={() => setIsModalInsertItem(!isModalInsertItem)}
          confirmed={() => {}}
        >
          <div className="text-justify">
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Produto</label>
                  <Input
                    type="text"
                    name="product"
                    id="product"
                    value={search}
                    onChange={(event) => handleSearch(event)}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-1" md="6">
                <FormGroup>
                  <label>Quantidade</label>
                  <Input type="text" name="amount" />
                </FormGroup>
              </Col>
            </Row>

            <div className="contentSearch">
              <Table responsive>
                {productSearch.map((item, idx) => (
                  <tbody key={idx}>
                    <tr onClick={() => {}}>
                      <td>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${url}/uploads/default.png`;
                          }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{item.promotion ? "Promoção" : ""}</td>
                      <td>{formatCurrency(item.pricePromotion)}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </div>
        </ModalView>

        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                <div className="headerCard">
                  <Button
                    className=" "
                    color="default"
                    outline
                    size="sm"
                    onClick={() => history.goBack()}
                  >
                    <i className="fa fa-arrow-left btn-round btn-icon" />
                  </Button>

                  <div>
                    <i className="fa fa-shopping-basket fa-2x" />
                    <span>Detalhe do pedido</span>
                  </div>
                  <div>
                    <span>{state.deliveryType}</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="idOrder">
                <div>
                  <span>#{myOrder.id}</span>
                  <span>{formatDateTime(myOrder.dateTimeOrder)}</span>
                </div>

                <div>
                  <span>{descriptioStatus}</span>
                </div>
              </div>

              <div className="detailsClient">
                <div>
                  <p className="title">{myOrder.name}</p>
                  <p>{myOrder.email}</p>
                  <p>{myOrder.phone}</p>
                </div>

                <div>
                  <p>
                    <strong>Endereço: </strong> {myOrder.address},{" "}
                    {myOrder.number}, {myOrder.neighborhood}, {myOrder.city}/
                    {myOrder.uf}
                  </p>
                  <p>
                    <strong>Ponto de Referência: </strong>{" "}
                    {myOrder.PointReferences}
                  </p>
                </div>
              </div>

              <div className="shapePayment">
                <strong>Forma de Pagamento: </strong>
                <span>{state.payment}</span>
              </div>

              <div className="contentStatus">
                <div className="stateMyOrder">
                  <div className="state">
                    <i className="fa fa-check" />
                    <span>Pedido</span>
                  </div>
                  <div className="state" onClick={handleIsModal}>
                    {myOrder.statusRequest_id > 1 && (
                      <i className="fa fa-check" />
                    )}
                    <span>Aprovar</span>
                  </div>
                  <div className="state" onClick={handleIsModal}>
                    {myOrder.statusRequest_id > 2 && (
                      <i className="fa fa-check" />
                    )}
                    <span>Em preparação</span>
                  </div>
                  <div className="state" onClick={handleIsModal}>
                    {myOrder.statusRequest_id > 3 && (
                      <i className="fa fa-check" />
                    )}
                    <span>
                      {myOrder.deliveryType_id === 1
                        ? "Rota de entrega"
                        : "Retirar na Loja"}
                    </span>
                  </div>
                  <div className="state">
                    {myOrder.statusRequest_id === 6 && (
                      <i className="fa fa-check" />
                    )}
                    <span>Finalizado</span>
                  </div>
                  <div
                    className="currentBar"
                    style={{ width: `${currentPorcent}%` }}
                  />
                  <div className="currentBarBG" style={{ width: "100%" }} />
                </div>
              </div>

              <div className="contentItemOrder">
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Descrição</th>
                      <th>Quantidade</th>
                      <th>Valor Unitário</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsMyOrders.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="groupItem">
                            {myOrder.statusRequest_id < 2 && (
                              <i
                                className="fa fa-times"
                                onClick={() => handleModalRemoveItem(item)}
                              />
                            )}
                            {item.name}
                          </div>
                        </td>
                        <td>
                          {item.amount} {item.measureUnid}
                        </td>
                        <td>{item.price}</td>
                        <td>{formatCurrency(item.amount * item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="contentTotal">
                <div className="note">
                  <p>{myOrder.note}</p>
                </div>
                <div className="subtTotals">
                  <div className="groupTotals">
                    <strong>SubTotal:</strong>
                    <span>
                      {formatCurrency(
                        Number(myOrder.totalPurchase) -
                          (Number(myOrder.vTaxaDelivery) +
                            Number(myOrder.discount))
                      )}
                    </span>
                  </div>
                  <div className="groupTotals">
                    <strong>Taxa de entrega:</strong>
                    <span>{formatCurrency(myOrder.vTaxaDelivery)}</span>
                  </div>
                  <div className="groupTotals">
                    <strong>Desconto:</strong>
                    <span>{formatCurrency(myOrder.discount)}</span>
                  </div>
                  <div className="total">
                    <strong>Total</strong>
                    <span>{formatCurrency(myOrder.totalPurchase)}</span>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="groupFooterButton">
                <Button
                  color="danger"
                  onClick={() => setIsModalDeleteOrder(!isModalDeleteOrder)}
                >
                  <i className="fa fa-trash" aria-hidden="true" /> Excluir
                  Pedido
                </Button>
                <Button
                  color="success"
                  onClick={() => handleModalItemProduct()}
                >
                  <i className="fa fa-trash" aria-hidden="true" /> Adicionar
                  Item
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailsMyOrder;
