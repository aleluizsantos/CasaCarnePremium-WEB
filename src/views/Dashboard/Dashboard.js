import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
// core components

import { getSaleDay, getSaleWeek, getSaleYear } from "../../hooks/Reports";
import { formatTime, formatDate, formatCurrency } from "../../hooks/format";

const Dashboard = (props) => {
  const [saleDay, setSaleDay] = useState("");
  const [saleweek, setSaleWeek] = useState([]);
  const [saleYear, setSaleYear] = useState([]);
  const { clientsOnline, clientsRegistered, newOrders } = useSelector(
    (state) => state.Notificate
  );

  useEffect(() => {
    (async () => {
      getSaleDay().then((resposne) => setSaleDay(resposne.totalSaleDay));
      getSaleWeek().then((resposne) => setSaleWeek(resposne));
      getSaleYear().then((resposne) => setSaleYear(resposne));
    })();
  }, []);

  console.log(saleweek);

  const chartSaleWeek = {
    data: (canvas) => {
      return {
        labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        datasets: [
          {
            borderColor: "#00bf55",
            backgroundColor: "#6bd098",
            pointRadius: 5,
            pointHoverRadius: 10,
            borderWidth: 2,
            data: saleweek,
          },
        ],
      };
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
          data: saleYear,
          fill: false,
          borderColor: "#fbc658",
          backgroundColor: "transparent",
          pointBorderColor: "#fbc658",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
      ],
    },
    options: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <>
      <div className="content">
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
                    <div className="numbers">
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
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Vendas Semanal</CardTitle>
                <p className="card-category">De segunda-feira a Domingo</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={chartSaleWeek.data}
                  options={chartSaleWeek.options}
                  width={400}
                  height={100}
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
        <Row>
          <Col md="12">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Vendas anuais</CardTitle>
                <p className="card-category">Totais vendas mês a mês.</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={chartSaleYear.data}
                  options={chartSaleYear.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-warning" />{" "}
                  {1900 + new Date().getYear()}
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Dados atualizados
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
