import React from "react";
import { Space, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { faTrash, faTable } from "@fortawesome/free-solid-svg-icons";
import * as path from "../../configs/routes";

export const fileDataColumns = (showDeleteModal) => {
  return [
    {
      title: "#",
      dataIndex: "id",
      render: (text, row, index) => index + 1,
    },
    {
      title: "File ID",
      dataIndex: "fileId",
      key: "fileId",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Action",
      key: "action",
      render: (text, row) => (
        <Space size="middle">
          <Link>
            <Button type="link">
              <FontAwesomeIcon
                icon={faTrash}
                data-tip="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  showDeleteModal({
                    fileId: row.fileId,
                    name: row.fileName,
                  });
                }}
              />
            </Button>
          </Link>
          <Link to={`${path.fileUploadPath}/${row.fileType}/${row.fileId}`}>
            <Button type="link">
              <FontAwesomeIcon
                icon={faTable}
                data-tip="View Data"
                // onClick={(e) => {
                //   e.preventDefault();
                //   //  downloadFile({ url: row.fileDownloadUrl, fileName: row.fileName });
                // }}
              ></FontAwesomeIcon>
            </Button>
          </Link>
          <ReactTooltip place="bottom" />
        </Space>
      ),
    },
  ];
};
