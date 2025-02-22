// src/molecules/ConfirmationModal.tsx
import React from "react";
import { Modal, Button } from "antd";

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
  acceptText?: string;
  rejectText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  message,
  onAccept,
  onReject,
  onClose,
  acceptText = "Aceptar",
  rejectText = "Cancelar",
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="reject" onClick={onReject}>
          {rejectText}
        </Button>,
        <Button key="accept" type="primary" onClick={onAccept}>
          {acceptText}
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
