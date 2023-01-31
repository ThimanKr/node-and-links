import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Table,
  Form,
  Input,
  Select,
  Card,
  Button,
  message,
  Upload,
  Tooltip,
  ConfigProvider,
} from "antd";

import { FILE_TYPE } from "../../constants/enums";
import "./style.css";
import { customizeRenderEmpty } from "../../utility/tableConfig";
import {
  cancelDeleteFileModalAction,
  confirmDeleteFileModalAction,
  deleteFileAction,
  getFilesAction,
  uploadFileAction,
} from "../../models/fileUploadModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fileDataColumns } from "./tableProperties";
import Header from "../../component/Header";
import CommonConfirmation from "../../component/CommonModal";

const UploadFilePage = () => {
  const fileData = useSelector((state) => state.file.fileData);
  const uploadOk = useSelector((state) => state.file.uploadOk);
  const uploadFail = useSelector((state) => state.file.uploadFail);
  const deleteModal = useSelector((state) => state.file.deleteModalFile);

  const [fileList, handleUpdateFileList] = useState([]);
  const [disableUploadBtn, handleDisableUploadBtn] = useState(true);
  const [disableTooltip, handleDisableTooltip] = useState();

  useEffect(() => {
    dispatch(getFilesAction());
    console.log("page loaded....");
  }, []);

  useEffect(() => {
    if (fileList.length !== 0) {
      handleDisableUploadBtn(false);
      handleDisableTooltip();
    } else {
      handleDisableUploadBtn(true);
      handleDisableTooltip("Select a File");
    }
  }, [fileList]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleContentLoaded = (info) => {
    if (
      info.file.type === "application/vnd.ms-excel" ||
      info.file.type === "text/csv"
    ) {
      let fileList = [...info.fileList];
      console.log("feee", fileList);
      handleUpdateFileList(fileList.slice(-1));
      form.setFieldsValue({
        nodeFile: info.fileList[info.fileList.length - 1],
      });
    } else {
      message.error(`${info.file.name} is not a csv file`);
    }
  };

  const showDeleteModal = (payload) => {
    console.log("show dlt ", payload);
    dispatch(deleteFileAction({ ...payload }));
  };

  return (
    <div>
      <Header />
      <Row style={{ padding: "20px" }}>
        <Col span={24}>
          <Card className="fileUploadCard">
            <Form
              name="manageFileUploadForm"
              form={form}
              onFinish={(values) => {
                console.log("form values", values);
                dispatch(uploadFileAction({ ...values }));
                handleUpdateFileList([]);
              }}
            >
              <Row style={{ width: "100%" }} gutter={16}>
                <Col span={6}>
                  <Form.Item name="type" label="File Type">
                    <Select defaultValue={FILE_TYPE.NODE_PROPERTIES}>
                      <Select.Option value={FILE_TYPE.NODE_PROPERTIES}>
                        NODE_PROPERTIES
                      </Select.Option>
                      <Select.Option value={FILE_TYPE.ADJ}>ADJ</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="nodeFile" label="Select File:">
                    <Upload
                      name="file"
                      beforeUpload={() => false}
                      onChange={handleContentLoaded}
                      fileList={fileList}
                      multiple={false}
                      accept=".csv"
                    >
                      <Input allowClear placeholder="Select File" />
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Tooltip placement="bottom" title={disableTooltip}>
                      <Button
                        htmlType="submit"
                        type="primary"
                        disabled={disableUploadBtn}
                      >
                        UPLOAD
                      </Button>
                    </Tooltip>
                  </Form.Item>
                </Col>
                {uploadOk && (
                  <Col span={8} offset={2} className="uploadOkGapFile">
                    <FontAwesomeIcon icon="check-circle" />
                    <span className="totalTextForGap">
                      Records Uploaded Successfully
                    </span>
                  </Col>
                )}
                {uploadFail && (
                  <Col span={8} offset={2} className="uploadFailGapFile">
                    <FontAwesomeIcon icon="exclamation-circle" />
                    <span className="totalTextForGap">
                      Errors Occured While Uploading
                    </span>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          style={{ padding: "20px" }}
          id="nodeListUploadTable"
          columns={fileDataColumns(showDeleteModal)}
          dataSource={fileData}
          bordered
          pagination={false}
          title={() => "Uploaded File Details"}
        />
      </ConfigProvider>

      {deleteModal && (
        <CommonConfirmation
          title={"Delete"}
          message={"Do you want to delete the file?"}
          okButtonText={"YES"}
          cancelButtonText={"CANCEL"}
          handleOk={() => dispatch(confirmDeleteFileModalAction())}
          handleCancel={() => dispatch(cancelDeleteFileModalAction())}
        />
      )}
    </div>
  );
};

export default UploadFilePage;
