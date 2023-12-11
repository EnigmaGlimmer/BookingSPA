import { DatePicker } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

// const BlockServiceForm = function () {
//     // const validation = useFormik({
//     //     initialValues: {
//     //         blockedDate: moment().format('YYYY-MM-DD'),
//     //     },
//     // });
//     return (
//         <Form>
//             <Form.Group>
//                 <Form.Label>Blocked Day</Form.Label>
//                 {/* <DatePicker></DatePicker> */}
//             </Form.Group>
//         </Form>
//     );
// };

function BlockServiceForm() {
    return (
        <div style={{ minHeight: '340px' }}>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="row">
                            <Form.Label as={Col} sm="2" lg="3">
                                Blocked From
                            </Form.Label>
                            <Col>
                                <DatePicker class></DatePicker>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="row">
                            <Form.Label as={Col} sm="2" lg="3">
                                Blocked To
                            </Form.Label>
                            <Col>
                                <DatePicker></DatePicker>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default BlockServiceForm;
