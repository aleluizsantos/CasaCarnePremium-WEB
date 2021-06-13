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
  Label,
  Alert,
} from "reactstrap";

import "./styles.css";
import { formatDateTime, formatCurrency } from "hooks/format";
import {
  getItemsMyOrders,
  upDateStateMyOrders,
  deletePedido,
  deleteItemPedido,
} from "../../hooks/MyOrders";
import { getProductSearch } from "../../hooks/Product";
import { addItemOrder, changeItemMyOrder } from "../../hooks/MyOrders";
import { CLEAR_MESSAGE, SET_MESSAGE } from "../../store/Actions/types";
import { ModalView, SelectDropdown } from "../../components";
import imgDelivery from "../../assets/img/delivery.png";
import imgStore from "../../assets/img/store.png";
import imgWhatsapp from "../../assets/img/iconWhatsapp.svg";
import icoTrash from "../../assets/img/icoTrash-64.gif";
import icoBuy from "../../assets/img/icoBuy-64.gif";
import icoStatus from "../../assets/img/icoStatus_64.png";

const typeDelivery = {
  EM_ANALISE: 1,
  EM_PREPARAÇÃO: 2,
  ROTA_ENTREGA: 3,
  RETIRAR_LOJA: 4,
  AGENDADO: 5,
  FINALIZADO: 6,
};

