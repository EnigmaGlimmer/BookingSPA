import React from 'react';
import introBig from '../images/introBig.png';
import introSmall from '../images/introSmall.png';
import homeFlowerDeco from '../images/home/flower.svg';
import { useDispatch, useSelector } from 'react-redux';
import './style/booking.css';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { GoDotFill } from 'react-icons/go';
import { GrFormCheckmark } from 'react-icons/gr';
import Booking from '../components/booking-calendar/booking';
import * as yup from 'yup';
import { MdOutlineMailOutline } from 'react-icons/md';

import { assignBooking, postCustomer } from '../api';
import { getService } from '../store/service/action';

import { postBooking } from '../store/booking/action';
import { toast } from 'react-toastify';

let bookingSchema = yup.object().shape({
    customer: yup.object().shape({
        customerName: yup.string().required('Customer Name is required field'),
        customerPhone: yup.string().typeError('Phone Number must be number').required('Phone Number is required field'),
        customerEmail: yup.string().email().required('Email is required field'),
    }),
    booking: yup.object().shape({
        start_Hour: yup.string().required('Start Hour is require field'),
        end_Hour: yup.string().required('End Day is require field'),
    }),

    // messenger: yup.string().required('Messenger is required field'),
});
function BookingPage() {
    document.title = 'Little Daisy - Booking';

    const [step, setStep] = React.useState(2);

    function getStepHandle(theStep) {
        if (step === theStep) {
            return <GoDotFill className="booking-dot"></GoDotFill>;
        } else if (step > theStep) {
            return <GrFormCheckmark className="booking-dot"></GrFormCheckmark>;
        }
        return <></>;
    }
    return (
        <div className="intro my-5">
            <StepComponent step={step} setStep={setStep}></StepComponent>
            {/* Booking Process */}
            <div className="booking-process">
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
    const [serviceChoice, setServiceChoice] = React.useState(null);

    const { services, booking, newBooking, customers, newCustomer } = useSelector((state) => {
        return {
            services: state.Service.services,
            booking: state.Booking?.booking,
            newBooking: state.Booking?.new,
            customers: state.Customer.customers,
            newCustomer: state.Customer.new,
        };
    });

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getService());
    }, []);

    const validation = useFormik({
        initialValues: {
            customer: {
                customerName: '',
                customerEmail: '',
                customerPhone: '',
            },
            booking: {
                customerId: newCustomer?.customerid,
                serviceId: 0,
                checkinDate: new Date(),
                createdDate: new Date(),
                slot: {
                    start_Hour: '',
                    end_Hour: '',
                },
            },
        },
        validationSchema: bookingSchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);
            if (step === 1) {
                setStep(2);
            }

            dispatch(
                postCustomer({
                    customerName: values.customer.customerName,
                    customerEmail: values.customer.customerEmail,
                    customerPhone: values.customer.customerPhone,
                }),
            );

            dispatch(
                postBooking({
                    customerId: newCustomer.customerId,
                    createdDate: new Date(),
                    serviceId: values.booking.serviceId,
                    slot: {
                        start_Hour: values.booking.slot.start_Hour,
                        end_Hour: values.booking.slot.end_Hour,
                    },
                }),
            );

            assignBooking(
                {
                    customerName: values.customer.customerName,
                    customerEmail: values.customer.customerEmail,
                    customerPhone: values.customer.customerPhone,
                },
                {
                    customerId: newCustomer.customerId,
                    createdDate: new Date(),
                    serviceId: values.booking.serviceId,
                    slot: {
                        start_Hour: values.booking.slot.start_Hour,
                        end_Hour: values.booking.slot.end_Hour,
                    },
                },
            )
                .then((response) => {
                    console.log(response);
                    toast.success('Post successfully');
                })
                .catch((error) => {
                    toast.error(error);
                });
        },
    });

    return (
        <>
            <pre>{JSON.stringify(validation.values, 4, 4)}</pre>
            {(step === 1 && <Step1 step={step} setStep={setStep} validation={validation}></Step1>) ||
                (step === 2 && (
                    <Step2
                        step={step}
                        setStep={setStep}
                        validation={validation}
                        serviceChoice={serviceChoice}
                        setServiceChoice={setServiceChoice}
                        services={services}
                    ></Step2>
                )) ||
                (step === 3 && (
                    <Step3
                        step={step}
                        setStep={setStep}
                        validation={validation}
                        onChangeDate={(date) => {
                            validation.setFieldValue('booking.checkinDate', date);
                        }}
                        onChangeTimeStart={(time) => validation.setFieldValue('booking.slot.start_Hour', time)}
                        onChangeTimeEnd={(time) => validation.setFieldValue('booking.slot.end_Hour', time)}
                    ></Step3>
                )) || <BookingCompleted></BookingCompleted>}
        </>
    );
};

