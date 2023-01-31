import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../component/Header';
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import * as path from '../../configs/routes';
import "./style.css";
import UploadFilePage from '../UploadFile';
import Navigate from './Navigate';

const HomePage = () => {

    return(
        <div>
            <Header/>
            <div className="commonContainer">
            <Router>
                <Switch>
                    <Route path={path.fileUploadPath}>
                        <UploadFilePage/>
                    </Route>
                    <Route path={'/'}>
                        <Navigate/>
                    </Route>
                </Switch>
            </Router>

            </div>
        </div>
    )

}

export default HomePage;