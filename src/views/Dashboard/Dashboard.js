import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addDays, subDays, format } from "date-fns";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import "./styles.css";
import imgTop10 from "../../assets/img/imgTop10.svg";
import imgDelivery from "../../assets/img/imgDelivery.svg";
import imgPayment from "../../assets/img/imgPayment.svg";
import {
  getSaleDay,
  getSaleWeek,
  getSaleYear,
  getTop10,
} from "../../hooks/Reports";
import { formatTime, formatDate, formatCurrency } from "../../hooks/format";
import { Graphic } from "../../components";

const Dashboard = (props) => {
  const history = useHistory();
  const [saleDay, setSaleDay] = useState("");
  const [saleweek, setSaleWeek] = useState({});
  const [saleYear, setSaleYear] = useState([]);
  const [top10, setTop10] = useState(null);
  const { clientsOnline, clientsRegistered, newOrders } = useSelector(
    (state) => state.Notificate
  );

  useEffect(() => {
    (async () => {
      getSaleDay().then((respSaleDay) => {
        setSaleDay(respSaleDay.totalSaleDay);
        getSaleWeek().then((respSaleWeek) => {
          setSaleWeek(respSaleWeek);
          getSaleYear().then((respSaleYear) => {
            setSaleYear(respSaleYear);
            getTop10().then((respTop10) => setTop10(respTop10));
          });
        });
      });
    })();
  }, []);

  // Lista as venda Semana ATUAL
  const currentWeek = () => {
    getSaleWeek().then((response) => {
      setSaleWeek(response);
    });
  };
  // Lista as venda de semanas posteriores
  const incrementWeek = () => {
    const currentWeek = new Date(saleweek.interval?.from);
    const lastWeek = addDays(currentWeek, 7);
    const lastWeekFormated = format(lastWeek, "yyyy-M-d");

    getSaleWeek(lastWeekFormated).then((response) => {
      setSaleWeek(response);
    });
  };
  // Lista as venda de semanas anteriores
  const decrementWeek = async () => {
    const currentWeek = new Date(saleweek.interval?.from);
    const lastWeek = subDays(currentWeek, 7);
    const lastWeekFormated = format(lastWeek, "yyyy-M-d");

    getSaleWeek(lastWeekFormated).then((response) => {
      setSaleWeek(response);
    });
  };

  const chartSaleWeek = {
    data: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
      datasets: [
        {
          label: "Venda Semanal",
          data: saleweek.data,
          fill: true,
          borderColor: "#5D4C9B",
          backgroundColor: "rgba(93,76,155,0.1)",
          pointRadius: 2,
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },

      tooltips: {
        enabled: true,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };

  const chartSaleYear = {
    data: {
      labels: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      datasets: [
        {
          label: "Venda Anual",
          data: saleYear,
          fill: true,
          borderColor: "#5D4C9B",
          backgroundColor: "rgba(93,76,155,0.1)",
          pointRadius: 2,
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.5)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <div className="content">
        {/* Box de informações */}
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="3" xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="9" xs="8">
                    <div
                      style={{ cursor: "pointer" }}
                      className="numbers"
                      onClick={() => history.push("userClient")}
                    >
                      <p className="card-category">Cliente Inscritos</p>
                      <CardTitle tag="p">{clientsRegistered}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="3" xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="9" xs="8">
                    <div className="numbers">
                      <p className="card-category">Receita dia</p>
                      <CardTitle tag="p">{formatCurrency(saleDay)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="3">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="10" xs="9">
                    <div className="numbers">
                      <p className="card-category">Pedidos Recebidos</p>
                      <CardTitle tag="p">{newOrders}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> {formatTime(new Date())}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="3" xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="9" xs="8">
                    <div className="numbers">
                      <p className="card-category">Online</p>
                      <CardTitle tag="p">{clientsOnline}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* Gráficos Vendas semanal e vendas anual */}
        <Row>
          <Col md="6">
            <Card>
              <CardHeader className="headerWeek">
                <CardTitle tag="h6">
                  Vendas Semanal
                  {saleweek.interval && (
                    <p className="card-category">
                      Período: {formatDate(saleweek.interval?.from)} à{" "}
                      {formatDate(saleweek.interval?.to)}
                    </p>
                  )}
                </CardTitle>
                <div className="action">
                  <i
                    className=" nc-icon nc-minimal-left"
                    onClick={decrementWeek}
                  />
                  <i className="fa fa-ellipsis-h" onClick={currentWeek} />
                  <i
                    className=" nc-icon nc-minimal-right"
                    onClick={incrementWeek}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <Line
                  data={chartSaleWeek.data}
                  options={chartSaleWeek.options}
                  width={400}
                  height={200}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" />
                  {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader className="headerWeek">
                <CardTitle tag="h6">
                  Venda Anual
                  <p className="card-category">
                    Vendas realizadas em {1900 + new Date().getYear()}
                  </p>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={chartSaleYear.data}
                  options={chartSaleYear.options}
                  width={400}
                  height={200}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" />
                  {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* Tabelas de estatísticas de Usuários|Produtos|Categorias */}
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="content-cardTitle">
                    <span>Top 10 clientes</span>
                    <img src={imgTop10} alt="icone usser" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="content-cardBody">
                  {top10 !== null &&
                    top10.top10Client.map((item, idx) => (
                      <div key={idx} className="itemTop10client">
                        <div className="itemCountClient">{idx + 1}</div>
                        <div className="itemClient">
                          <span>{item.name}</span>
                          <span>{item.address}</span>
                        </div>
                        <div className="itemTotalPur">
                          <span>R$ {item.totalPur}</span>
                          <span>{item.amountOrder} pedidos</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardBody>
              <CardFooter>
                Ver mais <i className="fa fa-caret-right" />
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="content-cardTitle">
                    <span>Top 10 produtos</span>
                    <img src={imgTop10} alt="icone usser" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="content-cardBody">
                  <div className="itemTop10client">
                    <div className="itemCountClient">#</div>
                    <div className="itemClient">
                      <span>Produto</span>
                    </div>
                    <div className="itemTotalPur">
                      <span>Qtd</span>
                    </div>
                  </div>

                  {top10 !== null &&
                    top10.top10Product.map((item, idx) => (
                      <div key={idx} className="itemTop10client">
                        <div className="itemCountClient">{idx + 1}</div>
                        <div className="itemClient">
                          <span>{item.name}</span>
                        </div>
                        <div className="itemTotalPur">
                          <span>{item.amountProduct}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardBody>
              <CardFooter>
                Ver mais <i className="fa fa-caret-right" />
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Graphic
              title="Pagamentos"
              iconTitle={imgPayment}
              label={top10?.topPayDelivery.graphic.label}
              sourceData={top10?.topPayDelivery.graphic.data}
            />
          </Col>
          <Col md="6">
            <Graphic
              title="Tipo entrega"
              iconTitle={imgDelivery}
              label={top10?.topDelivery.graphic.label}
              sourceData={top10?.topDelivery.graphic.data}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
