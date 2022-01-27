import React from "react";
import { Link } from "react-router-dom";

import { Table, Label } from "reactstrap";
import imgPlanFree from "../../../assets/img/plan-free.svg";

export default function TablePayments() {
  return (
    <div className="content">
      <Table hover responsive>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Faturado a</th>
            <th>Criado em</th>
            <th>Status </th>
            <th>Total </th>
            <th>Ações </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="contentDescription">
                <img src={imgPlanFree} alt="logo plan" />
                <div className="description">
                  <Label tag="big">Plano avaliação 90 dias</Label>
                  <Label tag="samp">Fatura: 5678909</Label>
                </div>
              </div>
            </td>
            <td>
              <div className="contentDescription">
                <div className="description">
                  <Label tag="big">Rodrigo Correa Girotto</Label>
                  <Label tag="small">casacarnepremium@gmail.com</Label>
                </div>
              </div>
            </td>
            <td>15 de dezembro 2021</td>
            <td>
              <Label tag="kbd">FREE</Label>
            </td>
            <td>
              <Label tag="strong"> R$ 700,00</Label>
            </td>
            <td>
              <Link to="/setting">Ver fatura</Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
