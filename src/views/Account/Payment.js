import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Button,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import imgPix from "../../assets/img/pix.png";
import imgQrcode from "../../assets/img/qrcode.png";

export default function Payment() {
  const history = useHistory();
  return (
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="big">Pagamentos</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="6" style={{ display: "flex", flexDirection: "row" }}>
              <img
                style={{ height: 200, width: 200 }}
                src={imgQrcode}
                alt="qrcode"
              />
              <div className="contentDatePix">
                <img
                  style={{ height: 100, width: 200 }}
                  src={imgPix}
                  alt="logo pix"
                />
                <span>Alessandro Luiz dos Santos</span>
                <span>Banco do Brasil S.A.</span>
                <span>chave: aleluizsantos@hotmail.com</span>
              </div>
            </Col>
            <Col md="6" style={{ marginTop: 20 }}>
              <Label tag="h4">Histórico de pagamento</Label>
              <Label tag="blockquote">
                Acesse todos o seu histórios de pagamentos
              </Label>
              <Button onClick={() => history.push({ pathname: "payments" })}>
                Pagamento/Fatura
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
