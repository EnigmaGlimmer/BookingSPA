import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// momentjs
import moment from 'moment';

// Formik
import { useFormik } from 'formik';

// React Bootstrap
import { Button, Modal, Table } from 'react-bootstrap';
import { getSettingList } from '../../../store/actions';
import { FaTimes } from 'react-icons/fa';
import { UploadModal } from '../../../components';
import { Form } from 'react-bootstrap';
import { postSetting } from '../../../api';

function AdminTestimonials() {
    const [show, setShow] = useState(false);
    const { theHome } = useSelector((state) => {
        return {
            theHome: state.Setting?.setting?.content?.home,
        };
    });

    const dispatch = useDispatch();

    const handleDelete = (item) => {
        dispatch(
            postSetting({
                body: { ...theHome, testimonials: theHome?.testimonials?.filter?.((e) => e !== item) },
                page: 'home',
            }),
        );
    };

    React.useEffect(() => {
        dispatch(getSettingList('home'));
    }, [dispatch]);
    return (
        <section>
            <h3>Testimonials</h3>
            <Button
                variant="primary"
                onClick={() => {
                    setShow(true);
                }}
            >
                + Add new item
            </Button>
            <AddNew
                show={show}
                onHide={() => {
                    setShow(false);
                }}
                content={theHome}
            ></AddNew>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Comment</th>
                        <th>Star</th>
                        <th>Posted At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {theHome?.testimonials?.map?.((item, index) => {
                        return (
                            <tr key={index}>
                                <td>1</td>
                                <td>
                                    {item?.title}
                                    <img src={item?.image} alt=""></img>
                                </td>
                                <td>{item?.content}</td>
                                <td>{item?.star}</td>
                                <td>{moment(item?.date).format('MMMM DD, YYYY')}</td>
                                <td>
                                    <Button variant="warning">Edit</Button>
                                    <Button onClick={() => handleDelete(item)} variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </section>
    );
}

function AddNew({ show, onHide, content }) {
    const [uploadModal, setUploadModal] = React.useState(false);

    const dispatch = useDispatch();

    const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            content: '',
            star: 1,
            date: Date(),
            image: '',
        },
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);
            dispatch(
                postSetting({
                    body: { ...content, testimonials: [...content?.testimonials, values] },
                    page: 'home',
                }),
            );
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
                <Modal.Title id="contained-modal-title-vcenter">Create Testimonial</Modal.Title>
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
                    <pre>{JSON.stringify(values, 4, 4)}</pre>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            placeholder="Enter User Name"
                            name={`title`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!touched?.title && !!errors?.title}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            name={`content`}
                            placeholder="Enter the Comment"
                            as="textarea"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.content && !!errors?.content}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.content}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Star</Form.Label>
                        <Form.Control
                            name={`star`}
                            placeholder="Enter the number (1-5)"
                            type="number"
                            min={1}
                            max={5}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.content && !!errors?.content}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.content}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <div className="py-4">
                            <div className="admin-image-form-title">Image</div>
                            <Button variant="success" onClick={() => setUploadModal(true)}>
                                Upload your image
                            </Button>
                            <UploadModal
                                show={uploadModal}
                                onSave={(hasShown) => {}}
                                onSelected={(selected) => {}}
                                selected={''}
                                onHide={() => {
                                    setUploadModal(false);
                                }}
                                onCopyLink={(link) => {
                                    setFieldValue('image', link);
                                    setUploadModal(false);
                                }}
                            ></UploadModal>
                            <div className="admin-images-form">
                                <div style={{ textAlign: 'right' }}>
                                    {values.image ? (
                                        <FaTimes
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setFieldValue('image', '');
                                            }}
                                        ></FaTimes>
                                    ) : (
                                        <></>
                                    )}
                                    <img src={values.image} width={'100%'} />;
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default AdminTestimonials;
