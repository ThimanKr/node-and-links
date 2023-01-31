import React from "react";
import { Modal, Button } from "antd";
import "./style.css";

const CommonConfirmation = ({
  title,
  message,
  okButtonText,
  cancelButtonText,
  handleOk,
  handleCancel,
}) => {
  return (
    <div>
      <Modal
        title={title}
        centered
        visible={true}
        onCancel={handleCancel}
        width={400}
        footer={[
          <Button key="reset" onClick={handleCancel} size="large">
            {cancelButtonText}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} size="large">
            {okButtonText}
          </Button>,
        ]}
      >
        <div>
          <p className="commonMessage">{message}</p>
        </div>
      </Modal>
    </div>
  );
};

export default CommonConfirmation;
