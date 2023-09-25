import React, { useEffect, useState } from 'react';

// Assets
import introBig from '../images/introBig.png';
import introSmall from '../images/introSmall.png';
import homeFlowerDeco from '../images/home/flower.svg';
import singleFlower from '../images/singleFlower.svg';

// Redux store
import { useDispatch, useSelector } from 'react-redux';
import { getService } from '../store/service/action';

// Custom style
import './style/booking.css';

// Bootstrap component
import { Button, Col, Form, Row } from 'react-bootstrap';
// Component
import Booking from '../components/booking-calendar/booking';

// Formik handlers
import { useFormik } from 'formik';
import * as yup from 'yup';

// React Icons
import { GoDotFill } from 'react-icons/go';
import { GrFormCheckmark } from 'react-icons/gr';
import { MdOutlineMailOutline } from 'react-icons/md';

// API
import { assignBooking, getBookingList } from '../api';

// Helpers
import { toast } from 'react-toastify';
import moment from 'moment';
import useService from '../hooks/useServices';
import { Link } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

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
        return <></>;
    }
    return (
        <div className="intro my-5">
            <StepComponent step={step} setStep={setStep}></StepComponent>
            {/* Booking Process */}
            <div className={`booking-process ${step === 3 ? 'my-4' : ''}`}>
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
                checkinDate: '',
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

            assignBooking(
                {
                    customerName: values.customer.customerName,
                    customerEmail: values.customer.customerEmail,
                    customerPhone: values.customer.customerPhone,
                },
                {
                    // customerId: newCustomer.customerId,
                    createdDate: new Date(),
                    serviceId: values.booking.serviceId,
                    isCancelled: false,
                    checkinDate: values.booking.checkinDate,
                    slot: {
                        start_Hour: values.booking.slot.start_Hour,
                        end_Hour: values.booking.slot.end_Hour,
                    },
                },
            )
                .then((response) => {
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
                    toast.error(error);
                });
        },
    });

    return (
        <Form onSubmit={validation.handleSubmit}>
            {(step === 1 && <Step1 step={step} setStep={setStep} validation={validation}></Step1>) ||
                (step === 2 && (
                    <Step2
                        step={step}
                        setStep={setStep}
                        valueServiceId={validation?.values?.booking?.serviceId}
                        isValid={!!validation?.values?.booking?.serviceId}
                        onChangeServiceId={(serviceId) => validation.setFieldValue('booking.serviceId', serviceId)}
                        onChangeParentServiceId={(parentServiceId) =>
                            validation.setFieldValue('parentServiceId', parentServiceId)
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
                    ></Step3>
                )) ||
                (step === 4 && <BookingCompleted values={validation?.values}></BookingCompleted>)}
        </Form>
    );
};

