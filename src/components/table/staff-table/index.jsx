import UpdateStaffForm from 'components/form/staff/update-staff';
import useModalContext from 'hooks/useModalContext';
import usePrefetchContext from 'hooks/usePrefetchContext';
import moment from 'moment';
import React from 'react';
import { Button, Col, Image, Table } from 'react-bootstrap';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function StaffTable({ data }) {
    const { openModal } = useModalContext();
    const { services } = usePrefetchContext();
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Working hours</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Age</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((s, index) => {
                    const {
                        age,
                        avatar,
                        createdAt,
                        fullName,
                        email,
                        address,
                        experience,
                        field,
                        username,
                        workingHours,
                        services: serviceIds,
                        id,
                    } = s;

                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                <div className="row flex-nowrap">
                                    <Col>
                                        <Button
                                            onClick={() => {
                                                openModal({
                                                    bodyComponent: (
                                                        <div className="text-center m-auto" style={{ width: '220px' }}>
                                                            <Image src={avatar} alt={fullName}></Image>
                                                        </div>
                                                    ),
                                                    modalProps: {
                                                        size: 'sm',
                                                    },
                                                });
                                            }}
                                        >
                                            View Profile Avatar
                                        </Button>
                                    </Col>
                                    <Col>{fullName}</Col>
                                </div>
                            </td>
                            <td>{email}</td>
                            <td>{username}</td>
                            <td className="text-nowrap">
                                {workingHours.map(({ daysOfWeek, start, end }) => {
                                    const daysOfWeekRow = daysOfWeek.split(' ,');
                                    return (
                                        <>
                                            {daysOfWeekRow.map((day) => {
                                                return (
                                                    <>
                                                        <p className="row flex-nowrap">
                                                            <Col>{day}:</Col>
                                                            <Col>
                                                                {start} - {end}
                                                            </Col>
                                                        </p>
                                                        <br></br>
                                                    </>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </td>
                            <td>
                                <ul>
                                    {services
                                        .filter((s) => serviceIds.includes(s.serviceId))
                                        .map((s) => (
                                            <li key={s.serviceId}>{s.serviceName}</li>
                                        ))}
                                </ul>
                            </td>
                            <td>{experience}</td>
                            <td>{age}</td>
                            <td>{moment(createdAt).format('DD MM YYYY')}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        openModal({
                                            bodyComponent: (
                                                <UpdateStaffForm
                                                    userId={id}
                                                    staffAccount={{
                                                        username,
                                                        email,
                                                        fullName,
                                                        address,
                                                    }}
                                                    staffProfile={{
                                                        age,
                                                        experience,
                                                        field,
                                                        serviceIds,
                                                        avatar,
                                                    }}
                                                    workingHours={workingHours.map((wh) => ({
                                                        ...wh,
                                                        start: moment(wh.start, 'HH:mm:ss').format('HH:mm'),
                                                        end: moment(wh.end, 'HH:mm:ss').format('HH:mm'),
                                                        daysOfWeek: wh.daysOfWeek
                                                            .split(' ,')
                                                            .map((day) => daysOfWeek.indexOf(day)),
                                                    }))}
                                                ></UpdateStaffForm>
                                            ),
                                        });
                                    }}
                                >
                                    Update
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default StaffTable;
