import React from 'react';
import * as yup from 'yup';
// Components
import { CustomReactQuill } from '../../../components';

// Text Editor

import { Button, Col, Form, Row, Tab, Table, Tabs } from 'react-bootstrap';

import { Formik } from 'formik';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getService, postService, deleteService } from '../../../store/service/action';

let serviceSchema = yup.object().shape({
    title: yup.string().required('Title is required field'),
});

function AdminServices() {
    const [parent, setParent] = React.useState([]);

    const dispatch = useDispatch();

    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });
    React.useEffect(() => {
        dispatch(getService());
    }, [dispatch]);
    const handleDeleteService = (id) => {
        dispatch(deleteService(id));
    };
    return (
        <section className="container-fluid py-3">
            <h3>Create Service</h3>

            <Formik
                initialValues={{
                    title: '',
                    parentId: null,
                }}
                validationSchema={serviceSchema}
                onSubmit={(values, formikHelper) => {
                    formikHelper.setSubmitting(false);
                    dispatch(
                        postService({
                            parentId: values.parentId,
                            createdDate: new Date(),
                            serviceName: values.title,
                        }),
                    );
                }}
            >
                {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <pre>{JSON.stringify(values, 4, 4)}</pre>
                            <div className="p-3 mb-3" style={{ background: '#fff' }}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service Title</Form.Label>
                                    <Form.Control
                                        name="title"
                                        placeholder="Enter service title"
                                        isInvalid={touched?.title && errors?.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Service Description</Form.Label>
                                    <Form.Control
                                        name="description"
                                        placeholder="Enter service title"
                                        isInvalid={touched.description && errors.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dependency</Form.Label>
                                    <Form.Select
                                        name="parentId"
                                        onChange={handleChange}
                                        placeholder="Enter service title"
                                    >
                                        <option value={0}>Choose the root service</option>
                                        {services?.map((item, index) => {
                                            return (
                                                <option key={index} value={item?.serviceId}>
                                                    {item?.serviceName}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                    <Button type="submit">Submit</Button>
                                </Form.Group>
                                <Form.Group>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Service Name</th>
                                                <th>Dependency</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item?.serviceId}</td>

                                                        <td>{item?.serviceName}</td>
                                                        <td>
                                                            {
                                                                services.find((e) => e.parentId === item?.parentId)
                                                                    .serviceName
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                onClick={() => handleDeleteService(item?.serviceId)}
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Button className="mx-4">Update</Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
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
