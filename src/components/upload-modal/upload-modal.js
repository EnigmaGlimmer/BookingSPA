import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

function UploadModal({ onCopyLink, show, onHide, onSave, selected, onSelected }) {
    const [uploadedImages, setUploadedImages] = React.useState([
        'https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000',
        'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
    ]);

    return (
        <div>
            <Modal show={show} onHide={() => onHide(show)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Uploads Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="outline">+ Upload New Asset</Button>

                    <div className="">
                        <Row>
                            {uploadedImages.map((image, index) => {
                                return (
                                    <Col className="position-relative" key={index}>
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
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onHide(show)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onSave(show)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UploadModal;
