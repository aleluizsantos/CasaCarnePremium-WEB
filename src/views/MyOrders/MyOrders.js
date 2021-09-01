import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";

import "./styles.css";
import imgDelivery from "../../assets/img/delivery.png";
import imgStore from "../../assets/img/store.png";
import imgOrderEmpty from "../../assets/img/orderEmpty.png";

import { formatDateTime } from "../../hooks/format";
import { typeStatusMyOrders, getOrders } from "../../hooks/MyOrders";
import { NEW_ORDERS } from "../../store/Actions/types";

const MyOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [myOrders, setMyOrders] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [typeStatus, setTypeStatus] = useState(typeStatusMyOrders.GROUP);
  const { newOrders } = useSelector((state) => state.Notificate);

  useEffect(() => {
    (() => {
      setIsloading(true);
      getOrders(typeStatus).then((response) => {
        const amountProccess = response.filter(
          (item) => item.statusRequest_id === typeStatusMyOrders.EM_ANASILE
        ).length;

        dispatch({
          type: NEW_ORDERS,
          payload: amountProccess,
        });
        setMyOrders(response);
        setIsloading(false);
      });
    })();
  }, [typeStatus, newOrders, dispatch]);

  function goToDetailsMyOrders(order) {
    history.push({
      pathname: "DetailsMyOrder",
      state: order,
    });
  }

  function handleSelectStatus(value) {
    setTypeStatus(value);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="SelectStatus">
                  <CardTitle tag="h5">Meus Pedidos</CardTitle>
                  <select
                    name="statusOrder"
                    id="statusOrder"
                    onChange={(event) => handleSelectStatus(event.target.value)}
                  >
                    <option value={typeStatusMyOrders.GROUP}>
                      Em processo
                    </option>
                    <option value={typeStatusMyOrders.ALL}>Todos</option>
                    <option value={typeStatusMyOrders.EM_PREPARACAO}>
                      Em preparação
                    </option>
                    <option value={typeStatusMyOrders.RETIRAR_LOJA}>
                      Retirar Loja
                    </option>
                    <option value={typeStatusMyOrders.ROTA_ENTREGA}>
                      Rota de Entrega
                    </option>
                    <option value={typeStatusMyOrders.FINALIZADO}>
                      Finalizado
                    </option>
                  </select>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Tipo</th>
                      <th>Data</th>
                      <th>Cliente</th>
                      <th>Status</th>
                      <th className="text-right">Valor</th>
                      <th>Telefone</th>
                      <th>Cidade</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={
                              item.deliveryType_id === 1
                                ? imgDelivery
                                : imgStore
                            }
                            alt={item.deliveryType}
                            className="imgTypeDelivery"
                          />
                          {/* {item.deliveryType} */}
                        </td>
                        <td>{formatDateTime(item.dateTimeOrder)}</td>
                        <td
                          style={{ cursor: "pointer", fontWeight: "bold" }}
                          onClick={() => goToDetailsMyOrders(item)}
                        >
                          {item.name}
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            className="text-center"
                          >
                            <div
                              className="statusMyOrders"
                              style={{
                                background: item.BGcolor,
                                marginRight: "8px",
                              }}
                            />

                            <span>{item.statusRequest}</span>
                          </div>
                        </td>
                        <td className="text-right">{item.totalPurchase}</td>
                        <td>{item.phone}</td>
                        <td>
                          {item.city}/{item.uf}
                        </td>
                        <td className="text-center">
                          <div className="groupButton">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="md"
                              onClick={() => goToDetailsMyOrders(item)}
                            >
                              <i className="fa fa-eye" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {myOrders.length <= 0 && (
                  <div className="imgOrderEmpty">
                    <img src={imgOrderEmpty} alt="empty" />
                    <h3>Aguardando novos pedidos</h3>
                  </div>
                )}

                {isloading && (
                  <div className="isloading">
                    <Spinner color="#f1f1f1" size="md" />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default MyOrders;
