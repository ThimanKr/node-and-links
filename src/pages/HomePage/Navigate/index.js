import React, { useState, useEffect } from "react";
import CardButton from "../../../component/CardButton";
import * as path from "../../../configs/routes";
import "./style.css";
import { Row, Col, Card, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Navigate = () => {
  const history = useHistory();
  const nodeData = useSelector((state) => state.file.nodeData);
  const [disableTooltip, handleDisableTooltip] = useState();

  useEffect(() => {
    if (nodeData.length === 0) {
      handleDisableTooltip("Files not uploaded");
    }
  }, [nodeData]);
  return (
    <Row>
      <Col span={4}>
        <CardButton
          btnName="Manage Data Uploads"
          iconName="check-square"
          onClick={() => history.push(path.fileUploadPath)}
        />
      </Col>
      <Col span={4}>
        <Tooltip placement="bottom" title={disableTooltip}>
          <CardButton
            btnName="View Data"
            iconName="eye"
            onClick={() => history.push(path.viewDataPath)}
            disabled={nodeData.length === 0}
          />
        </Tooltip>
      </Col>
      <Col>
        <FontAwesomeIcon icon="clock" />
      </Col>
    </Row>
  );
};

export default Navigate;
