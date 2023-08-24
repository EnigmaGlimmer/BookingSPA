import React, { useRef, useState } from 'react';
import { Button, Col, Form, Modal, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap';

import './upload-modal.css';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { postAsset } from '../../store/actions';
import config from '../../config';
import { toast } from 'react-toastify';

function UploadModal({ onCopyLink, show, onHide, onSave, selected, onSelected }) {
    const dispatch = useDispatch();

    const { uploads, error } = useSelector((state) => {
        return {
            uploads: state.Upload.uploads,
            error: state.Upload.error,
        };
    });

    let uploadInputRef = useRef(null);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            file: null,
            url: '',
        },
        validationSchema: yup.object({
            file: yup
                .mixed()
                .test('FILE SIZE', 'the file is too large', (value) => {
                    if (!value) {
                        return true;
                    }

                    return value.size <= config.rules.PERMIT_SUBMIT_SIZE * 1024 * 1024;
                })
                .test(
                    'FILE FORMAT',
                    `the file format should be ${config.rules.PERMIT_FILE_FORMATS.join()}`,
                    (value) => {
                        if (!value) {
                            return true;
                        }
                        return config.rules.PERMIT_FILE_FORMATS.includes(value.type);
                    },
                ),
            url: yup.string().required(),
        }),
        onSubmit: (values) => {
            dispatch(postAsset(values.file));
        },
    });

    const [recents, setRecents] = useState(null);

    return (
        <div>
            <Modal size="lg" show={show} onHide={() => onHide(show)} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Assets Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs className="mb-3">
                        <Tab eventKey="library" title="Library">
                            <Row id="asset-list">
                                {(uploads || []).map((upload, index) => {
                                    return (
                                        <Col
                                            className="position-relative mb-2"
                                            xs="12"
                                            sm="6"
                                            md="4"
                                            lg="3"
                                            xxl="2"
                                            key={index}
                                            style={{ height: 'fit-content' }}
                                        >
                                            <div className="position-relative">
                                                <img
                                                    className="position-relative"
                                                    src={upload?.assetLink}
                                                    alt={'asset' + index}
                                                ></img>
                                                <div
                                                    className="position-absolute top-0 start-0"
                                                    style={{
                                                        background: 'linear-gradient(45deg, black, transparent)',
                                                        width: '100%',
                                                        height: '100%',
                                                        zIndex: 2,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <span
                                                        className="position-absolute top-50 start-50"
                                                        style={{ transform: 'translate(-50%, -50%)', color: '#fff' }}
                                                        onClick={() => {
                                                            const link = upload?.assetLink;
                                                            onSelected(link);
                                                            navigator.clipboard.writeText(link);
                                                            toast.success('Copied this link of image', {
                                                                autoClose: 3000,
                                                            });
                                                        }}
                                                    >
                                                        Copy this link
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Tab>
                        <Tab eventKey="upload" title="Upload new asset">
                            <Form onSubmit={validation.handleSubmit} className="mb-2">
                                <div className="text-center p-2" style={{ border: '2px solid var(--clr-border)' }}>
                                    <h3>Drop Files to upload</h3>
                                    or
                                    <Button
                                        variant="outline"
                                        className="btn btn-primary d-block mx-auto"
                                        onClick={() => {
                                            if (uploadInputRef.current) {
                                                uploadInputRef.current.click();
                                            }
                                        }}
                                    >
                                        Select Files
                                    </Button>
                                </div>

                                <p className="my-2">Maximum upload file size: 1.8GB</p>

                                <Form.Control
                                    type="file"
                                    className="d-none"
                                    ref={uploadInputRef}
                                    onBlur={validation.handleBlur}
                                    onChange={(e) => {
                                        let file = e.currentTarget?.files?.[0];

                                        if (file) {
                                            validation.setFieldTouched('file', true);

                                            const fileReader = new FileReader();

                                            fileReader.onloadend = () => {
                                                const url = fileReader.result;

                                                setRecents((list) => [
                                                    ...(list || []),
                                                    {
                                                        file,
                                                        url,
                                                    },
                                                ]);
                                            };

                                            fileReader.readAsDataURL(file);

                                            dispatch(postAsset(file));
                                        }
                                    }}
                                    isInvalid={validation.touched.file && validation.values.file}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Error: {validation.errors.file}
                                </Form.Control.Feedback>
                                <Row className="justify-content-between">
                                    {recents &&
                                        recents.map((o, index) => {
                                            return (
                                                <Col sm="12" className="mb-3" key={index}>
                                                    <Row className="align-items-center">
                                                        <Col sm="auto">
                                                            <img
                                                                src={o.url}
                                                                className="d-inline"
                                                                alt={`Demo${index + 1}`}
                                                                width={'80'}
                                                            ></img>
                                                        </Col>

                                                        <Col className="d-inline-block p-2">
                                                            <h5>Asset {index + 1}</h5>
                                                            <p>{o.file.type || 'image/null'}</p>
                                                        </Col>

                                                        <Col sm="3" className="d-inline-block p-2">
                                                            <ProgressBar now={60} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            );
                                        })}
                                </Row>
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UploadModal;
