import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteService } from 'api';

import { deleteService } from 'store/service/action';
import UpdateService from 'components/form/service/update-service';
import useModalContext from 'hooks/useModalContext';

// const BlockServiceForm = React.lazy(() => import('components/form/service/block-service'));

import BlockServiceForm from 'components/form/service/block-service.jsx';

function ServiceListTable() {
    const [updateModal, setUpdateModal] = React.useState({
        show: false,
        activeIndex: null,
    });
    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });

    const dispatch = useDispatch();

    const handleDeleteService = (id) => {
        dispatch(deleteService(id));
    };

    const { openModal } = useModalContext();

    return (
        <>
            <h3>System Services</h3>
            <Table striped bordered hover size="sm" style={{ borderColor: 'var(--clr-border)' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service name</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Dependency</th>
                        <th style={{ maxWidth: '60px' }}>Description</th>
                        <th>Blocked</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(services || []).map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item?.serviceId}</td>
                                <td>{item?.serviceName}</td>
                                <td>{item?.price}$</td>
                                <td>{item?.duration}</td>
                                <td>{(services || [])?.find?.((e) => e.serviceId === item?.parentId)?.serviceName}</td>
                                <td title={item?.description}>
                                    {item?.description?.substring(0, 120)}
                                    {item?.description?.length > 120 && '...'}
                                </td>
                                <td>{item?.isBlocked ? 'True' : 'False'}</td>
                                <td>
                                    <Button
                                        variant="outline"
                                        className="btn-primary-outline m-2"
                                        onClick={() => {
                                            handleDeleteService(item?.serviceId);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="btn-primary-outline m-2"
                                        onClick={() =>
                                            setUpdateModal({
                                                show: true,
                                                activeIndex: item?.serviceId,
                                            })
                                        }
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="btn-primary-outline m-2"
                                        onClick={() => {
                                            openModal({
                                                bodyComponent: (
                                                    <>
                                                        <BlockServiceForm></BlockServiceForm>
                                                    </>
                                                ),
                                            });
                                        }}
                                    >
                                        Not available
                                    </Button>
                                    {/* <Button variant="outline" className="btn-primary-outline m-2">
                                        View post
                                    </Button> */}
                                </td>
                                <UpdateService
                                    show={updateModal.show && updateModal?.activeIndex === item?.serviceId}
                                    serviceId={item?.serviceId}
                                    onHide={() =>
                                        setUpdateModal({
                                            show: false,
                                            activeIndex: null,
                                        })
                                    }
                                ></UpdateService>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default ServiceListTable;
