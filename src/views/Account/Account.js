import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Label } from "reactstrap";

import "./styles.css";
import imgLogo from "../../assets/img/logo.svg";
import imgPlanFree from "../../assets/img/plan-free.svg";
import FormsAccount from "./FormsAccount";
import Payment from "./Payment";
import Verified from "./Verified";

export default function Account() {
  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="big">Perfil da conta</CardTitle>
        </CardHeader>
        <CardBody>
          <section className="header">
            <img src={imgLogo} alt="logo casa de carne premium" />
            <div className="titleAccount">
              <span>Casa de Carne Premium</span>
              <span>casacarnepremium@gmail.com</span>
            </div>
            <Verified />
          </section>

          <FormsAccount />

          <Label tag="h5">Plano</Label>
          <section className="section-plan">
            <img src={imgPlanFree} alt="logo casa de carne premium" />
            <div className="plan">
              <span>Plano avaliação 90 dias</span>
              <span>Você encontra com um plano de demostração </span>
            </div>
          </section>
        </CardBody>
      </Card>

      <Payment />
    </div>
  );
}
