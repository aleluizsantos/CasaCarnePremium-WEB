import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";

import "./styles.css";

export default function FormsAccount() {
  const [disabledEdit, setDisabledEdit] = useState(true);

  function handleDisabledEdit() {
    setDisabledEdit(!disabledEdit);
  }
  return (
    <Form>
      <Label tag="h5">
        Informações da Organização
        {disabledEdit && (
          <span className="icoEdit" onClick={handleDisabledEdit}>
            <i className="nc-icon nc-refresh-69" />
          </span>
        )}
      </Label>
      <Row>
        <Col md="4">
          <FormGroup>
            <Label>Identificação da conta</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="79536596322"
              placeholder="Company"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>Nome da organização</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="Casa de Carne Premium"
              placeholder="Company"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>Data Criação</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="10/11/2021"
              placeholder="Company"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>

      <Label tag="h5">Detalhe do contato </Label>
      <Row>
        <Col md="4">
          <FormGroup>
            <Label>Nome completo</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="Rodrigo Correa Girotto"
              placeholder="Nome completo"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>E-mail</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="casacarnepremium@gmail.com"
              placeholder="E-mail"
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>Telefone</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="(17) 98826-0129"
              placeholder="Telefone"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <FormGroup>
            <Label>Endereço</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="Rua Jorge Amado"
              placeholder="Endereço"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>Número</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="3286"
              placeholder="Número"
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>Bairro</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="Jd. Arapuã"
              placeholder="Bairro"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <FormGroup>
            <Label>Cidade</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="Jales/SP"
              placeholder="Cidade"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>CEP</Label>
            <Input
              disabled={disabledEdit}
              defaultValue="15707-160"
              placeholder="CEP"
              type="email"
            />
          </FormGroup>
        </Col>
      </Row>

      {!disabledEdit && (
        <div className="contentButton">
          <Button size="sm" color="success" outline>
            Salvar
          </Button>
          <Button size="sm" onClick={handleDisabledEdit} color="info" outline>
            Cancelar
          </Button>
        </div>
      )}
    </Form>
  );
}