const DetailsMyOrder = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [currentPorcent, setCurrentPorcent] = useState(0);
  const [descriptioStatus, setDescriptionStatus] = useState(null);
  const [itemsMyOrders, setItemsMyOrders] = useState([]);
  const [taxaDelivery, setTaxaDelivery] = useState({ taxa: 0, vMinTaxa: 0 });
  const [myOrder, setMyOrder] = useState({});
  const [isModalStateMyOrder, setIsModalStateMyOrder] = useState(false);
  const [isModalRemoveItem, setIsModalRemoveItem] = useState(false);
  const [isModalDeleteOrder, setIsModalDeleteOrder] = useState(false);
  const [isModalInsertItem, setIsModalInsertItem] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [productSearch, setProductSearch] = useState("");
  const [amountItemAdd, setamountItemAdd] = useState(1);
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [changeAmount, setChangeAmount] = useState({
    isEdit: false,
    request_id: state.id,
    itens: {},
  });

  useEffect(() => {
    (() => {
      getItemsMyOrders(state.id).then((response) => {
        // Transformar o array em um objeto com apenas as quantidade dos itens
        const jsonAmountItem = response.itemsRequest.reduce(
          (obj, item) => ({
            ...obj,
            [item.id]: item.amount,
          }),
          {}
        );
        setChangeAmount({
          ...changeAmount,
          itens: jsonAmountItem,
        });
        setItemsMyOrders(response.itemsRequest);
        setTaxaDelivery(response.taxaDelivery);
      });
      setMyOrder(state);
      setPhoneWhatsapp(state.phone.replace(/([^\d])+/gim, ""));
      setDescriptionStatus(state.statusRequest);
      state.statusRequest_id < typeDelivery.RETIRAR_LOJA
        ? setCurrentPorcent(
            state.statusRequest_id === 5 ? 4 * 25 : state.statusRequest_id * 25
          )
        : setCurrentPorcent(100);
    })();

    // eslint-disable-next-line
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
    if (myOrder.statusRequest_id < typeDelivery.AGENDADO) {
      //Checar se foi alterado as quantidade dos item
      if (changeAmount.isEdit) salveChangeItem();

      upDateStateMyOrders(myOrder.id).then((response) => {
        setMyOrder({
          ...myOrder,
          statusRequest_id: response.nextState,
        });
        setDescriptionStatus(response.descriptionNextActionRequest);
        setIsModalStateMyOrder(false);
        dispatch({
          type: SET_MESSAGE,
          payload: `Pedido ${response.descriptionNextActionRequest}`,
        });
        response.nextState === 6 && history.goBack();
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
    // // remover uma propriedade de um objeto
    // delete changeAmount.itens[id];

    deleteItemPedido(request_id, id).then((response) => {
      const newItem = itemsMyOrders.filter(
        (item) => item.id !== itemSelected.id
      );
      setMyOrder(response);
      setItemsMyOrders(newItem);
      setItemSelected({});
      setIsModalRemoveItem(false);
    });
  }

  function handleModalItemProduct() {
    setamountItemAdd(1);
    setProductSearch();
    setIsModalInsertItem(true);
  }

  // Buscar lista de Produto conforme parameto passado
  const searchProduct = async (inputValue) => {
    const response = await getProductSearch(inputValue);
    const dataProducts = response.products.map((item) => {
      const dataItem = {
        value: item.id,
        label: item.name,
        measureUnid: item.measureUnid,
        inventory: item.inventory,
        image_url: item.image_url,
        price: item.price,
        promotion: item.promotion,
        pricePromotion: item.pricePromotion,
      };
      return dataItem;
    });
    return dataProducts;
  };

  function handleChangesAmount(amount) {
    setamountItemAdd(amount.replace(",", "."));
  }

  function handleGoBack() {
    dispatch({
      type: CLEAR_MESSAGE,
    });
    history.goBack();
  }

  async function handleAddItem() {
    if (handleAmountValidate(amountItemAdd)) {
      alert("Verificar o campo em vermelho, valor não é uma quantidade válida");
      return;
    }

    if (typeof productSearch === "undefined") {
      alert("Selecione o produto");
      return;
    }

    // Verificar se o produto já esta nos itens
    const existItem = itemsMyOrders.find(
      (item) => item.product_id === productSearch.value
    );
    if (existItem) {
      setIsModalInsertItem(false);
      dispatch({
        type: SET_MESSAGE,
        payload: "Produto já existe na lista, altere a quantidade",
      });
      setProductSearch("");
      return;
    }

    const dataItem = {
      amount: amountItemAdd,
      price: productSearch.promotion
        ? productSearch.pricePromotion
        : productSearch.price,
      product_id: productSearch.value,
      request_id: myOrder.id,
    };

    await addItemOrder(dataItem).then(async (response) => {
      const lastItem = await response.items.find(
        (item) => item.product_id === productSearch.value
      );
      setChangeAmount({
        ...changeAmount,
        itens: {
          ...changeAmount.itens,
          [lastItem.id]: amountItemAdd,
        },
      });
      setMyOrder(response.order);
      setItemsMyOrders(response.items);
      setIsModalInsertItem(false);
      dispatch({
        type: SET_MESSAGE,
        payload: "Foi adicionado um item no pedido",
      });
      setProductSearch("");
    });
  }

  function handleMessageWhatsapp(message) {
    window.location.href = `whatsapp://send/?phone=55${phoneWhatsapp}&text=${message}&app_absent=0`;
    // href={`https://wa.me/55${phoneWhatsapp}?text=testando%20message%20whatsapp`}
    // href={`whatsapp://send/?phone=55${phoneWhatsapp}&text=testando%20message%20whatsapp`}
  }

  function handleAmountValidate(value) {
    const isNum = Number.isFinite(Number(value));
    return !isNum;
  }
  // Calcular a alterar do quantidade no item do pedido
  async function calcChangeItem(item, amount) {
    const valueAmountOld = itemsMyOrders.find(
      (itemOrder) => itemOrder.id === item
    );
    let valueAmount = amount;

    if (valueAmount === "" || handleAmountValidate(valueAmount)) {
      valueAmount = valueAmountOld.amount;
      setChangeAmount({
        ...changeAmount,
        isEdit: true,
        itens: {
          ...changeAmount.itens,
          [item]: valueAmount,
        },
      });
    }

    // Alterar os valor na lista e recalculando a soma do item
    const newItens = itemsMyOrders.map((itemMyOrder) => {
      if (itemMyOrder.id === Number(item))
        itemMyOrder.amount = parseFloat(valueAmount);
      return itemMyOrder;
    });
    setItemsMyOrders(newItens);

    // Recalcular o Total Geral de todos os itens após alteração
    const newtotalPurchase = await itemsMyOrders.reduce((total, item) => {
      return total + parseFloat(item.amount) * parseFloat(item.price);
    }, 0);

    const taxa =
      newtotalPurchase >= taxaDelivery.vMinTaxa
        ? 0
        : parseFloat(taxaDelivery.taxa);

    // Setar o novo valor no State
    setMyOrder({
      ...myOrder,
      vTaxaDelivery: taxa,
      totalPurchase: newtotalPurchase + taxa,
    });
  }

  function handleEditAmountItem(event) {
    event.persist();

    const value = event.target.value.replace(",", ".");
    const dataChangeAmount = {
      ...changeAmount,
      isEdit: true,
      itens: {
        ...changeAmount.itens,
        [event.target.name]: value,
      },
    };
    setChangeAmount(dataChangeAmount);
  }

  function salveChangeItem() {
    const itemsChanger = {
      user_id: myOrder.user_id,
      request_id: myOrder.id,
      totalPurchase: myOrder.totalPurchase,
      taxaDelivery: myOrder.vTaxaDelivery,
      items: itemsMyOrders,
    };

    // Gravar as alterações no banco de dados
    changeItemMyOrder(itemsChanger).then((response) => {
      if (!response) {
        dispatch({
          type: SET_MESSAGE,
          payload: "Erro ao atualizar verifiques as quantidades.",
        });
      }
    });
    // Alterar o Status de isEdit = false;
    setChangeAmount({
      ...changeAmount,
      isEdit: false,
    });
  }

  return (
    <div className="content">
      <Row>
        <ModalView
          title={
            <>
              <img src={icoStatus} alt="status" style={{ height: 40 }} />{" "}
              <Label> Alterar status pedido </Label>
            </>
          }
          modal={isModalStateMyOrder}
          toggle={() => setIsModalStateMyOrder(!isModalStateMyOrder)}
          confirmed={() => nextStageMyOrder(myOrder.id)}
        >
          <div className="bodyModalStatus">
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
          title={
            <>
              <img src={icoTrash} alt="trash" style={{ height: 40 }} />{" "}
              <Label> Remover item </Label>
            </>
          }
          modal={isModalRemoveItem}
          toggle={() => setIsModalRemoveItem(!isModalRemoveItem)}
          confirmed={() => handleRemoverItem(itemSelected)}
        >
          <div className="text-center">
            Tem certeza que deseja remover o item '
            <strong>{itemSelected.name || ""}</strong>'?
          </div>
        </ModalView>
        <ModalView
          title={
            <>
              <img src={icoTrash} alt="trash" style={{ height: 40 }} />{" "}
              <Label>Excluir pedido?</Label>
            </>
          }
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
          title={
            <>
              <img src={icoBuy} alt="icoBuy" style={{ height: 50 }} />{" "}
              <Label> Adicionar item </Label>
            </>
          }
          size="lg"
          modal={isModalInsertItem}
          toggle={() => setIsModalInsertItem(!isModalInsertItem)}
          confirmed={() => handleAddItem()}
        >
          <div className="text-justify">
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <Label>Produto</Label>
                  <SelectDropdown
                    placeholder="Informe o produto"
                    options={searchProduct}
                    isClearabl={true}
                    setValue={productSearch}
                    onChange={setProductSearch}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-1" md="6">
                <FormGroup>
                  <label>Quantidade</label>
                  <Input
                    style={{ fontWeight: 700 }}
                    type="text"
                    name="amount"
                    value={amountItemAdd}
                    onFocus={(event) => event.target.select()}
                    invalid={
                      amountItemAdd === ""
                        ? true
                        : handleAmountValidate(amountItemAdd)
                    }
                    onChange={(event) =>
                      handleChangesAmount(event.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            {productSearch && (
              <Row>
                <Col className="imgAddItem" md="6">
                  <img src={productSearch.image_url} alt={productSearch.name} />
                </Col>

                <Col md="6">
                  <p className="titleItemSelectedAddItem">
                    {productSearch.label}
                  </p>
                  <span>Preço: </span>
                  <p className="priceItemSlectedAddItem">
                    {productSearch.price} / {productSearch.measureUnid}
                  </p>
                  <span>Preço Promocional: </span>
                  <p className="priceItemSlectedAddItem">
                    <span
                      style={{ color: productSearch.promotion ? "red" : "" }}
                    >
                      {productSearch.pricePromotion} /{" "}
                      {productSearch.measureUnid}
                    </span>
                  </p>
                </Col>
              </Row>
            )}
          </div>
        </ModalView>

        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                <div className="headerCard">
                  <Button
                    className="btn"
                    outline
                    size="sm"
                    onClick={() => handleGoBack()}
                  >
                    <i className="fa fa-arrow-left" />
                  </Button>

                  <div>
                    {/* <i className="fa fa-shopping-basket" /> */}
                    <span>Detalhe do pedido</span>
                  </div>
                  <div>
                    <img
                      src={state.deliveryType_id === 1 ? imgDelivery : imgStore}
                      alt={state.deliveryType}
                      style={{ paddingRight: 10 }}
                    />
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
                  <p className="titleName">{myOrder.name}</p>
                  <p>{myOrder.email}</p>
                  <div>
                    <Button
                      color="default"
                      outline
                      size="sm"
                      onClick={() =>
                        handleMessageWhatsapp(
                          `🍖 Olá ${myOrder.name} tudo bem. %0ASomos da Casa de Carne Premium.`
                        )
                      }
                    >
                      <img
                        className="iconWhatsapp"
                        src={imgWhatsapp}
                        alt="Icone Whatsapp"
                      />{" "}
                      Entre em contato <span>{myOrder.phone}</span>
                    </Button>
                  </div>
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
                <div>
                  <strong>Forma de Pagamento: </strong>
                  <span>{state.payment}</span>
                </div>
                {state.payment_id === 1 && (
                  <div>
                    <strong>Troco para: </strong>
                    <span style={{ fontSize: 20 }}>R$ {state.cash}</span>
                  </div>
                )}
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
                  <div className="state" onClick={handleIsModal}>
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
                    {itemsMyOrders.map((item, idx) => (
                      <tr key={item.id}>
                        <td>
                          <div className="groupItem">
                            <i
                              className="fa fa-times"
                              onClick={() => handleModalRemoveItem(item)}
                            />
                            {item.name}
                          </div>
                        </td>
                        <td>
                          <Input
                            type="text"
                            name={item.id}
                            disabled={
                              myOrder.statusRequest_id <=
                              typeDelivery.EM_PREPARAÇÃO
                                ? false
                                : true
                            }
                            onBlur={() =>
                              calcChangeItem(
                                item.id,
                                changeAmount.itens[item.id]
                              )
                            }
                            invalid={
                              (changeAmount.itens[item.id] || item.amount) ===
                              ""
                                ? true
                                : handleAmountValidate(
                                    changeAmount.itens[item.id]
                                  )
                            }
                            onFocus={(event) => event.target.select()}
                            value={changeAmount.itens[item.id] || ""}
                            onChange={handleEditAmountItem}
                          />
                        </td>
                        <td>{item.price}</td>
                        <td>
                          {formatCurrency(
                            parseFloat(item.amount) * parseFloat(item.price)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {changeAmount.isEdit && (
                  <div>
                    <Alert color="success" fade={true}>
                      <div className="alertChangeItems">
                        <span>QUANTIDADE ALTERADAO NO PEDIDO</span>
                        <Button
                          onClick={() => salveChangeItem()}
                          color="success"
                        >
                          Salvar
                        </Button>
                      </div>
                    </Alert>
                  </div>
                )}
              </div>

              <div className="contentTotal">
                <div className="note">
                  <p>{myOrder.note || "Sem observações"}</p>
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
                    <span
                      style={myOrder.vTaxaDelivery > 0 ? { color: "red" } : {}}
                    >
                      {formatCurrency(myOrder.vTaxaDelivery)}
                    </span>
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
            {myOrder.statusRequest_id !== 6 && (
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
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailsMyOrder;
