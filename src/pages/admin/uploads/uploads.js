import React from 'react';
import { Col, Row } from 'react-bootstrap';

function Uploads() {
    const [uploads, setUploads] = React.useState(['']);

    return (
        <div>
            <h3>Your Assets</h3>
            <Row>
                {uploads.map((upload) => {
                    return (
                        <Col sm="auto">
                            <img src={upload}></img>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Uploads;
