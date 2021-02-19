import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalView = (props) => {
  const { className, title, children } = props;
  const [modal, setModal] = useState(true);
  const [backdrop] = useState("static");
  const [keyboard] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <div className="text-center">{children}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalView;
