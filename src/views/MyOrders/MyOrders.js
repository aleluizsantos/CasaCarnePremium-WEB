import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import "./styles.css";
import { formatDateTime } from "../../hooks/formatDate";
import { typeStatusMyOrders, getOrders } from "../../hooks/MyOrders";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    (() => {
      getOrders(typeStatusMyOrders.EM_ANASILE).then((response) =>
        setMyOrders(response)
      );
    })();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Meus Pedidos</CardTitle>
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
                        <td> x x</td>
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
