import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { UploadModal } from '../../../components';

function Uploads() {
    const [uploads, setUploads] = React.useState(['']);
    const [showUploadModal, setShowUploadModal] = React.useState(false);

    return (
        <div>
            <h3>Your Assets</h3>
            <UploadModal
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                onCopyLink={() => {}}
                onSave={() => {}}
                onSelected={() => {}}
            ></UploadModal>
            <Button variant="outlet" className="btn" onClick={() => setShowUploadModal(true)}>
                Upload new assets
            </Button>
            <Row>
                {uploads.map((upload) => {
                    return (
                        <Col sm="auto">
                            <img src={upload}></img>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Uploads;
