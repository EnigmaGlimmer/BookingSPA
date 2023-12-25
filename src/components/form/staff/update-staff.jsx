import { FormikContext, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import StepThree from './step-three';
import StepTwo from './step-two';
import StepFour from './step-four';
import MultiStep from 'react-multistep';
import StepOne from './step-one';
import { updateStaff, updateWorkingHoursFromStaff } from 'api';
import { toast } from 'react-toastify';
import { addWorkingHours } from 'api';

function UpdateStaffForm({ userId, staffAccount, staffProfile, workingHours }) {
    const validation = useFormik({
        initialValues: {
            userId: userId,
            username: staffAccount.username,
            email: staffAccount.email,
            password: '123@123Aa',
            fullName: staffAccount.fullName,
            address: staffAccount.address,

            age: staffProfile.age,
            experience: staffProfile.experience,
            field: staffProfile.field,
            serviceIds: staffProfile.serviceIds,
            avatar: staffProfile.avatar,

            workingHours: workingHours,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const { workingHours, serviceIds, ...accountInfo } = values;

            updateStaff(values.userId, { ...accountInfo, services: serviceIds })
                .then(() => {
                    toast.success('Update Staff Success');

                    var newWorkingHours = workingHours?.filter?.((wh) => !wh?.id);
                    var updateWorkingHours = workingHours?.filter?.((wh) => wh?.id);

                    var tasks = [];

                    if (newWorkingHours) {
                        tasks.push(
                            addWorkingHours({
                                newWorkingHours: newWorkingHours.map((nWh) => ({ ...nWh, userId })),
                            })
                                .then(() => {
                                    toast.success('Added working hours Success');
                                })
                                .catch(() => {
                                    toast.error('Add Staff Working Hours Failed');
                                }),
                        );
                    }

                    if (updateWorkingHours && updateWorkingHours.length > 0) {
                        tasks.push(
                            updateWorkingHoursFromStaff({
                                userId: values.userId,
                                updateWorkingHours: workingHours.map((h) => ({ ...h, userId: userId })),
                            })
                                .then(() => {
                                    toast.success('Updated working hours Success');
                                })
                                .catch(() => {
                                    toast.error('Update Staff Working Hours Failed');
                                }),
                        );
                    }

                    return Promise.all(tasks);
                })
                .catch(() => {
                    toast.error('Update Staff Failed');
                });
        },
    });
    return (
        <FormikProvider value={validation}>
            <h2>Form of Staff Updates</h2>
            <Form onSubmit={validation.handleSubmit} className="mb-3">
                <MultiStep activeStep={0} prevButton={<Button className="mb-3">Prev</Button>}>
                    <StepOne title="Account" validation={validation} />
                    <StepTwo title="Profile" validation={validation} />
                    <StepThree title="Working Hours" validation={validation} updateMode={true}></StepThree>
                    <StepFour title="Completed"></StepFour>
                </MultiStep>
            </Form>
            {/* <pre>{JSON.stringify(validation.values, 4, 4)}</pre> */}
        </FormikProvider>
    );
}

export default UpdateStaffForm;
