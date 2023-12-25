import { FieldArray } from 'formik';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';

import { FaCheck } from 'react-icons/fa6';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FaTimes } from 'react-icons/fa';
import useModalContext from 'hooks/useModalContext';
import { deleteWorkingHour } from 'api';
import { toast } from 'react-toastify';

function StepThree({ validation, updateMode }) {
    const { values, setFieldValue } = validation;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shifts = [
        {
            label: 'Full time',
            value: {
                start: '8:30',
                end: '17:30',
            },
        },
        {
            label: 'Shift 1',
            value: {
                start: '8:30',
                end: '12:30',
            },
        },
        {
            label: 'Shift 2',
            value: {
                start: '12:30',
                end: '17:30',
            },
        },
    ];
    const [selectedWorkingHourIndex, setSelectedWorkingHourIndex] = React.useState(0);
    const { openDialog, closeDialog } = useModalContext();

    function afterDeleteWorkingHour(id, identity) {
        function handleAfterDeleteOnUI(id) {
            if (values.workingHours.length <= 1) {
                setSelectedWorkingHourIndex(null);
            }
            if (id === selectedWorkingHourIndex) {
                setSelectedWorkingHourIndex(id - 1 < 0 ? id + 1 : id - 1);
            }
        }

        if (updateMode) {
            deleteWorkingHour(identity)
                .then(() => {
                    toast.success('Removed working hour');
                    handleAfterDeleteOnUI(id);
                    closeDialog();
                })
                .catch(() => {
                    toast.error('Removed Failed');
                });
        } else {
            handleAfterDeleteOnUI(id);
        }
    }

    return (
        <>
            <Row className="mb-3 gap-2 ">
                <FieldArray name="workingHours">
                    {(arrayHelpers) => {
                        return (
                            <>
                                {values.workingHours.map((workingHour, index) => {
                                    return (
                                        <Col
                                            key={index + 1}
                                            onClick={() => setSelectedWorkingHourIndex(index)}
                                            className="text-center d-flex"
                                            style={{
                                                border: '1px solid #010101',
                                                minWidth: '120px',
                                                maxWidth: '160px',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <div className="flex-grow-1">
                                                <p className="mb-1">
                                                    {workingHour.start} - {workingHour.end}
                                                </p>
                                                {index === selectedWorkingHourIndex && <FaCheck></FaCheck>}
                                            </div>
                                            <div
                                                onClick={() => {
                                                    if (updateMode) {
                                                        openDialog({
                                                            body: <p>Do you want to delete this</p>,
                                                            title: 'Delete Confirmation',
                                                            dialogProps: {
                                                                onClickDialogSuccess: () => {
                                                                    arrayHelpers.remove(index);
                                                                    console.log(workingHour);
                                                                    afterDeleteWorkingHour(index, workingHour.id);
                                                                },
                                                            },
                                                        });
                                                    } else {
                                                        arrayHelpers.remove(index);
                                                        afterDeleteWorkingHour(index);
                                                    }
                                                }}
                                            >
                                                <FaTimes></FaTimes>
                                            </div>
                                        </Col>
                                    );
                                })}
                                <Col>
                                    <Button
                                        className="btn-primary-outline mb-3"
                                        variant="outline"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                start: '8:00',
                                                end: '17:30',
                                                daysOfWeek: [],
                                            })
                                        }
                                    >
                                        + Add
                                    </Button>
                                </Col>
                            </>
                        );
                    }}
                </FieldArray>
            </Row>

            <Form.Group className="form-staff__input-group">
                <Row>
                    <Col>
                        <Form.Group className="row">
                            <Form.Label as={Col} xs="auto">
                                Shift
                            </Form.Label>
                            <Col>
                                <Form.Select
                                    aria-label="Default select shift"
                                    onChange={(e) => {
                                        setFieldValue(`workingHours.[${selectedWorkingHourIndex}]`, {
                                            ...values.workingHours[selectedWorkingHourIndex],
                                            ...shifts[e.currentTarget.value].value,
                                        });
                                    }}
                                >
                                    {shifts.map((shift, id) => {
                                        return <option value={id}>{shift.label}</option>;
                                    })}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3 row">
                            <Form.Label as={Col} sm="2" lg="1" className="me-2">
                                Start
                            </Form.Label>
                            <Col>
                                <TimePicker
                                    value={dayjs(values.workingHours?.[selectedWorkingHourIndex]?.start, 'HH:mm')}
                                    format={'HH:mm'}
                                    minuteStep={15}
                                    onChange={(_, timeStr) => {
                                        setFieldValue(`workingHours.[${selectedWorkingHourIndex}].start`, timeStr);
                                    }}
                                ></TimePicker>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                            <Form.Label as={Col} sm="2" lg="1" className="me-2">
                                End
                            </Form.Label>
                            <Col>
                                <TimePicker
                                    value={dayjs(values.workingHours?.[selectedWorkingHourIndex]?.end, 'HH:mm')}
                                    format={'HH:mm'}
                                    minuteStep={15}
                                    onChange={(_, timeStr) => {
                                        setFieldValue(`workingHours.[${selectedWorkingHourIndex}].end`, timeStr);
                                    }}
                                ></TimePicker>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3 row">
                    <Form.Label as={Col} sm="2" lg="1">
                        Days Of Week
                    </Form.Label>
                    <Col>
                        <MultiSelect
                            value={(values.workingHours?.[selectedWorkingHourIndex]?.daysOfWeek || []).map((day) => ({
                                label: daysOfWeek[day],
                                value: day,
                            }))}
                            hasSelectAll={false}
                            options={daysOfWeek?.map?.((day, id) => ({
                                label: day,
                                value: id,
                                disabled: values.workingHours.some(
                                    ({ daysOfWeek }, index) =>
                                        selectedWorkingHourIndex !== index && daysOfWeek.includes(id),
                                ),
                            }))}
                            onChange={(options) => {
                                setFieldValue(
                                    `workingHours.[${selectedWorkingHourIndex}].daysOfWeek`,
                                    options.map((v) => v.value),
                                );
                            }}
                        ></MultiSelect>
                    </Col>
                </Form.Group>
            </Form.Group>
        </>
    );
}

export default StepThree;
