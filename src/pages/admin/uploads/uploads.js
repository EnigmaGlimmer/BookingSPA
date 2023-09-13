import React, { useEffect, useState } from 'react';

// UI
import { Button, Col, Row } from 'react-bootstrap';
import { UploadModal } from '../../../components';
import ReactPaginate from 'react-paginate';

// Icon
import { FaTimes } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// Store
import { deleteAsset, getAssetList } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function Uploads() {
    const [showUploadModal, setShowUploadModal] = React.useState(false);

    const dispatch = useDispatch();

    const { uploads, totalAsset } = useSelector((state) => {
        return {
            uploads: state.Upload.uploads,
            totalAsset: state.Upload.total,
            // error: state.Upload.error,
        };
    });

    const [take] = useState(10);
    const [page, setPage] = useState(1);

    const handleDelete = (id) => {
        dispatch(deleteAsset(id));
    };

    useEffect(() => {
        dispatch(getAssetList({ skip: page, take: take }));
    }, [dispatch, take, page]);

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
            <ReactPaginate
                previousLabel={<AiOutlineLeft></AiOutlineLeft>}
                nextLabel={<AiOutlineRight></AiOutlineRight>}
                pageCount={Math.ceil(totalAsset / take)}
                onPageChange={({ selected }) => {
                    setPage(selected + 1);
                }}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination-arrow-hover'}
                nextLinkClassName={'pagination-arrow-hover'}
                pageClassName="px-3"
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination-item-active'}
            ></ReactPaginate>
        </div>
    );
}

export default Uploads;
