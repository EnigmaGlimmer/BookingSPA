import React, { useEffect } from 'react';

// UI
import { Button, Col, Row } from 'react-bootstrap';

// Store
import { UploadModal } from '../../../components';
import { deleteAsset, getAssetList } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

function Uploads() {
    const [showUploadModal, setShowUploadModal] = React.useState(false);

    const dispatch = useDispatch();

    const { uploads, error } = useSelector((state) => {
        return {
            uploads: state.Upload.uploads,
            error: state.Upload.error,
        };
    });

    useEffect(() => {
        dispatch(getAssetList());
    }, [dispatch]);
    const handleDelete = (id) => {
        dispatch(deleteAsset(id));
    };
    return (
        <div>
            <article className="my-3">
                <h3 className="d-inline">Your Assets</h3>
                <Button variant="outlet" className="btn ms-auto mb-2" onClick={() => setShowUploadModal(true)}>
                    Upload new assets
                </Button>
            </article>
            <UploadModal
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                onCopyLink={() => {}}
                onSave={() => {}}
                onSelected={() => {}}
            ></UploadModal>
            <Row>
                {(uploads || [])?.map((upload, id) => {
                    return (
                        <Col xs="12" sm="6" md="4" lg="3" xxl="2" key={id} className="mb-2">
                            <FaTimes
                                onClick={() => handleDelete(upload?.assetId)}
                                style={{ cursor: 'pointer' }}
                            ></FaTimes>
                            <img src={upload?.assetLink} alt={'assets' + id} style={{ cursor: 'pointer' }}></img>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Uploads;
