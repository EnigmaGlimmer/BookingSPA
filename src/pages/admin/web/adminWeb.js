import React from 'react';

// Component
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Home, About, BookingPage, Promotion } from '../..';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Link, useSearchParams, createSearchParams } from 'react-router-dom';

//Swiper
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';

//Icons
import { FaTimes } from 'react-icons/fa';
import { BiAddToQueue } from 'react-icons/bi';

// Custom style
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList, postSetting } from '../../../store/actions';
import { UploadModal } from '../../../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContact } from '../../../hooks/useContact';

function AdminWeb() {
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    let currentContent = params?.get?.('content');

    React.useEffect(() => {
        dispatch(getSettingList(params.get('content')));
    }, [dispatch, currentContent]);

    return (
        <section>
            <Row className="align-items-center">
                <Col xs="auto">
                    <h3>Web Content</h3>
                    <p>You can edit your own content</p>
                </Col>
                <Col xs="auto">
                    <div className="mb-3">
                        <ListWeb></ListWeb>
                    </div>
                </Col>
            </Row>

            {params.get('content') ? (
                <PageDemo page={params.get('content')}></PageDemo>
            ) : (
                <ContactInformation></ContactInformation>
            )}
        </section>
    );
}

function ContactInformation() {
    const dispatch = useDispatch();
    const contact = useContact();

    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
        initialValues: {
            phone: contact?.phone || '61432842392',
            email: contact?.email || 'abc@gmail.com',
            facebook: contact?.facebook || 'facebook.com@littlespa',
            instagram: contact?.instagram || 'sdkodfosdjf',
            whatsapp: contact?.whatsapp || '2543534543',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(postSetting(values, 'contact'));
        },
    });

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Contact Information</h3>
            <p>You can edit your own contact</p>
            <ul>
                <li>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.phone && !!errors?.phone}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors?.email}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control
                            name="facebook"
                            value={values.facebook}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.facebook && !!errors?.facebook}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.facebook}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control
                            name="instagram"
                            value={values.instagram}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.instagram && !!errors?.instagram}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.instagram}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Whatsapp</Form.Label>
                        <Form.Control
                            name="whatsapp"
                            value={values.whatsapp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.whatsapp && !!errors?.whatsapp}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.whatsapp}</Form.Control.Feedback>
                    </Form.Group>
                </li>
            </ul>
            <Button type="submit">Update Dial</Button>
        </Form>
    );
}

function PageDemo({ page }) {
    const [sections, setSections] = React.useState(null);
    const [editTool, setEditTool] = React.useState({
        sectionName: '',
        page,
        show: false,
    });

    React.useEffect(() => {
        const elements = document.querySelectorAll('[id*="st-"]');
        setSections(elements);

        document.querySelectorAll('[id*="st-"]').forEach((section) => {
            if (!section.classList.contains('admin-control')) {
            }
            section.classList.add('admin-control');

            section.addEventListener('click', () => {
                let sectionName = section.id.replace('st-', '');
                setEditTool({
                    sectionName,
                    page,
                    show: true,
                });
            });
        });

        return () => {};
    }, [page]);

    const Render = React.useCallback(() => {
        switch (page) {
            case 'home':
                return <Home></Home>;

            case 'about':
                return <About />;

            case 'promotion':
                return <Promotion></Promotion>;

            case 'booking':
                return <BookingPage></BookingPage>;

            default:
                return <ContactInformation></ContactInformation>;
        }
    }, [page]);

    // Formik
    const validation = useFormik({
        initialValues: {},
        onSubmit: (values) => {},
    });

    return (
        <>
            <EditTool
                show={editTool?.show}
                onHide={() => setEditTool((e) => (e.show = false))}
                sectionName={editTool.sectionName}
                page={editTool.page}
            ></EditTool>

            <div style={{ overflowX: 'scroll' }}>
                <Render></Render>
            </div>
        </>
    );
}

