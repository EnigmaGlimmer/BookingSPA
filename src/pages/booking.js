import React, { useState } from 'react';

// Redux store
import { useSelector } from 'react-redux';

// Custom style
import './style/booking.css';

// Bootstrap component
import { Form, Spinner } from 'react-bootstrap';

// Formik handlers
import { useFormik } from 'formik';
import * as yup from 'yup';

// React Icons
import { GoDotFill } from 'react-icons/go';
import { GrFormCheckmark } from 'react-icons/gr';

// API
import { assignBooking } from '../api';

// Helpers
import { toast } from 'react-toastify';
import moment from 'moment';
import Step1 from '../components/booking/step1';
import Step2 from '../components/booking/step2';
import Step3 from '../components/booking/step3';
import BookingCompleted from '../components/booking/completed';

let bookingSchema = yup.object().shape({
    customer: yup.object().shape({
        customerName: yup.string().required('Customer Name is required field'),
        customerPhone: yup.string().typeError('Phone Number must be number').required('Phone Number is required field'),
        customerEmail: yup.string().email().required('Email is required field'),
    }),
    booking: yup.object().shape({
        slot: yup.object().shape({
            start_Hour: yup.string().required('Start Hour is require field'),
            end_Hour: yup.string().required('End Day is require field'),
        }),
    }),
    // messenger: yup.string().required('Messenger is required field'),
});
function BookingPage() {
    document.title = 'Little Daisy - Booking your slot here';

    const [step, setStep] = React.useState(1);

    function getStepHandle(theStep) {
        if (step === theStep) {
            return <GoDotFill className="booking-dot"></GoDotFill>;
        } else if (step > theStep) {
            return <GrFormCheckmark className="booking-dot"></GrFormCheckmark>;
        }
        return null;
    }

    return (
        <div className="intro my-5">
            <StepComponent step={step} setStep={setStep}></StepComponent>
            {/* Booking Process */}
            <div className={`booking-process`}>
                <div className="booking-process-form">
                    <div className="booking-process-line"></div>
                    <div className="booking-step-form">
                        <div className="booking-step">
                            <div className="booking-step-circle">{getStepHandle(1)}</div>
                            <div className="booking-step-title">STEP 1</div>
                        </div>
                        <div className="booking-step">
                            <div className="booking-step-circle">{getStepHandle(2)}</div>
                            <div className="booking-step-title">STEP 2</div>
                        </div>
                        <div className="booking-step">
                            <div className="booking-step-circle">{getStepHandle(3)}</div>
                            <div className="booking-step-title">STEP 3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const StepComponent = ({ step, setStep }) => {
    const { newCustomer } = useSelector((state) => {
        return {
            services: state.Service.services,
            booking: state.Booking?.booking,
            newBooking: state.Booking?.new,
            customers: state.Customer.customers,
            newCustomer: state.Customer.new,
        };
    });
    const [loading, setLoading] = useState(false);

    const validation = useFormik({
        initialValues: {
            customer: {
                customerName: '',
                customerEmail: '',
                customerPhone: '',
                howtoknow: [],
            },
            booking: {
                customerId: newCustomer?.customerid,
                serviceId: 0,
                serviceName: '',
                checkinDate: moment().format('YYYY-MM-DD'),
                createdDate: new Date(),
                slot: {
                    start_Hour: '',
                    end_Hour: '',
                },
            },
            parentServiceId: 0,
        },
        validationSchema: bookingSchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);
            setLoading(true);
            assignBooking(
                {
                    customerName: values.customer.customerName,
                    customerEmail: values.customer.customerEmail,
                    customerPhone: values.customer.customerPhone,
                    howtoknow: values.customer.howtoknow,
                },
                {
                    // customerId: newCustomer.customerId,
                    createdDate: new Date(),
                    // serviceId: values.booking.serviceId,
                    serviceId: values.parentServiceId,
                    serviceName: values.booking.serviceName,
                    isCancelled: false,
                    checkinDate: values.booking.checkinDate,
                    slot: {
                        start_Hour: values.booking.slot.start_Hour,
                        end_Hour: values.booking.slot.end_Hour,
                    },
                },
            )
                .then((response) => {
                    setLoading(false);
                    if (response?.data?.isSuccess === false) {
                        response?.data?.errors?.forEach?.((msg) => {
                            toast.error(msg, {
                                autoClose: 3000,
                            });
                        });
                        return;
                    } else {
                        toast.success('Post successfully', {
                            autoClose: 3000,
                        });
                        setStep(4);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error(error);
                });
        },
    });

    const [eventDateDuration, setEventDateDuration] = useState(['10/12/2023', '24/12/2023']);

    let isBetweenDate = moment(validation.values?.booking?.checkinDate, 'YYYY-MM-DD').isBetween(
        moment(eventDateDuration[0], 'DD/MM/YYYY'),
        moment(eventDateDuration[1], 'DD/MM/YYYY'),
    );

    return (
        <Form onSubmit={validation.handleSubmit}>
            {(loading && <Spinner></Spinner>) ||
                (step === 1 && <Step1 step={step} setStep={setStep} validation={validation}></Step1>) ||
                (step === 2 && (
                    <Step2
                        className="mb-4"
                        step={step}
                        setStep={setStep}
                        valueServiceId={validation?.values?.booking?.serviceId}
                        isValid={!!validation?.values?.booking?.serviceId}
                        onChangeServiceId={(serviceId) => validation.setFieldValue('booking.serviceId', serviceId)}
                        onChangeParentServiceId={(parentServiceId) =>
                            validation.setFieldValue('parentServiceId', parentServiceId)
                        }
                        onChangeServiceName={(serviceName) =>
                            validation.setFieldValue('booking.serviceName', serviceName)
                        }
                    ></Step2>
                )) ||
                (step === 3 && (
                    <Step3
                        step={step}
                        setStep={setStep}
                        validation={validation}
                        valueCheckinDate={validation?.values?.booking?.checkinDate}
                        valueServiceId={validation?.values?.booking?.serviceId}
                        parentServiceId={validation?.values?.parentServiceId}
                        onChangeDate={(date) => {
                            const value = moment(date).format('YYYY-MM-DD');
                            validation.setFieldValue('booking.checkinDate', value);
                        }}
                        onChangeTimeStart={(time) => validation.setFieldValue('booking.slot.start_Hour', time)}
                        onChangeTimeEnd={(time) => validation.setFieldValue('booking.slot.end_Hour', time)}
                        hourMorningWorkStart={isBetweenDate ? 8 : 9}
                        minuteMorningWorkStart={isBetweenDate ? 0 : 0}
                        hourMorningWorkEnd={isBetweenDate ? 12 : 12}
                        minuteMorningWorkEnd={isBetweenDate ? 30 : 30}
                        hourAfternoonWorkStart={isBetweenDate ? 13 : 13}
                        minuteAfternoonWorkStart={isBetweenDate ? 0 : 0}
                        hourAfternoonWorkEnd={isBetweenDate ? 20 : 17}
                        minuteAfternoonWorkEnd={isBetweenDate ? 0 : 30}
                    ></Step3>
                )) ||
                (step === 4 && <BookingCompleted values={validation?.values} setStep={setStep}></BookingCompleted>)}
        </Form>
    );
};

export default BookingPage;
