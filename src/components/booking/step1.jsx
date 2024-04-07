import { Button, Form } from 'react-bootstrap';
import homeFlowerDeco from 'images/home/flower.svg';
import introBig from 'images/introBig.png';
import introSmall from 'images/introSmall.png';
import singleFlower from 'images/singleFlower.svg';
import { useEffect, useRef } from 'react';

const arrayNetwork = ['Facebook', 'Instagram', 'Google', 'Letter', 'Walked past', 'Friend'];

export function Step1({ setStep, validation }) {
    const scrolledElementOnRerender = useRef();
    useEffect(() => {
        if (scrolledElementOnRerender?.current) {
            scrolledElementOnRerender.current.style.scrollMarginTop = '120px';
            scrolledElementOnRerender.current.scrollIntoView();
        }
    }, []);

    return (
        <div className="intro-form">
            <div className="intro-img booking-form-img">
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
                    <div ref={scrolledElementOnRerender}>
                        <h2 className="intro-title">Your Booking</h2>
                    </div>
                    <div className="booking-form-input">
                        <Form.Group>
                            <input
                                type="text"
                                name="customer.customerName"
                                className="booking-input"
                                placeholder="Full Name"
                                value={validation.values.customer.customerName}
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
                                value={validation.values.customer.customerPhone}
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
                                value={validation.values.customer.customerEmail}
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
                        <Form.Group>
                            <Form.Label>
                                <b>How did you know about us?</b>
                            </Form.Label>
                            {arrayNetwork.map((item, key) => {
                                return (
                                    <div className="my-3" key={key}>
                                        <Form.Check
                                            inline
                                            label={item}
                                            name={'customer.howtoknow'}
                                            checked={validation.values.customer.howtoknow.includes(item)}
                                            value={item.replace(/\s/g, '')}
                                            onChange={validation?.handleChange}
                                            type={'checkbox'}
                                        />
                                    </div>
                                );
                            })}
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

export default Step1;