export function Step1({ setStep, validation }) {
    return (
        <form className="intro-form" onSubmit={validation?.handleSubmit}>
            <div className="intro-img">
                <div className="intro-img-form">
                    <div className="intro-img-big">
                        <img alt="intro" src={introBig} width={'100%'} />
                    </div>
                    <div className="intro-img-small">
                        <img alt="intro" src={introSmall} width={'100%'} />
                    </div>
                </div>
            </div>
            <div className="intro-content">
                <div className="intro-img-flower-top">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>

                <div className="intro-content-form">
                    <div>
                        <h2 className="intro-title">Your Information</h2>
                    </div>
                    <div className="booking-form-input">
                        <Form.Group>
                            <input
                                type="text"
                                name="customer.customerName"
                                className="booking-input"
                                placeholder="Full Name"
                                onChange={validation?.handleChange}
                                onBlur={validation?.handleBlur}
                            />
                            {validation?.touched.customer.customerName && validation?.errors.customer.customerName ? (
                                <div className="feedback-invalid">{validation.errors?.customer.customerName}</div>
                            ) : (
                                <></>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <input
                                type="text"
                                name="customerPhone"
                                className="booking-input"
                                placeholder="Phone Number"
                                onChange={validation?.handleChange}
                                onBlur={validation?.handleBlur}
                            />
                            {validation?.touched.customer.customerPhone && validation?.errors.customer.customerPhone ? (
                                <div className="feedback-invalid">{validation.errors?.customer.customerPhone}</div>
                            ) : (
                                <></>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <input
                                type="text"
                                name="customer.customerEmail"
                                className="booking-input"
                                placeholder="Email"
                                onChange={validation?.handleChange}
                                onBlur={validation?.handleBlur}
                            />
                            {validation?.touched.customer.customerEmail && validation?.errors.customer.customerEmail ? (
                                <div className="feedback-invalid">{validation.errors?.customer.customerEmail}</div>
                            ) : (
                                <></>
                            )}
                        </Form.Group>
                    </div>
                    <div style={{ paddingTop: '30px' }}>
                        <input
                            type="text"
                            name="messenger"
                            className="booking-input"
                            placeholder="Messenger"
                            onChange={validation?.handleChange}
                            onBlur={validation?.handleBlur}
                        />
                        {validation?.touched.messenger && validation?.errors.messenger ? (
                            <div className="feedback-invalid">{validation.errors?.messenger}</div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5"
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
            </div>
        </form>
    );
}
function Step2({ setStep, validation, serviceChoice, setServiceChoice }) {
    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });

    return (
        <div className="intro-form">
            <div className="intro-img">
                <div className="intro-img-form">
                    <div className="intro-img-big">
                        <img alt="intro" src={introBig} width={'100%'} />
                    </div>
                    <div className="intro-img-small">
                        <img alt="intro" src={introSmall} width={'100%'} />
                    </div>
                </div>
            </div>
            <div className="intro-content">
                <div className="intro-img-flower-top">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
                <div className="intro-content-form">
                    <div>
                        <h2 className="intro-title">Your Information</h2>
                    </div>
                    <div className="booking-input-item">
                        <div className="booking-form-input">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setServiceChoice(true);
                                }}
                                id="booking-nails-service"
                                className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                            >
                                Nail
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setServiceChoice(false);
                                }}
                                id="booking-nails-service"
                                className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                            >
                                Lashes
                            </Button>
                        </div>

                        <div className="booking-list-item">
                            {serviceChoice
                                ? services
                                      ?.find((service) => service.serviceName === 'Nail')
                                      ?.childs?.map((item, index) => {
                                          return (
                                              <div
                                                  className="booking-item-form"
                                                  key={index}
                                                  onClick={() => {
                                                      setStep(3);
                                                      validation.setFieldValue('booking.serviceId', item?.serviceId);
                                                  }}
                                              >
                                                  <div className="booking-item-title">{item?.serviceName}</div>
                                                  <div className="booking-item-price">{item?.price}$</div>
                                              </div>
                                          );
                                      })
                                : services
                                      ?.find((service) => service.serviceName === 'Lash')
                                      ?.childs?.map((item, index) => {
                                          return (
                                              <div
                                                  className="booking-item-form"
                                                  key={index}
                                                  onClick={() => {
                                                      setStep(3);
                                                      validation.setFieldValue('booking.serviceId', item?.serviceId);
                                                  }}
                                              >
                                                  <div className="booking-item-title">{item?.serviceName}</div>
                                                  <div className="booking-item-price">{item?.price}$</div>
                                              </div>
                                          );
                                      })}
                        </div>
                    </div>
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
            </div>
        </div>
    );
}
function Step3({ step, setStep, validation, onChangeDate, onChangeTimeStart, onChangeTimeEnd }) {
    return (
        <div>
            <div className="booking-component">
                <div>
                    <Booking
                        activeDate={validation.values.booking.checkinDate}
                        initialTimeRange={[
                            ['8:30', '9:30'],
                            ['9:30', '10:30'],
                            ['10:30', '11:30'],
                            ['11:30', '12:30'],
                            ['13:30', '14:30'],
                            ['14:30', '15:30'],
                            ['15:30', '16:30'],
                            ['16:30', '17:30'],
                            ['17:30', '18:30'],
                        ]}
                        onChangeDate={onChangeDate}
                        onChangeTimeStart={onChangeTimeStart}
                        onChangeTimeEnd={onChangeTimeEnd}
                    ></Booking>
                </div>
            </div>
            <div className="booking-component-button-done">
                <button className="my-btn text-uppercase px-5  btn-primary-outline btn btn-outline">Done</button>
                <Button
                    type="button"
                    variant="outline"
                    className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5  mx-4"
                    onClick={() => setStep(2)}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}
function BookingCompleted() {
    return (
        <div className="completed">
            <h1 className="completed-title">Great and Thanks a lot!</h1>
            <p className="completed-content">
                You have successfully booked the service of Little Daisy. Here is your bill. Our staff will contact you
                shortly!
            </p>
            <div className="completed-form">
                <div className="completed-item-form">
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">Nails Services</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">Nails Services</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">Nails Services</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">Nails Services</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">Nails Services</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">Nails Services</div>
                    </div>
                </div>
                <div className="completed-mess">
                    <span>
                        <MdOutlineMailOutline></MdOutlineMailOutline>
                    </span>
                    <div className="completed-mess-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna.
                    </div>
                </div>
                <span className="completed-total-fee">
                    <span className="completed-total-fee-title">Your service has a price</span>
                    <span className="completed-total-price">18$</span>
                </span>
            </div>
        </div>
    );
}
export default BookingPage;
