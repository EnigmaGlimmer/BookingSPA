import { useFormik } from 'formik';
import { serviceSchema } from 'pages/admin/services/adminServices';
import { useDispatch, useSelector } from 'react-redux';
import { putService } from 'store/actions';

const { Button, Row, Col, Modal, Form } = require('react-bootstrap');
const { FaTimes } = require('react-icons/fa');

function UpdateService({ show, onHide, serviceId }) {
    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });

    const foundService = services?.find?.((s) => s.serviceId === serviceId);

    const dispatch = useDispatch();

    const { values, handleChange, handleSubmit, handleBlur, setFieldValue, errors, touched } = useFormik({
        initialValues: {
            title: foundService?.serviceName,
            parentId: foundService?.parentId,
            price: foundService?.price,
            duration: foundService?.duration,
            description: foundService?.description,
            promotion: null,
        },
        validationSchema: serviceSchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);

            dispatch(
                putService({
                    id: serviceId,
                    updatedService: { ...values, serviceName: values.title },
                }),
            );
            onHide();
        },
    });

    return (
        <Modal
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton style={{ margin: '0 auto', width: '80%', background: 'white' }}>
                <Modal.Title id="contained-modal-title-vcenter">Edit Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    margin: '0 auto',
                    maxWidth: 'unset',
                    background: 'white',
                    width: '80%',
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <Form onSubmit={handleSubmit}>
                    <div className="p-3 mb-3" style={{ background: '#fff' }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                name="title"
                                placeholder="Enter service name"
                                value={values?.title}
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
                                type="number"
                                placeholder="Enter service price"
                                value={values?.price}
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
                                value={values?.duration}
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
                                as="textarea"
                                placeholder="Enter service description"
                                value={values?.description}
                                isInvalid={touched.description && errors.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors?.description}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dependency</Form.Label>
                            <Form.Select name="parentId" onChange={handleChange} placeholder="Enter service title">
                                <option value={0} selected={!foundService?.parentId}>
                                    Choose the root service
                                </option>
                                {(services || [])
                                    ?.filter((s) => !s.parentId)
                                    ?.map?.((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item?.serviceId}
                                                selected={foundService?.parentId === item?.serviceId}
                                            >
                                                {item?.serviceName}
                                            </option>
                                        );
                                    })}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    {(!values.promotion && (
                        <Button
                            variant="outline"
                            className="btn-primary-outline"
                            onClick={() =>
                                setFieldValue('promotion', {
                                    promotionName: '',
                                    startDate: new Date(),
                                    endDate: new Date(),
                                    discountRates: 0,
                                    isDeleted: false,
                                })
                            }
                        >
                            + ADD PROMOTION
                        </Button>
                    )) || (
                        <div className="p-3 mb-3" style={{ background: '#fff' }}>
                            <Row className="justify-content-between">
                                <Col>
                                    <h3>Promotion</h3>
                                </Col>
                                <Col className="text-end">
                                    <Button
                                        variant="outline"
                                        className="btn-primary-outline"
                                        onClick={() => setFieldValue('promotion', null)}
                                    >
                                        <FaTimes></FaTimes>
                                    </Button>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="promotion.promotionName"
                                    placeholder="Enter Promotion Name"
                                    isInvalid={touched.promotion?.promotionName && !!errors.promotion?.promotionName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.promotion?.promotionName}
                                </Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">
                                    {errors.promotion?.startDate}
                                </Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">
                                    {errors.promotion?.endDate}
                                </Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">
                                    {errors.promotion?.discountRates}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    )}
                    <article>
                        <Button type="submit" className="my-2 btn-primary-outline" variant="outline">
                            SUBMIT THE EDIT OF SERVICE
                        </Button>
                    </article>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateService;
