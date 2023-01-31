import React from "react";
import { Space, Button, DatePicker, Sea } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { faTrash, faTable } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

export const dataColumns = (setSearchData) => {
  return [
    {
      title: "#",
      dataIndex: "id",
      render: (text, row, index) => index + 1,
    },
    {
      title: "Node ID",
      dataIndex: "nodeId",
      key: "nodeId",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.nodeId - b.nodeId,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      ...getColumnSearchProps("startDate", setSearchData),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      ...getColumnSearchProps("startDate", setSearchData),
    },
  ];
};

const getColumnSearchProps = (dataIndex, setSearchData) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Space>
        <DatePicker
          // format={"DD-MM-YY"}
          onChange={(e) => {
            setSelectedKeys([e]);
          }}
          allowClear={true}
        />
      </Space>
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys, confirm, dataIndex, setSearchData)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters, setSearchData)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchData({ key: selectedKeys[0], dataIndex });
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) => {
    return (
      moment(record[dataIndex]).format("DD-MM-YYYY") ===
      value.format("DD-MM-YYYY")
    );
  },
});

const handleSearch = (selectedKeys, confirm, dataIndex, setSearchData) => {
  console.log(selectedKeys, confirm, dataIndex);
  confirm();
  setSearchData({ key: selectedKeys[0], dataIndex });
};

const handleReset = (clearFilters, setSearchData) => {
  clearFilters();
  // console.log(this.state.searchText);
  setSearchData({ key: "", dataIndex: "" });
};
