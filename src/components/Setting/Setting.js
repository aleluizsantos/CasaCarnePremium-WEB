import React from "react";
import { Button } from "reactstrap";
import "./styles.css";

import Swift from "../Switch";

const Setting = ({ open, onChange }) => {
  const width = open ? 280 : 0;
  return (
    <div className="containerSetting" style={{ width: width }}>
      <div className="headerSetting">
        <span>Configurações</span>
        <Button close onClick={onChange} />
      </div>
      <div className="bodySetting">
        <div className="groupSetting">
          <div className="caption">
            <p>Ativar estoque zerado</p>
            <small>
              Exibi o produto no aplicativo mesmo como o estoque zerado
            </small>
          </div>
          <div className="actions">
            <Swift value={true} onClick={() => {}} />
          </div>
        </div>

        <div className="groupSetting">
          <div className="caption">
            <p>Alerta de estoque</p>
            <small>
              Exibi uma mensagem quando o estoque estiver abaixo de:
            </small>
          </div>
          <div className="actions">
            <Swift value={true} onClick={() => {}} />
          </div>
        </div>

        <div className="groupSetting">
          <div className="caption">
            <p>Ocultar categoria vazia</p>
            <small>
              Ocultar do aplicativos as categorias que não possuem produtos
            </small>
          </div>
          <div className="actions">
            <Swift value={true} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
