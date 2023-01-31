import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import * as path from "../../configs/routes";

import "./style.css";

const LandingPage = () => {
  const history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        <img src="/images/nalLogo.png" className="App-logo" alt="logo" />
        <p>
          Welcome to FSD Technical Assignment Demonstration for Node & Links.
        </p>
        <Button type="primary" onClick={() => history.push(path.homePath)}>
          Click Here
        </Button>
      </header>
    </div>
  );
};

export default LandingPage;
