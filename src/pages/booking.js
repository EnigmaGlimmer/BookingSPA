import React from 'react';
import introBig from '../images/introBig.png';
import introSmall from '../images/introSmall.png';
import homeFlowerDeco from '../images/home/flower.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimal } from '../store/actions';
import './style/booking.css';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { GoDotFill } from 'react-icons/go';
import { GrFormCheckmark } from 'react-icons/gr';
import Booking from '../components/booking-calendar/booking';
import * as yup from 'yup';
import { MdOutlineMailOutline } from 'react-icons/md';
import SpaceTimeFrame from '../components/booking-calendar/space-time-frame';

let bookingSchema = yup.object().shape({
    fullName: yup.string().required('Full Name is required field'),
    phoneNumber: yup.string().typeError('Phone Number must be number').required('Phone Number is required field'),
    email: yup.string().email().required('Email is required field'),
    messenger: yup.string().required('Full Address is required field'),
});
function BookingPage() {
    const dispatch = useDispatch();
    const { animals } = useSelector((state) => {
        console.log(state);
        console.log(state.Animal.name);
        return {
            animals: state.Animal.name,
        };
    });
    const [step, setStep] = React.useState(1);
    function getStepHandle(theStep) {
        if (step === theStep) {
            return <GoDotFill className="booking-dot"></GoDotFill>;
        } else if (step > theStep) {
            return <GrFormCheckmark className="booking-dot"></GrFormCheckmark>;
        } else {
            return <></>;
        }
    }
    function getComponentHandle(theStep) {
        if (step === 1) {
            return <Step1></Step1>;
        } else if (step === 2) {
            return <Step2></Step2>;
        } else if (step === 3) {
            return <Step3></Step3>;
        } else if (step === 4) {
            return <BookingCompleted></BookingCompleted>;
        }
    }
    document.title = 'Little Daisy - Booking';
    return (
        <Formik
            initialValues={{
                fullName: '',
                email: '',
                phoneNumber: '',
                messenger: '',
            }}
            validationSchema={bookingSchema}
        >
            {({ values, touched, errors, isValid, setFieldValue, handleSubmit, handleChange, handleBlur }) => {
                return (
                    <div className="intro my-5">
                        <pre>{JSON.stringify(animals, 4, 4)}</pre>
                        <form onSubmit={handleSubmit}>
                            <BookingCompleted></BookingCompleted>
                        </form>
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
                                <button onClick={() => dispatch(getAnimal())}>Get Animal</button>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export function Step1(
    // handleSubmit,touched,errors,handleChange,handleBlur,
    setStep,
    step,
) {
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

                <div
                    className="intro-content-form"
                    // onSubmit={handleSubmit}
                >
                    <div>
                        <h2 className="intro-title">Your Information</h2>
                    </div>
                    <div className="booking-form-input">
                        <Form.Group>
                            <input
                                type="text"
                                name="fullName"
                                className="booking-input"
                                placeholder="Full Name"
                                // isInvalid={touched.fullName && errors.fullName}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{/* {errors?.fullName} */}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <input
                                type="text"
                                name="phoneNumber"
                                className="booking-input"
                                placeholder="Phone Number"
                                // isInvalid={touched.phoneNumber && errors.phoneNumber}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{/* {errors.phoneNumber} */}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <input
                                type="text"
                                name="email"
                                className="booking-input"
                                placeholder="Email"
                                // isInvalid={touched.email && errors.email}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{/* {errors.email} */}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div style={{ paddingTop: '30px' }}>
                        <input
                            type="text"
                            name="messenger"
                            className="booking-input"
                            placeholder="Messenger"
                            // isInvalid={touched.messenger && errors.messenger}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{/* {errors.messenger} */}</Form.Control.Feedback>
                    </div>
                    <div>
                        <Button
                            type="button"
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5"
                            // onClick={()=>setStep(e => ++e)}
                        >
                            Next
                        </Button>
                        {step > 1 ? (
                            <Button
                                type="button"
                                variant="outline"
                                className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5  mx-4"
                                onClick={() => setStep((e) => --e)}
                            >
                                Back
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
            </div>
        </div>
    );
}
function Step3() {
    return (
        <div>
            <div className="booking-component">
                <div>
                    <Booking onChangeDate={(date) => {}}></Booking>
                </div>
                {/* <div className='booking-component-time'>
                    <SpaceTimeFrame></SpaceTimeFrame>
                </div> */}
            </div>
            <div className="booking-component-button-done">
                <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">Done</button>
            </div>
        </div>
    );
}
function Step2(setStep, step) {
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
                    <div className="booking-form-input">
                        <Button
                            type="button"
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5"
                            onClick={() => setStep((e) => ++e)}
                        >
                            Nails
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5"
                            onClick={() => setStep((e) => ++e)}
                        >
                            Lashes
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="button"
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5"
                            onClick={() => setStep((e) => ++e)}
                        >
                            Next
                        </Button>
                        {step > 1 ? (
                            <Button
                                type="button"
                                variant="outline"
                                className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5  mx-4"
                                onClick={() => setStep((e) => --e)}
                            >
                                Back
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
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
