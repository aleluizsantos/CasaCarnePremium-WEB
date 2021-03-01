import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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

const DetailsMyOrder = (props) => {
  const history = useHistory();
  const { state } = useLocation();
  const [currentPorcent, setCurrentPorcent] = useState(0);

  console.log(state);
  useEffect(() => {
    (() => {
      setCurrentPorcent(25);
    })();
  }, []);

  function nextStageMyOrder() {
    setCurrentPorcent(currentPorcent + 25);
  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <div className="headerCard">
                <div>
                  <i className="fa fa-shopping-basket fa-3x" />
                  <span>Detalhe do pedido</span>
                </div>
                <div>
                  <span>Em análise</span>
                </div>
                <div>
                  <span>Delivery</span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="idOrder">
                <span>#7</span>
                <span>28/02/2021 15:10:20</span>
              </div>
              <div className="detailsClient">
                <div>
                  <p className="title">Alessandro luiz dos Santos</p>
                  <p>aleluizsantos@gmail.com</p>
                  <p>(17) 98826-0129</p>
                </div>

                <div>
                  <p>
                    <strong>Endereço: </strong> Rua da Saudade, 1864, Jd. São
                    Jorge, Jales/SP
                  </p>
                  <p>
                    <strong>Ponto de Referência: </strong> Terminal Rodoviário
                  </p>
                </div>
              </div>
              <div className="shapePayment">
                <strong>Forma de Pagamento: </strong>
                <span>Dinheiro</span>
              </div>

              <div className="contentStatus">
                <div className="stateMyOrder">
                  <div className="state">
                    <i className="fa fa-check" />
                    <span>Pedido</span>
                  </div>
                  <div className="state" onClick={nextStageMyOrder}>
                    {state.statusRequest_id > 1 && (
                      <i className="fa fa-check" />
                    )}
                    <span>Aprovar</span>
                  </div>
                  <div className="state">
                    {state.statusRequest_id > 2 && (
                      <i className="fa fa-check" />
                    )}
                    <span>Em preparação</span>
                  </div>
                  <div className="state">
                    {state.statusRequest_id > 3 && (
                      <i className="fa fa-check" />
                    )}
                    <span>
                      {state.deliveryType_id === 1
                        ? "Rota de entrega"
                        : "Retirar na Loja"}
                    </span>
                  </div>
                  <div className="state">
                    {state.statusRequest_id === 6 && (
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
                    <tr>
                      <td>Picanha bovina na mostarda</td>
                      <td>5kg</td>
                      <td>59,00</td>
                      <td>295,00</td>
                    </tr>
                    <tr>
                      <td>Picanha bovina na mostarda</td>
                      <td>5kg</td>
                      <td>59,00</td>
                      <td>295,00</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="contentTotal">
                <div className="note">
                  <p>note</p>
                </div>
                <div className="subtTotals">
                  <div className="groupTotals">
                    <strong>SubTotal:</strong>
                    <span>229,00</span>
                  </div>
                  <div className="groupTotals">
                    <strong>Taxa de entrega:</strong>
                    <span>0,00</span>
                  </div>
                  <div className="groupTotals">
                    <strong>Desconto:</strong>
                    <span>0,00</span>
                  </div>
                  <div className="total">
                    <strong>Total</strong>
                    <span>0,00</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailsMyOrder;
