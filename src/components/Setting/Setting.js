import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import validate from "validate.js";
import "./styles.css";

import { SET_MESSAGE } from "../../store/Actions/types";
import { getTaxa, updateTaxa } from "../../hooks";
import { Alert_Sound } from "../../components";

const schemaTaxa = {
  vMinTaxa: {
    presence: { allowEmpty: false, message: "Valor mínimo obrigatório" },
    numericality: true,
  },
  taxa: {
    presence: { allowEmpty: false, message: "Taxa obrigatório" },
    numericality: true,
  },
};

const typeForm = {
  isvalid: false,
  values: {},
  touched: {},
  errors: {},
};

const Setting = ({ open, onChange }) => {
  const dispatch = useDispatch();
  const [formTaxa, setFormTaxa] = useState(typeForm);
  const [buttonAlert, setButtonAlert] = useState({
    active: false,
    title: "Testar",
  });
  const width = open ? 280 : 0;

  useEffect(() => {
    let finished = false;
    (async () => {
      !finished &&
        getTaxa().then((response) =>
          setFormTaxa({ ...typeForm, values: response })
        );
    })();
    return () => {
      finished = true;
    };
  }, []);

  // Atualização no Formulário Taxa
  const handleChangeTaxa = (event) => {
    event.persist();

    let dataForm = {
      ...formTaxa,
      values: {
        ...formTaxa.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formTaxa.touched,
        [event.target.name]: true,
      },
    };

    const errors = validate(dataForm.values, schemaTaxa);

    dataForm = {
      ...dataForm,
      isvalid: errors ? false : true,
      errors: errors || {},
    };

    setFormTaxa(dataForm);
  };
  // Salvar os dados da alteração da Taxa
  const handleSubmitTaxa = async () => {
    await updateTaxa(formTaxa.values).then((response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Valor atualizado",
      });
      setFormTaxa({ ...formTaxa, isvalid: false });
    });
  };

  // Toogle para testar o som de alert
  const toogleAlert = () => {
    Alert_Sound(buttonAlert.active ? "pause" : "play");
    setButtonAlert({
      active: !buttonAlert.active,
      title: buttonAlert.active ? "Testar" : "Parar",
    });
    setInterval(() => {
      Alert_Sound("pause");
      setButtonAlert({
        active: false,
        title: "Testar",
      });
    }, 20000);
  };

  return (
    <div className="containerSetting" style={{ width: width }}>
      <div className="headerSetting">
        <span>Configurações</span>
        <Button close onClick={onChange} />
      </div>
      <div className="bodySetting">
        <div className="groupSetting">
          <div className="caption">
            <p>Taxa de Entrega</p>
            <small>Valor mínimo do pedido</small>
            <Input
              name="vMinTaxa"
              type="text"
              value={formTaxa.values.vMinTaxa || ""}
              onChange={(event) => handleChangeTaxa(event)}
            />
            <small>Valor taxa entrega</small>
            <Input
              name="taxa"
              type="text"
              value={formTaxa.values.taxa || ""}
              onChange={(event) => handleChangeTaxa(event)}
            />
            <Button
              disabled={!formTaxa.isvalid}
              className="small"
              onClick={handleSubmitTaxa}
            >
              Salvar alterações
            </Button>
          </div>
        </div>

        <div className="groupSetting">
          <div className="caption">
            <p>Alerta notificação</p>
            <small>Testa o alerta de notificação</small>
          </div>
          <div className="actions">
            <Button onClick={() => toogleAlert()} size="sm">
              {buttonAlert.title}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
