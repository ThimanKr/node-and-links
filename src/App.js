import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import UploadFilePage from "./pages/UploadFile";
import * as path from "./configs/routes";
import Loader from "./component/Loader";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ViewData from "./pages/ViewData";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Loader />
        <Switch>
          <Route exact path={path.landingPath}>
            <LandingPage />
          </Route>
          <Route exact path={path.homePath}>
            <HomePage />
          </Route>
          <Route exact path={path.fileUploadPath}>
            <UploadFilePage />
          </Route>
          <Route path={path.fileUploadPath + "/:fileType/:fileId"}>
            <ViewData />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
