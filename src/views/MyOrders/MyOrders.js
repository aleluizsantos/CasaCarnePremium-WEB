import React, { useEffect, useState } from "react";
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
} from "reactstrap";

import "./styles.css";
import { formatDateTime } from "../../hooks/format";
import { typeStatusMyOrders, getOrders } from "../../hooks/MyOrders";

const MyOrders = () => {
  const history = useHistory();
  const [myOrders, setMyOrders] = useState([]);
  const [typeStatus, setTypeStatus] = useState(typeStatusMyOrders.GROUP);

  useEffect(() => {
    (() => {
      getOrders(typeStatus).then((response) => setMyOrders(response));
    })();
  }, [typeStatus]);

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
                      <th>Data</th>
                      <th>Cliente</th>
                      <th>Status</th>
                      <th className="text-right">Valor</th>
                      <th>Telefone</th>
                      <th>Cidade</th>
                      <th>Tipo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders.map((item) => (
                      <tr key={item.id}>
                        <td>{formatDateTime(item.dateTimeOrder)}</td>
                        <td>{item.name}</td>
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
                        <td>{item.deliveryType}</td>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default MyOrders;
