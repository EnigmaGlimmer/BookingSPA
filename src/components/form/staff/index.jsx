import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import MultiStep from 'react-multistep';
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';
import './style.css';
import { registerNewStaff } from 'api/auth';
import { toast } from 'react-toastify';
import { addWorkingHour } from 'api';
import StepFour from './step-four';

function StaffForm({ onAfterSubmitting }) {
    const validation = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '123@123Aa',
            fullName: '',
            address: '',

            age: 18,
            experience: 0,
            field: 'Nail',
            services: [],
            avatar: '',

            workingHours: [
                {
                    start: '8:30',
                    end: '17:00',
                    daysOfWeek: [],
                },
            ],
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const { workingHours, ...accountInfo } = values;

            registerNewStaff({ ...accountInfo, serviceIds: accountInfo.serviceIds })
                .then((response) => {
                    toast.success('Registered new staff account successfully!');

                    if (workingHours.length > 0) {
                        return Promise.all([
                            ...workingHours.map((workingHour) => addWorkingHour({ ...workingHour, userId: response })),
                        ]).catch((err) => {
                            toast.error('Add Working Hours Failed');
                        });
                    }
                    onAfterSubmitting(response);
                    return;
                })
                .then(() => {
                    toast.success('Added Working Hours Successfully');
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Register Failed');
                });
        },
    });

    return (
        <FormikProvider value={validation}>
            <Form onSubmit={validation.handleSubmit} className="mb-3">
                <MultiStep activeStep={0} prevButton={<Button className="mb-3">Prev</Button>}>
                    <StepOne title="Account" validation={validation} />
                    <StepTwo title="Profile" validation={validation} />
                    <StepThree title="Working Hours" validation={validation}></StepThree>
                    <StepFour title="Completed"></StepFour>
                </MultiStep>
            </Form>
        </FormikProvider>
    );
}

export default StaffForm;
