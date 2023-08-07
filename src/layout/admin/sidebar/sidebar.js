import React from 'react';

// style
import './sidebar.css';
import { Col, Row } from 'react-bootstrap';

function Sidebar({ children }) {
    return (
        <div>
            <Row>
                <Col>Sidebar</Col>
                <Col>{children}</Col>
            </Row>
        </div>
    );
}

export default Sidebar;
