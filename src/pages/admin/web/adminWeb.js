import React from 'react';

// Component
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Home, About, BookingPage, Promotion } from '../..';

import { useFormik } from 'formik';

import { Link, useSearchParams, createSearchParams } from 'react-router-dom';

// JSON
import about from '../../../config/content/about.json';
import home from '../../../config/content/home.json';
import service from '../../../config/content/service.json';

// Custom style
import './style.css';
import { postSetting } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList } from '../../../store/actions';
import { UploadModal } from '../../../components';
function AdminWeb() {
    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const { setting } = useSelector((state) => {
        return {
            setting: state.Setting.setting,
        };
    });

    let currentContent = params?.get?.('content');

    React.useEffect(() => {
        dispatch(getSettingList(params.get('content')));
    }, [dispatch, currentContent]);

    return (
        <section>
            {params.get('content') ? (
                <PageDemo page={params.get('content')}></PageDemo>
            ) : (
                <>
                    <h3>Web Content</h3>
                    <p>You can edit your own content</p>
                    <ListWeb></ListWeb>
                    <h3>Contact Information</h3>
                    <p>You can edit your own contact</p>
                    <ul>
                        <li>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group>
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group>
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group>
                                <Form.Label>Whatsapp</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                        </li>
                    </ul>
                    <button>Post JSON </button>
                </>
            )}
        </section>
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

            console.log(section);
            section.addEventListener('click', () => {
                let sectionName = section.id.replace('st-', '');
                console.log(sectionName);
                setEditTool({
                    sectionName,
                    page,
                    show: true,
                });
            });
        });

        return () => {};
    }, [page]);

    // React.useEffect(() => {
    //     (sections || []).forEach((element) => {
    //         element.removeEventListener('click', () => {});
    //         element.addEventListener('click', () => {});
    //     });
    // }, [sections]);

    const Render = React.useCallback(() => {
        switch (page) {
            case 'home':
                return <Home></Home>;

            case 'about':
                return <About></About>;

            case 'promotion':
                return <Promotion></Promotion>;

            case 'booking':
                return <BookingPage></BookingPage>;

            default:
                return <></>;
        }
    }, [page]);

    return (
        <>
            {/* <ul>
                <li>
                    <button
                        onClick={() => {
                            postSetting({
                                body: JSON.stringify({
                                    home: {
                                        title: 'This is Homepage',
                                        subtitle: 'Subtitle of homepage',
                                    },
                                    about: {
                                        title: 'skdlksadms',
                                        subtitle: 'skadjksaljd',
                                    },
                                }),
                                page: 'home',
                            })
                                .then((response) => {
                                    console.log(response);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        Post Object
                    </button>
                </li>
            </ul> */}

            <h3>Web Content</h3>

            <ListWeb></ListWeb>
            {editTool?.show && <EditTool sectionName={editTool.sectionName} page={editTool.page}></EditTool>}

            <div style={{ overflowX: 'scroll', maxWidth: '820px' }}>
                <Render></Render>
            </div>
        </>
    );
}

function ListWeb() {
    return (
        <ul>
            <li>
                <Link
                    to={{
                        search: createSearchParams({
                            content: 'home',
                        }).toString(),
                    }}
                >
                    Homepage
                </Link>
            </li>
            <li>
                <Link
                    to={{
                        search: createSearchParams({
                            content: 'about',
                        }).toString(),
                    }}
                >
                    About us
                </Link>
            </li>
            <li>
                <Link
                    to={{
                        search: createSearchParams({
                            content: 'promotion',
                        }).toString(),
                    }}
                >
                    Promotion
                </Link>
            </li>
        </ul>
    );
}

function EditTool({ sectionName, page }) {
    const dispatch = useDispatch();

    const { content } = useSelector((state) => ({
        content: state.Setting?.setting?.content?.[page],
    }));

    const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            title: 'Edit this context',
            subtitle: '',
            content: 'Edit this content',
            childContent: [
                {
                    title: 'Edit this context',
                    subtitle: '',
                    content: 'Edit this content',
                    images: [],
                },
            ],
            images: [],
        },
        onSubmit: (values) => {
            dispatch(
                postSetting({
                    body: {
                        ...content,
                        [sectionName]: values,
                    },
                    page,
                }),
            );
        },
    });

    // Handle Images
    const [uploadModal, setUploadModal] = React.useState(false);

    return (
        <Form onSubmit={handleSubmit}>
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
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched?.content && !!errors?.content}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{errors?.content}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Child Content</Form.Label>
                <Form.Control
                    name={`childContent`}
                    value={values.childContent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched?.childContent && !!errors?.childContent}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{errors?.childContent}</Form.Control.Feedback>
            </Form.Group>{' '}
            <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <Button variant="outline" onClick={() => setUploadModal(true)}>
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
            </Form.Group>
            <Button type="submit" variant="primary">
                Submit
            </Button>
            <pre>{JSON.stringify(values, 4, 4)}</pre>
        </Form>
    );
}

export default AdminWeb;
