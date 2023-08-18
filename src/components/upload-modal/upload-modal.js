import React, { useRef } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import CloudinaryUploadWidget from './upload-widget';

import './upload-modal.css';

function UploadModal({ onCopyLink, show, onHide, onSave, selected, onSelected }) {
    const [uploadedImages, setUploadedImages] = React.useState([
        'https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000',
        'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
        'https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000',
        'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
    ]);
    let uploadInputRef = useRef(null);

    return (
        <div>
            <Modal size="lg" show={show} onHide={() => onHide(show)} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Assets Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="outline"
                        className="btn btn-primary my-5"
                        onClick={() => {
                            if (uploadInputRef.current) {
                                uploadInputRef.current.click();
                            }
                        }}
                    >
                        + Upload New Asset
                    </Button>

                    <Form.Control
                        type="file"
                        className="d-none"
                        ref={uploadInputRef}
                        onChange={(e) => {
                            console.log(e.currentTarget.files);
                        }}
                    ></Form.Control>

                    <Row className="" id="asset-list">
                        {uploadedImages.map((image, index) => {
                            return (
                                <Col
                                    className="position-relative mb-2"
                                    sm="12"
                                    md="6"
                                    lg="4"
                                    xl="3"
                                    key={index}
                                    style={{ height: 'fit-content' }}
                                >
                                    <div className="position-relative">
                                        <img className="position-relative" src={image} width="100%"></img>
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
                                                    onSelected(image);
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
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => onHide(show)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onSave(show)}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
}

export default UploadModal;
