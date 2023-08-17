import React, { useState } from 'react';

// Local Components
import { CustomReactQuill } from '../../../components';
import { Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';

function AdminBlog() {
    const [demo, setDemo] = useState('');

    return (
        <section className="container-fluid py-3">
            <h3 className="mb-3">Post your new blog</h3>
            <Row>
                <Col sm="6">
                    <h4 className="mb-5">Edit the content</h4>
                    <Formik
                        initialValues={{
                            id: 1,
                            title: '',
                        }}
                        onSubmit={(values) => {}}
                    >
                        {({ values, handleSubmit, handleChange }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-3">Title</Form.Label>
                                        <Form.Control
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="mb-3">Content</Form.Label>
                                        <CustomReactQuill
                                            onChange={(htmlText) => {
                                                setDemo(htmlText);
                                            }}
                                        ></CustomReactQuill>
                                    </Form.Group>
                                </Form>
                            );
                        }}
                    </Formik>
                </Col>
                <Col sm="6" style={{ position: 'sticky', top: 0, maxHeight: '720px', overflowY: 'scroll' }}>
                    <div>
                        <h4 className="mb-5">Demo</h4>
                        <article
                            className="w-100 demo p-2"
                            style={{ border: '1px solid var(--clr-border)', minHeight: '600px' }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: demo }}></div>
                        </article>
                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default AdminBlog;