function ListWeb() {
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Select page to edit</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'home',
                            }).toString(),
                        }}
                    >
                        Homepage
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'about',
                            }).toString(),
                        }}
                    >
                        About us
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'promotion',
                            }).toString(),
                        }}
                    >
                        Promotion
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'contact',
                            }).toString(),
                        }}
                    >
                        Contact
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function EditTool({ sectionName, page, show, onHide }) {
    const dispatch = useDispatch();

    const { content } = useSelector((state) => ({
        content: state.Setting?.setting?.content?.[page],
    }));
    const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            title: content?.[sectionName]?.title,
            subtitle: content?.[sectionName]?.subtitle,
            content: content?.[sectionName]?.content,
            child: [
                {
                    title: content?.[sectionName]?.child?.title,
                    subtitle: content?.[sectionName]?.child?.subtitle,
                    content: content?.[sectionName]?.child?.content,
                    image: content?.[sectionName]?.child?.image,
                },
            ],
            images: content?.[sectionName]?.images || [],
            childImage: content?.[sectionName]?.childImage || [],
        },
        onSubmit: (values) => {
            dispatch(
                postSetting(
                    {
                        ...content,
                        [sectionName]: values,
                    },
                    page,
                ),
            );
            onHide();
        },
        enableReinitialize: true,
    });
    // Handle Images
    const [uploadModal, setUploadModal] = React.useState(false);
    const [uploadModalChild, setUploadModalChild] = React.useState(false);
    const [uploadModalChildImage, setUploadModalChildImage] = React.useState(false);

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
                <Form onSubmit={handleSubmit} className="edit-form-content">
                    <h4>
                        #{sectionName} - {page}
                    </h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name={`title`}
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.title && !!errors?.title}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Subtitle</Form.Label>
                        <Form.Control
                            name={`subtitle`}
                            value={values.subtitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.subtitle && !!errors?.subtitle}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.subtitle}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            name={`content`}
                            as="textarea"
                            value={values.content}
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
                                    setFieldValue('images', [...values.images, link]);
                                    setUploadModal(false);
                                }}
                            ></UploadModal>
                            <div className="admin-images-form">
                                {values?.images?.map((item, index) => {
                                    return (
                                        <div style={{ textAlign: 'right' }} key={index}>
                                            <FaTimes
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setFieldValue(
                                                        'images',
                                                        values.images.filter((e) => e !== values.images[index]),
                                                    );
                                                }}
                                            ></FaTimes>
                                            <img src={item} width={'100%'} />;
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="py-4">
                            <div className="admin-image-form-title">Child Image</div>
                            <Button variant="success" onClick={() => setUploadModalChild(true)}>
                                Upload your child images
                            </Button>
                            <UploadModal
                                show={uploadModalChild}
                                onSave={(hasShown) => {}}
                                onSelected={(selected) => {}}
                                selected={''}
                                onHide={() => {
                                    setUploadModalChild(false);
                                }}
                                onCopyLink={(link) => {
                                    setFieldValue('childImage', [...values.childImage, link]);
                                    setUploadModalChild(false);
                                }}
                            ></UploadModal>
                            <div className="admin-images-form">
                                {values?.childImage?.map((item, index) => {
                                    return (
                                        <div style={{ textAlign: 'right' }} key={index}>
                                            <FaTimes
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setFieldValue(
                                                        'childImage',
                                                        values.childImage.filter((e) => e !== values.childImage[index]),
                                                    );
                                                }}
                                            ></FaTimes>
                                            <img src={item} width={'100%'} />;
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="admin-image-form-title">Child Content</Form.Label>
                        <BiAddToQueue
                            style={{ margin: '0 10px', cursor: 'pointer', fontSize: '20px' }}
                            onClick={() =>
                                setFieldValue('child', [
                                    ...values.child,
                                    { title: '', subtitle: '', content: '', image: '' },
                                ])
                            }
                        ></BiAddToQueue>

                        <Swiper
                            pagination={{
                                type: 'fraction',
                            }}
                            cssMode={true}
                            allowSlideNext={true}
                            allowSlidePrev={true}
                            mousewheel={true}
                            navigation={true}
                            keyboard={true}
                            modules={[Pagination, Navigation, Mousewheel, Keyboard]}
                            className="mySwiper"
                            name="child"
                        >
                            {values?.child?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className="child-content-swiper">
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                name={`child[${index}].title`}
                                                value={item?.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched?.item?.title && !!errors?.item?.title}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors?.item?.title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Subtitle</Form.Label>
                                            <Form.Control
                                                name={`child[${index}].subtitle`}
                                                value={item?.subtitle}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched?.item?.subtitle && !!errors?.item?.subtitle}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors?.item?.subtitle}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Content</Form.Label>
                                            <Form.Control
                                                name={`child[${index}].content`}
                                                as="textarea"
                                                value={item?.content}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched?.item?.content && !!errors?.item?.content}
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors?.item?.content}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className="py-4">
                                            <div className="">Image</div>
                                            <Button variant="success" onClick={() => setUploadModalChildImage(true)}>
                                                Upload your image
                                            </Button>
                                            <UploadModal
                                                show={uploadModalChildImage}
                                                onSave={(hasShown) => {}}
                                                onSelected={(selected) => {}}
                                                selected={''}
                                                onHide={() => {
                                                    setUploadModalChildImage(false);
                                                }}
                                                onCopyLink={(link) => {
                                                    setFieldValue(`child[${index}].image`, link);
                                                    setUploadModalChildImage(false);
                                                    console.log(index);
                                                }}
                                            ></UploadModal>
                                            <div className="admin-images-form">
                                                <div style={{ textAlign: 'right' }}>
                                                    {item.image ? (
                                                        <FaTimes
                                                            style={{ cursor: 'pointer' }}
                                                            // onClick={() => {
                                                            //     setFieldValue(
                                                            //         `child[${index}].image`,''),
                                                            //     );
                                                            // }}
                                                            onClick={() => {
                                                                setFieldValue(`child[${index}].image`, '');
                                                            }}
                                                        ></FaTimes>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {values?.child?.[index]?.image ? (
                                                        <img
                                                            key={index}
                                                            src={values.child[index].image}
                                                            width={'100%'}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="my-4">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AdminWeb;
