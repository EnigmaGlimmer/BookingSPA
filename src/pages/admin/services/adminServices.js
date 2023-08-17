import React from 'react';

// Components
import { CustomReactQuill } from '../../../components';

// Text Editor

import { Button, Col, Form, Row, Tab, Table, Tabs } from 'react-bootstrap';

import { Formik } from 'formik';

function AdminServices() {
    return (
        <section className="container-fluid py-3">
            <h3>Create Service</h3>

            <Formik initialValues={{}} onSubmit={() => {}}>
                {({ values, handleChange, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="p-3 mb-3" style={{ background: '#fff' }}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service Title</Form.Label>
                                    <Form.Control name="title" placeholder="Enter service title"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service Description</Form.Label>
                                    <Form.Control name="description" placeholder="Enter service title"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dependency</Form.Label>
                                    <Form.Select name="parent" placeholder="Enter service title">
                                        <option value={1}>Service 1</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="p-3 mb-3" style={{ background: '#fff' }}>
                                <h4>Service Gallery</h4>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service Image</Form.Label>
                                    <p>Add Service main Image</p>
                                    <Form.Control
                                        name="images"
                                        type="file"
                                        placeholder="Enter service title"
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service Gallery</Form.Label>
                                    <p>Add Service Gallery Images.</p>
                                    <Form.Control name="description" placeholder="Enter service title"></Form.Control>
                                </Form.Group>
                            </div>

                            <div className="p-3 mb-3" style={{ background: '#fff' }}>
                                <h4>Meta data</h4>
                                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="home" title="General Info">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Stocks</Form.Label>
                                            <Form.Control placeholder="Enter Stocks"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control placeholder="Enter Price"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Discount</Form.Label>
                                            <Form.Control placeholder="Enter Discount"></Form.Control>
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Label>Promotion Start</Form.Label>
                                                <Form.Control type="date"></Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Promotion End</Form.Label>
                                                <Form.Control type="date"></Form.Control>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="profile" title="Meta Data">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Meta title</Form.Label>
                                            <Form.Control placeholder="Enter meta title"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Meta Keywords</Form.Label>
                                            <Form.Control placeholder="Enter meta keywords"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control placeholder="Enter meta Description"></Form.Control>
                                        </Form.Group>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Form>
                    );
                }}
            </Formik>

            <h3>System Services</h3>

            <Table striped bordered hover size="sm" style={{ borderColor: 'var(--clr-border)' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service name</th>
                        <th>Price</th>
                        <th>Presented Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <img src="" alt=""></img>
                            Nail
                        </td>
                        <td>12$</td>
                        <td>
                            <img src="" alt=""></img>
                        </td>
                        <td>
                            <Button variant="outline">Not available</Button>
                            <Button variant="outline">View post</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <h3>Edit Service Posts</h3>

            <Form.Select className="mb-3">
                <option>Service 1</option>
                <option>Service 2</option>
            </Form.Select>

            <CustomReactQuill
                onChange={(htmlText) => {
                    console.log(htmlText);
                }}
            ></CustomReactQuill>
        </section>
    );
}

export default AdminServices;
