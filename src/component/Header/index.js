import React, {Fragment} from 'react';
import { Row, Col } from 'antd';
import './style.css';

const Header = () => {

    return (
        <div className="header">
            <Row className="w-100">
                <Col span={15}>
                    <img src="/images/nalLogo.png" alt="NAL logo" style={{ "width": "50px" }} />
                </Col>
                <Col span={9} className="greetingWrapper">
                    <div className='greetingTextWrapper'>
                        <span className="greeting">Welcome</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Header;