import React from 'react';

// Components
// Text Editor
import { CustomReactQuill } from '../../../components';

// Bootstrap components
import { Button, Col, Form, Row, Tab, Table, Tabs } from 'react-bootstrap';

// Form submission handlers
import { useFormik } from 'formik';
import * as yup from 'yup';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getService, postService, deleteService } from '../../../store/service/action';

let serviceSchema = yup.object().shape({
    title: yup.string().required('Title is require field'),
    price: yup.number().required('Price is require field'),
    promotion: yup.object().shape({
        promotionName: yup.string().required('Promotion Name is require field'),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
        discountRates: yup.number().required('Discount is require field'),
    }),
});

function AdminServices() {
    const [parent, setParent] = React.useState([]);

    const dispatch = useDispatch();

    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            title: '',
            parentId: null,
            price: 0,
            promotion: {
                promotionName: '',
                startDate: new Date(),
                endDate: new Date(),
                discountRates: 0,
                isDeleted: false,
            },
        },
        validationSchema: serviceSchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);
            dispatch(
                postService({
                    parentId: values.parentId,
                    createdDate: new Date(),
                    serviceName: values.title,
                    price: values.price,
                    promotion: {
                        promotionName: '',
                        startDate: new Date(),
                        endDate: new Date(),
                        discountRates: 0,
                        isDeleted: false,
                    },
                }),
            );
        },
    });

    React.useEffect(() => {
        dispatch(getService());
    }, [dispatch]);

    return (
        <section className="container-fluid py-3">
            <h3>Create Service</h3>
            <p className="mb-3">Create a new service by yourself</p>
            <Form onSubmit={handleSubmit}>
                {/* <pre>{JSON.stringify(values, 4, 4)}</pre> */}
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
                        <Form.Label>Service Price</Form.Label>
                        <Form.Control
                            name="price"
                            placeholder="Enter service price"
                            isInvalid={touched.price && errors.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.price}</Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className="p-3 mb-3" style={{ background: '#fff' }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Promotion</Form.Label>
                        <Form.Control
                            name="promotion.promotionName"
                            placeholder="Enter Promotion Name"
                            isInvalid={touched.promotion?.promotionName && !!errors.promotion?.promotionName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.promotion?.promotionName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            name="promotion.startDate"
                            placeholder="Enter Start Date"
                            type="date"
                            isInvalid={touched.promotion?.startDate && !!errors.promotion?.startDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.promotion?.startDate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            name="promotion.endDate"
                            placeholder="Enter End Date"
                            type="date"
                            isInvalid={touched.promotion?.endDate && !!errors.promotion?.endDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.promotion?.endDate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Discount Rates</Form.Label>
                        <Form.Control
                            name="promotion.discountRates"
                            placeholder="Enter Discount Rates"
                            step={0.2}
                            type="number"
                            isInvalid={touched.promotion?.discountRates && errors.promotion?.discountRates}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.promotion?.discountRates}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dependency</Form.Label>
                        <Form.Select name="parentId" onChange={handleChange} placeholder="Enter service title">
                            <option value={0}>Choose the root service</option>
                            {/* {(services || [])?.map((item, index) => {
                                return (
                                    <option key={index} value={item?.serviceId}>
                                        {item?.serviceName}
                                    </option>
                                );
                            })} */}
                            <option value={services?.find?.((e) => e.serviceName === 'Nail')?.serviceId}>Nail</option>
                            <option value={services?.find?.((e) => e.serviceName === 'Lash')?.serviceId}>Lash</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" className="mb-2" variant="primary">
                        Submit
                    </Button>
                </div>

                {/* <div className="p-3 mb-3" style={{ background: '#fff' }}>
                    <h4>Service Gallery</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Service Image</Form.Label>
                        <p>Add Service main Image</p>
                        <Form.Control name="images" type="file" placeholder="Enter service title"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Service Gallery</Form.Label>
                        <p>Add Service Gallery Images.</p>
                        <Form.Control name="description" placeholder="Enter service title"></Form.Control>
                    </Form.Group>
                </div> */}
            </Form>
            <ServiceListTable></ServiceListTable>
            <EditServicePost></EditServicePost>
        </section>
    );
}

function ServiceListTable() {
    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });

    const dispatch = useDispatch();

    const handleDeleteService = (id) => {
        dispatch(deleteService(id));
    };

    return (
        <>
            <h3>System Services</h3>
            <Table striped bordered hover size="sm" style={{ borderColor: 'var(--clr-border)' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service name</th>
                        <th>Price</th>
                        <th>Presented Image</th>
                        <th>Dependency</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(services || [])
                        ?.filter((e) => e.serviceName !== 'Nail' && e.serviceName !== 'Lash')
                        .map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item?.serviceId}</td>
                                    <td>{item?.serviceName}</td>
                                    <td>{item?.price}$</td>
                                    <td></td>
                                    <td>
                                        {(services || [])?.find?.((e) => e.serviceId === item?.parentId)?.serviceName}
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                handleDeleteService(item?.serviceId);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button variant="outline" className="mx-4">
                                            Update
                                        </Button>
                                        <Button variant="outline">Not available</Button>
                                        <Button variant="outline">View post</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </>
    );
}

function EditServicePost() {
    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });

    const { handleChange, handleSubmit, values, touched, errors } = useFormik({
        initialValues: {
            articleTitle: '',
            articleContent: '',
        },
        onSubmit: (values) => {},
        validationSchema: yup.object().shape({}),
    });

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Edit Service Posts</h3>

            <div className="p-3 mb-3" style={{ background: '#fff' }}>
                <Form.Label>Service</Form.Label>
                <Form.Select className="mb-3">
                    {(services || [])?.map((service, key) => (
                        <option key={key} value={service?.serviceId}>
                            {service?.serviceName}
                        </option>
                    ))}
                </Form.Select>
                <CustomReactQuill
                    onChange={(htmlText) => {
                        console.log(htmlText);
                    }}
                ></CustomReactQuill>
                <h4 className="mt-3">Meta data</h4>
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
}

export default AdminServices;
