import React from 'react';
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'antd';

const CardButton = ({disableStatus, ...props}) =>{
    return (
        <Button className="cardButton" type="primary" disabled={disableStatus} {...props} >
            <FontAwesomeIcon className="fa-lg btnIcon" icon={props.iconName} />
            <p>{props.btnName}</p>
        </Button>
    )
}

export default CardButton;