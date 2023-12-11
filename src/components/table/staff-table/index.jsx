import useModalContext from 'hooks/useModalContext';
import moment from 'moment';
import React from 'react';
import { Button, Col, Image, Table } from 'react-bootstrap';

function StaffTable({ data }) {
    const { openModal } = useModalContext();

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
                </tr>
            </thead>
            <tbody>
                {data.map((s, index) => {
                    const { age, avatar, createdAt, fullName, email, experience, field, username, workingHours } = s;

                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td className="row flex-nowrap">
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
                            </td>
                            <td>{email}</td>
                            <td>{username}</td>
                            <td className="text-nowrap">
                                {workingHours.map(({ daysOfWeek, start, end }) => {
                                    return (
                                        <>
                                            <p className="row">
                                                <Col>{daysOfWeek}:</Col>
                                                <Col>
                                                    {start} - {end}
                                                </Col>
                                            </p>
                                            <br></br>
                                        </>
                                    );
                                })}
                            </td>
                            <td>{field}</td>
                            <td>{experience}</td>
                            <td>{age}</td>
                            <td>{moment(createdAt).format('DD MM YYYY')}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default StaffTable;
