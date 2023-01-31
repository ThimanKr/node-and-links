import React from 'react';
import { Row, Col } from 'antd';
import './style.css'

const Footer = () => {
    return (
        <div className="footer">
            <Row style={{'width':'100%'}}>
                <Col span={12} className="branding">
                    <span>
                        <img src="/images/mobitelLogo.png" className="brandLogo" alt="mobitel logo"/>
                        Powered by Node & Links.
                    </span>
                </Col>
                <Col span={12} className="copyrights">
                    <span>All Right Reserved 2023 Node & Links</span>
                </Col>
            </Row>  
        </div>
    )
}

export default Footer;