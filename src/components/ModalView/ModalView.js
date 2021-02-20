import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalView = (props) => {
  const { title, modal, toggle, messageModal, action, index } = props;
  const [backdrop] = useState("static");
  const [keyboard] = useState(true);

  const handleConfirmed = () => {
    toggle();
    action(index);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => toggle()}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <ModalHeader toggle={() => toggle()}>{title}</ModalHeader>
        <ModalBody>
          <div className="text-center">{messageModal}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleConfirmed()}>
            Confirmar
          </Button>{" "}
          <Button color="secondary" onClick={() => toggle()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalView;
