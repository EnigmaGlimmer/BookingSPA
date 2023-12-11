import React, { useEffect, useState } from 'react';

// Components
import { CustomReactQuill } from '../../../components';
import { Button, Col, Dropdown, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';

// Form submission handlers
import { useFormik } from 'formik';
import * as yup from 'yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getService, postService, deleteService, putService } from '../../../store/service/action';
import moment from 'moment';

import { getBlogOfService, putBlogOfService } from '../../../api';

// API

// Purify
import * as DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import useService from '../../../hooks/useServices';
import ServiceListTable from 'components/table/service-table';

let serviceSchema = yup.object().shape({
    title: yup.string().required('Title is require field'),
    price: yup.number().required('Price is require field'),
    duration: yup.string().required('Duration is require field'),
    description: yup.string().required('Description is require field'),
    promotion: yup
        .object()
        .nullable()
        .shape({
            promotionName: yup.string().required('Promotion Name is require field'),
            startDate: yup.date().required(),
            endDate: yup.date().required(),
            discountRates: yup.number().required('Discount is require field'),
        }),
});

function AdminServices() {
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
            duration: '',
            description: '',
            promotion: null,
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
                    duration: values.duration,
                    description: values.description,
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
        dispatch(
            getService({
                skip: 0,
                take: 100,
            }),
        );
    }, [dispatch]);

    const [checkResult, setCheckResult] = useState(false);

    return (
        <section className="container-fluid py-3">
            {/* <pre>{JSON.stringify(values, 4, 4)}</pre> */}
            <h3>Create Service</h3>
            <p className="mb-3">Create a new service by yourself</p>
            <Form onSubmit={handleSubmit}>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Service Duration</Form.Label>
                        <Form.Control
                            name="duration"
                            placeholder="Enter service duration"
                            isInvalid={touched.duration && errors.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.duration}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Service Description</Form.Label>
                        <Form.Control
                            name="description"
                            placeholder="Enter service description"
                            isInvalid={touched.description && errors.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dependency</Form.Label>
                        <Form.Select name="parentId" onChange={handleChange} placeholder="Enter service title">
                            <option value={0}>Choose the root service</option>
                            {(services || [])
                                ?.filter((s) => {
                                    return !s?.parentId;
                                })
                                ?.map((item, index) => {
                                    return (
                                        <option key={index} value={item?.serviceId}>
                                            {item?.serviceName}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Form.Group>
                </div>
                {/* 2. Promotion */}
                <div className="p-3 mb-3" style={{ background: '#fff' }}>
                    <h3>Promotion</h3>
                    <p>Add your attraction</p>

                    <Form.Group className="mb-3">
                        <Form.Label>Promotion Name</Form.Label>
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

                    <Button type="submit" variant="outline" className="btn-primary-outline me-2">
                        Submit
                    </Button>
                    <Button variant="outline" className="btn-primary-outline" onClick={() => setCheckResult(true)}>
                        View Result
                    </Button>
                </div>
            </Form>
            <FormInfoModal
                show={checkResult}
                onHide={() => setCheckResult(false)}
                title={values.title}
                price={values.price}
                parentId={values.parentId}
                parentName={
                    services?.find?.((s) => {
                        return s?.serviceId?.toString?.() === values.parentId;
                    })?.serviceName
                }
                promotion={{
                    promotionName: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    discountRates: 0,
                    isDeleted: false,
                }}
            ></FormInfoModal>
            <ServiceListTable></ServiceListTable>
            <EditServicePost></EditServicePost>
        </section>
    );
}

function EditServicePost() {
    const {
        services,
        blog,
        selectedId: selectedPostId,
        setSelectedId: setSelectedPostId,
        setBlog,
    } = useService({
        request: {
            skip: 1,
            take: 100,
        },
    });

    const { handleChange, handleBlur, handleSubmit, setFieldValue, values, errors } = useFormik({
        initialValues: {
            blogContent: blog?.blogContent,
            metaKeywords: blog?.metaKeywords,
            metaTitle: blog?.metaTitle,
            metaDescription: blog?.metaDescription,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            putBlogOfService(selectedPostId, {
                blogContent: { value: values.blogContent },
                metaDescription: values.metaDescription,
                metaKeywords: values.metaKeywords,
                metaTitle: values.metaTitle,
                postedDate: new Date(),
            })
                .then((response) => {
                    setBlog(response || blog);
                    toast.success('Edited Post Success', {
                        autoClose: 3000,
                    });
                })
                .catch((err) => {
                    toast.error(typeof err === 'string' ? err : 'Edited Post Failed', {
                        autoClose: 3000,
                    });
                });
        },
        validationSchema: yup.object().shape({
            blogContent: yup.string().required(),
            metaKeywords: yup.string().required(),
            metaTitle: yup.string().required(),
            metaDescription: yup.string().required(),
        }),
    });

    return (
        <section>
            <Row>
                <Col xs="12" lg="6">
                    <Form onSubmit={handleSubmit}>
                        <h3>Edit Service Posts</h3>

                        <div className="p-3 mb-3" style={{ background: '#fff' }}>
                            <Form.Group id="service-need-to-edit-post">
                                <Form.Label>Service</Form.Label>
                                <Form.Select
                                    className="mb-3"
                                    onChange={(e) => {
                                        setSelectedPostId(e.target.value);
                                    }}
                                >
                                    <option selected={selectedPostId === null}>Select Service To Edit</option>
                                    {(services || [])?.map((service, key) => (
                                        <option
                                            key={key}
                                            value={service?.serviceId}
                                            selected={selectedPostId === service?.serviceId}
                                        >
                                            {service?.serviceName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group id="service-post-content">
                                <CustomReactQuill
                                    value={values.blogContent}
                                    onChange={(htmlText) => {
                                        setFieldValue('blogContent', htmlText);
                                    }}
                                ></CustomReactQuill>
                            </Form.Group>

                            <h4 className="mt-3 font-2">Meta data</h4>

                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                {/* <Tab eventKey="home" title="General Info">
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
                                </Tab> */}
                                <Tab eventKey="profile" title="Meta Data">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meta title</Form.Label>
                                        <Form.Control
                                            placeholder="Enter meta title"
                                            name="metaTitle"
                                            value={values.metaTitle}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meta Keywords</Form.Label>
                                        <Form.Control
                                            placeholder="Enter meta keywords"
                                            name="metaKeywords"
                                            value={values.metaKeywords}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Meta Description</Form.Label>
                                        <Form.Control
                                            placeholder="Enter meta Description"
                                            name="metaDescription"
                                            value={values.metaDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Form.Control>
                                    </Form.Group>
                                </Tab>
                            </Tabs>

                            <Button type="submit" variant="outline" className="btn-primary-outline">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col xs="12" lg="6">
                    <h2>Demo Blog of Service</h2>
                    <article
                        style={{ border: '1px solid var(--clr-border)', minHeight: '100%' }}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(values?.blogContent),
                        }}
                    ></article>
                </Col>
            </Row>
        </section>
    );
}

function FormInfoModal({ show, onHide, title = '', parentId = null, parentName = '', price = 0, promotion }) {
    return (
        <Modal show={show} onHide={onHide} size="sm" centered style={{ background: '#fff', maxWidth: '300px' }}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <article>
                    <label>Title: </label>
                    <h2>{title || <i>unknown</i>}</h2>
                    <label>Root: #{parentId}</label>
                    <p>{parentName || <i>unknown</i>}</p>
                    <label>Price</label>
                    <p>{price}$</p>
                    <p>
                        <b>Promotion: </b>
                    </p>
                    <label>Name: </label>
                    <p>{promotion?.promotionName || <i>unknown</i>}</p>
                    <label>Start: </label>
                    <p>{moment(promotion?.startDate).format('MMMM DD, YYYY')}</p>
                    <label>End: </label>
                    <p>{moment(promotion?.endDate).format('MMMM DD, YYYY')}</p>
                    <label>Discount rate: </label>
                    <p>{promotion?.discountRates || <i>unknown</i>}</p>
                    <label>Worked: </label>
                    <p>{promotion?.isDeleted ? 'true' : 'false'}</p>
                </article>
            </Modal.Body>
        </Modal>
    );
}

export { serviceSchema };
export default AdminServices;
