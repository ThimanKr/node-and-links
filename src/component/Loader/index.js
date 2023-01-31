import React, {Fragment} from 'react';
import {SpinnerComponent} from "react-element-spinner";
import {useSelector} from "react-redux";
import './style.css';

const Loader = () => {

    const isLoading = useSelector(state => state.loader.loading);
    const msg = useSelector(state => state.loader.msg);

    return (
        <Fragment>
            <SpinnerComponent
                loading={isLoading}
                position="global"
                message={msg}
                // backgroundColor = "blue"
                // secondaryColor="green"
                // color = "#2c60dc"
                spinnerType="circle-dots"
            />
        </Fragment>
    );
}

export default Loader;