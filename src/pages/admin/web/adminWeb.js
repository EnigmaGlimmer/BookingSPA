import React from 'react';

// Component
import { Col, Form, Row } from 'react-bootstrap';
import { Home, About, BookingPage, Promotion } from '../..';

import { useFormik } from 'formik';

import { Link, useSearchParams, createSearchParams } from 'react-router-dom';

// Custom style
import './style.css';
import { postSetting } from '../../../api';

function AdminWeb() {
    const [params] = useSearchParams();

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
                </>
            )}
        </section>
    );
}

function PageDemo({ page }) {
    const [sections, setSections] = React.useState(null);

    React.useEffect(() => {
        const elements = document.querySelectorAll('[id*="st-"]');

        setSections(elements);

        elements.forEach((element) => {
            if (!element.classList.contains('admin-control')) {
                element.classList.add('admin-control');
            }
        });

        return () => {};
    }, []);

    React.useEffect(() => {
        (sections || []).forEach((element) => {
            element.removeEventListener('click', () => {});
            element.addEventListener('click', () => {});
        });
    }, [sections]);

    function Render() {
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
    }

    return (
        <>
            <ul>
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
            </ul>

            <h3>Web Content</h3>

            <ListWeb></ListWeb>

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
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            title: 'Edit this context',
            content: 'Edit this content',
        },
        onSubmit: (values) => {},
    });
    return (
        <Form onSubmit={handleSubmit}>
            <h4>
                #{sectionName} - {page}
            </h4>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched?.title && !!errors?.title}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched?.content && !!errors?.content}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{errors?.content}</Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
}

export default AdminWeb;