export function Step1({ setStep, validation }) {
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

                <div className="intro-content-form mb-2">
                    <div>
                        <h2 className="intro-title">Your Booking</h2>
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
                            {validation?.touched?.customer?.customerName &&
                                validation?.errors?.customer?.customerName && (
                                    <div className="feedback-invalid">{validation?.errors?.customer?.customerName}</div>
                                )}
                        </Form.Group>
                        <Form.Group>
                            <input
                                type="text"
                                name="customer.customerPhone"
                                className="booking-input"
                                placeholder="Phone Number"
                                onChange={validation?.handleChange}
                                onBlur={validation?.handleBlur}
                            />
                            {validation?.touched?.customer?.customerPhone &&
                                validation?.errors?.customer?.customerPhone && (
                                    <div className="feedback-invalid">
                                        {validation?.errors?.customer?.customerPhone}
                                    </div>
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
                            {validation?.touched?.customer?.customerEmail &&
                                validation?.errors?.customer?.customerEmail && (
                                    <div className="feedback-invalid">
                                        {validation?.errors?.customer?.customerEmail}
                                    </div>
                                )}
                        </Form.Group>
                    </div>
                    {/* <div style={{ paddingTop: '30px' }}>
                        <input
                            type="text"
                            name="messenger"
                            className="booking-input"
                            placeholder="Messenger"
                            onChange={validation?.handleChange}
                            onBlur={validation?.handleBlur}
                        />
                        {validation?.touched.messenger && validation?.errors.messenger && (
                            <div className="feedback-invalid">{validation.errors?.messenger}</div>
                        )}
                    </div> */}
                    <div>
                        <Button
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5"
                            onClick={() => {
                                const allowNext =
                                    !!validation?.values?.customer?.customerName &&
                                    !!validation?.values?.customer?.customerPhone &&
                                    !!validation?.values?.customer?.customerEmail;

                                if (allowNext) setStep(2);
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <div className="intro-img-flower-mid">
                    <img alt="deco" src={singleFlower} width={'100%'} />
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
            </div>
        </div>
    );
}

function Step2({ setStep, valueServiceId, isValid, onChangeServiceId, onChangeParentServiceId }) {
    const footerButtonId = 'booking-step2-button';
    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    const [serviceChoice, setServiceChoice] = React.useState(null);

    useEffect(() => {
        if (isValid) {
            const footerButtonElement = document.getElementById(footerButtonId);
            footerButtonElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [onChangeServiceId, valueServiceId]);

    return (
        <div className="intro-form">
            <div className="intro-img">
                <div className="intro-img-form">
                    <div className="intro-img-big">
                        <img alt="intro" src={introBig} width={'100%'} loading="lazy" />
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
                        <h2 className="intro-title">Your Booking</h2>
                    </div>
                    <div className="booking-input-item">
                        <div className="booking-form-input">
                            {services?.map?.((s, index) => {
                                return (
                                    <Button
                                        key={index}
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            if (s?.childs?.length > 0) {
                                                setServiceChoice(s);
                                            } else {
                                                onChangeServiceId(s?.serviceId);
                                            }
                                        }}
                                        style={
                                            serviceChoice?.serviceId === s?.serviceId
                                                ? { background: 'var(--clr-primary-yellow)' }
                                                : null
                                        }
                                        id="booking-nails-service"
                                        className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                                    >
                                        {s?.serviceName}
                                    </Button>
                                );
                            })}
                        </div>

                        <div className="booking-list-item">
                            {serviceChoice?.childs?.map?.((item, index) => {
                                return (
                                    <div
                                        className="booking-item-form"
                                        key={index}
                                        onClick={() => {
                                            onChangeServiceId(item?.serviceId);
                                            onChangeParentServiceId(serviceChoice?.serviceId);
                                        }}
                                        style={
                                            valueServiceId === item?.serviceId
                                                ? { background: 'var(--clr-primary-yellow)' }
                                                : null
                                        }
                                    >
                                        <div className="booking-item-title">{item?.serviceName}</div>
                                        <div className="booking-item-price">{item?.duration}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="intro-img-flower-mid">
                    <img alt="deco" src={singleFlower} width={'100%'} />
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
                <div id={footerButtonId}>
                    {isValid && (
                        <Button
                            type="button"
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5  mx-4 my-3"
                            onClick={() => setStep(3)}
                        >
                            Next
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="outline"
                        className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5 mx-4 my-3"
                        onClick={() => setStep(1)}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Step3({
    setStep,
    valueCheckinDate,
    valueServiceId,
    parentServiceId,
    onChangeDate,
    onChangeTimeStart,
    onChangeTimeEnd,
    hourMorningWorkStart = 9,
    minuteMorningWorkStart = 0,
    hourMorningWorkEnd = 12,
    minuteMorningWorkEnd = 30,
    hourAfternoonWorkStart = 13,
    minuteAfternoonWorkStart = 0,
    hourAfternoonWorkEnd = 17,
    minuteAfternoonWorkEnd = 30,
}) {
    const [selectedDate, setSelectedDate] = useState();
    const [reservedTimeRange, setReversed] = useState([]);
    const [timeOffset, setTimeOffset] = useState(1);
    const [timeRange, setTimeRange] = useState([]);

    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    useEffect(() => {
        let searchBy = 'Date';
        let keyword = moment(selectedDate).format('DD/MM/YYYY');

        getBookingList({
            orderBy: 'CreatedDate',
            searchBy: searchBy,
            keyword: keyword || moment().format('MM/YYYY'),
            skip: 0,
            take: 31,
        })
            .then((response) => {
                if (!Array.isArray(response?.list)) {
                    response.errors.forEach((msg) => {
                        toast.error(msg, {
                            autoClose: 3000,
                        });
                    });

                    return;
                }

                setReversed(
                    response?.list?.map?.((b) => {
                        const [start1, end1] = b.slot.start_Hour.split(':');
                        const [start2, end2] = b.slot.end_Hour.split(':');

                        return {
                            startTime: [start1, end1].join(':'),
                            endTime: [start2, end2].join(':'),
                            isAllowed: b.serviceId !== valueServiceId,
                        };
                    }),
                );
            })
            .catch((error) => {
                toast.error(error);
            });
    }, [selectedDate, valueServiceId, services]);

    useEffect(() => {
        if (services.length > 0) {
            let selectedDuration = services
                ?.reduce((pre, cur) => [...pre, cur, ...cur.childs], [])
                ?.find?.((item) => item.serviceId === valueServiceId)?.duration;
            if (selectedDuration) {
                let array = selectedDuration?.includes?.('-')
                    ? selectedDuration?.split('-')?.map?.((time) => {
                          const number = Number(time.match(/\d+/g)[0]);

                          return time.includes('hours') || time.includes('hour') ? number * 60 : number;
                      })
                    : (() => {
                          console.log(selectedDuration);
                          const number = Number(selectedDuration.match(/\d+/g)[0]);

                          return [
                              selectedDuration.includes('hours') || selectedDuration.includes('hour')
                                  ? number * 60
                                  : number,
                          ];
                      })();

                console.log(array);

                let timeOffset = Math.max(...array);

                // let timeOffset = Math.max(selectedDuration.match(/\d+/g));
                console.log(selectedDuration, timeOffset);
                setTimeOffset(timeOffset);
            }
        }
    }, [services, valueServiceId]);

    useEffect(() => {
        console.log(timeOffset);
        function calcTimeRanges(timeOffset) {
            let h = hourMorningWorkStart;
            let m = minuteMorningWorkStart;

            let morningTimeArray = [];
            let afternoonTimeArray = [];

            while (h <= hourAfternoonWorkEnd) {
                let range;

                if (h >= hourMorningWorkStart && h < hourMorningWorkEnd) {
                    range = [
                        `${h.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${m.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                        `${(h + Math.floor((m + timeOffset) / 60)).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${(h + Math.floor((m + timeOffset) / 60) === hourMorningWorkEnd
                            ? Math.min((m + timeOffset) % 60, minuteMorningWorkEnd)
                            : (m + timeOffset) % 60
                        ).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                    ];
                    morningTimeArray = [...morningTimeArray, range];
                } else if (h >= hourAfternoonWorkStart && h < hourAfternoonWorkEnd) {
                    range = [
                        `${h.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${m.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                        `${(h + Math.floor((m + timeOffset) / 60)).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${(h + Math.floor((m + timeOffset) / 60) === hourAfternoonWorkEnd
                            ? Math.min((m + timeOffset) % 60, minuteAfternoonWorkEnd)
                            : (m + timeOffset) % 60
                        ).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                    ];
                    afternoonTimeArray = [...afternoonTimeArray, range];
                }

                h = h + Math.floor((m + timeOffset) / 60);
                m = (m + timeOffset) % 60;
            }

            return [...morningTimeArray, ...afternoonTimeArray];
        }

        let range = calcTimeRanges(timeOffset);

        setTimeRange(range);
    }, [timeOffset]);

    const timeFrameContent = ``;

    return (
        <>
            <div className="booking-component my-5">
                <Booking
                    activeDate={valueCheckinDate}
                    initialTimeRange={
                        timeRange || [
                            ['08:30', '09:30'],
                            ['09:30', '10:30'],
                            ['10:30', '11:30'],
                            ['11:30', '12:30'],
                            ['13:30', '14:30'],
                            ['14:30', '15:30'],
                            ['15:30', '16:30'],
                            ['16:30', '17:30'],
                            ['17:30', '18:30'],
                        ]
                    }
                    reserved={reservedTimeRange}
                    onChangeDate={(date) => {
                        onChangeDate(date);
                        setSelectedDate(date);
                    }}
                    onChangeTimeStart={(time) => {
                        onChangeTimeStart(time);
                    }}
                    onChangeTimeEnd={(time) => {
                        onChangeTimeEnd(time);
                    }}
                    onOverBook={() => {
                        toast.error("We're not working on the weekend", {
                            autoClose: 3000,
                        });
                    }}
                    title="Choose your time frame to send your request of booking to us"
                    content={timeFrameContent}
                ></Booking>
            </div>
            <div className="booking-service-description">
                <div className="mb-2">
                    <b>
                        {
                            services
                                ?.map((item) => item?.childs?.find((e) => e.serviceId === valueServiceId))
                                ?.find((item) => item !== undefined)?.serviceName
                        }
                    </b>
                </div>
                <div>
                    <div>
                        {
                            services
                                ?.map((item) => item?.childs?.find((e) => e.serviceId === valueServiceId))
                                ?.find((item) => item !== undefined)?.description
                        }
                    </div>
                </div>
            </div>
            {/* <Row className="container mx-auto gap-5">
                <Col className="booking-service-description">
                    <div className="mb-2">
                        <span className="me-2">
                            <AiFillWarning></AiFillWarning>
                        </span>
                        <b>Attention:</b>
                    </div>
                    <div>
                        <b>Monday - Saturday</b> (9:00am - 5:30pm)
                    </div>
                    <div>
                        <b>Sunday</b> (Closed)
                    </div>
                </Col>
            </Row> */}
            <div className="booking-component-button-done">
                <Button
                    type="button"
                    variant="outline"
                    className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5 mx-4"
                    onClick={() => setStep(2)}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    variant="outline"
                    className="my-btn text-uppercase px-5 btn-primary-outline btn btn-outline"
                    // onClick={() => validation.handleSubmit()}
                >
                    Submit Your Booking
                </Button>
            </div>
        </>
    );
}

function BookingCompleted({ values }) {
    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
        },
    });
    return (
        <div className="completed">
            <h1 className="completed-title">Great and thanks for your booking!</h1>
            <p className="completed-content">
                You have successfully booked the service with Little Daisy. Here is your booking information. Hope to
                see you then!
            </p>
            <div className="completed-form">
                <div className="completed-item-form">
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">
                            {services?.find((e) => e.serviceId === values.booking.serviceId)?.serviceName}
                        </div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Date</div>
                        <div className="completed-item-content">
                            {moment(values?.booking?.checkinDate).format('DD-MM-yyyy')}
                        </div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Time</div>
                        <div className="completed-item-content">
                            {values?.booking?.slot?.start_Hour} - {values?.booking?.slot?.end_Hour}
                        </div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Name</div>
                        <div className="completed-item-content">{values?.customer?.customerName}</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Phone</div>
                        <div className="completed-item-content">{values?.customer?.customerPhone}</div>
                    </div>
                </div>
                {/* <div className="completed-mess">
                    <span>
                        <MdOutlineMailOutline></MdOutlineMailOutline>
                    </span>
                    <div className="completed-mess-content">{values.customer.messenger}</div>
                </div> */}
                {/* <span className="completed-total-fee">
                    <span className="completed-total-fee-title">Your service has a price</span>
                    <span className="completed-total-price">
                        <b>{services?.find((e) => e.serviceId === values.booking.serviceId)?.price}$</b>
                    </span>
                </span> */}
            </div>
            <div className="my-3" style={{ textAlign: 'center' }}>
                <Link to="/">
                    <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">Homepage</button>
                </Link>
            </div>
        </div>
    );
}
export default BookingPage;
