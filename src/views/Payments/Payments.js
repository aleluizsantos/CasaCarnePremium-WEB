import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Label,
} from "reactstrap";

import "./styles.css";
import imgLogo from "../../assets/img/logo.svg";
import TablePayments from "./components/TablePayments";

export default function Payments() {
  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="big">Histórico de Pagamento</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="contentHeader">
            <img src={imgLogo} alt="logotipo" />
            <div className="content-title">
              <span>Casa de Carne Premium</span>
              <span>casacarnepremium@gmail.com</span>
            </div>
          </div>

          <div className="contentDropbox">
            <Label>Filtrar por</Label>
            <Input id="selectYear" bsSize="lg" type="select">
              <option value="0">2022</option>
              <option value="0">2021</option>
              <option value="0">2020</option>
            </Input>
          </div>

          <TablePayments />
        </CardBody>
      </Card>
    </div>
  );
}
