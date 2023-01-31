import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, ConfigProvider } from "antd";

import "./style.css";
import { customizeRenderEmpty } from "../../utility/tableConfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataColumns, fileDataColumns } from "./tableProperties";
import Header from "../../component/Header";
import { getDataAction } from "../../models/fileUploadModel";
import { useHistory, useParams } from "react-router-dom";
import BarCharData from "./BarChart";

const ViewData = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { fileType, fileId } = useParams();
  const fileData = useSelector((state) => state.file.nodeData);
  const [searchDate, setSearchDate] = useState("");
  const [searchColumn, setSearchCol] = useState("");

  useEffect(() => {
    console.log(history.location);
    dispatch(getDataAction({ fileType, fileId }));
  }, []);

  const setSearchData = ({ key, dataIndex }) => {
    setSearchDate(key);
    setSearchCol(dataIndex);
  };

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  let dateWithCount = {};

  //   const convertToDateWithCount = (arr) => {
  //     arr.forEach((element, index) => {
  //       console.log("eleeeeeee", element);
  //     });
  //   };

  const sortedDate = (arr, prop) => {
    return arr.sort((a, b) => new Date(a[prop]) - new Date(b[prop]));
  };

  const nodesGroupedByStartDate = groupBy(fileData, "startDate");
  const nodesGroupedByEndDate = groupBy(fileData, "endDate");

  const valuesByStartDate = new Map();
  Object.keys(nodesGroupedByStartDate).forEach((key) => {
    valuesByStartDate.set(key, nodesGroupedByStartDate[key].length);
  });

  const valuesByEndDate = new Map();
  Object.keys(nodesGroupedByEndDate).forEach((key) => {
    valuesByEndDate.set(key, nodesGroupedByEndDate[key].length);
  });

  //   const totalNodesByStartDate = nodesGroupedByStartDate.map();

  const lablesByStartDate = [...valuesByStartDate.keys()];
  const lablesByEndDate = [...valuesByEndDate.keys()];

  var dataByStartDate = Array.from(valuesByStartDate.values());
  var dataByStartDate = Array.from(valuesByEndDate.values());

  const sortedLablesByStartDate = sortedDate(lablesByStartDate, "startDate");
  const sortedLablesByEndDate = sortedDate(lablesByStartDate, "endDate");

  //console.log("jkjkjk=======", map);

  return (
    <div>
      <Header />
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          style={{ padding: "20px" }}
          id="nodeDataTable"
          columns={dataColumns(setSearchData)}
          dataSource={fileData}
          bordered
          pagination={false}
          title={() => "File Data"}
        />
      </ConfigProvider>
      <Row>
        <BarCharData lables={lablesByStartDate} data={dataByStartDate} />
      </Row>
    </div>
  );
};

export default ViewData;
