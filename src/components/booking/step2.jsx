import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import useService from '../../hooks/useServices';
import introBig from 'images/introBig.png';
import introSmall from 'images/introSmall.png';
import homeFlowerDeco from 'images/home/flower.svg';
import singleFlower from 'images/singleFlower.svg';
import useModalContext from 'hooks/useModalContext';
import blockedServiceImage from 'images/events/White Geometric Nail Studio Promotion Instagram Post.png';

function Step2({ setStep, valueServiceId, isValid, onChangeServiceId, onChangeParentServiceId, onChangeServiceName }) {
    const footerButtonId = 'booking-step2-button';
    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });
    const scrolledElementOnRerender = useRef();
    const mainScrolledElementOnRender = useRef();

    const [serviceChoice, setServiceChoice] = useState(null);

    const { openModal } = useModalContext();

    function handleBlockedServiceClick() {
        openModal({ bodyComponent: <Image src={blockedServiceImage}></Image> });
    }

    useEffect(() => {
        if (mainScrolledElementOnRender?.current) {
            mainScrolledElementOnRender.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            return;
        }
        if (scrolledElementOnRerender?.current) {
            scrolledElementOnRerender.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [onChangeServiceId, valueServiceId, setStep, serviceChoice]);

    return (
        <div className="intro-form">
            <div className="intro-img booking-form-img">
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
                <div className="intro-content-form" ref={scrolledElementOnRerender}>
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
                                            } else if (s?.isBlocked) {
                                                handleBlockedServiceClick();
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

                        {serviceChoice && (
                            <div className="booking-list-item" ref={mainScrolledElementOnRender}>
                                {serviceChoice?.childs
                                    ?.sort((a, b) =>
                                        a.serviceId === 10 ? 1 : b.serviceId === 10 ? -1 : a.serviceId - b.serviceId,
                                    )
                                    ?.map?.((item, index) => {
                                        return (
                                            <div
                                                className="booking-item-form"
                                                key={index}
                                                onClick={() => {
                                                    if (item?.isBlocked) {
                                                        handleBlockedServiceClick();
                                                    } else {
                                                        onChangeServiceId(item?.serviceId);
                                                        onChangeParentServiceId(serviceChoice?.serviceId);
                                                        onChangeServiceName(item?.serviceName);
                                                    }
                                                }}
                                                style={
                                                    valueServiceId === item?.serviceId
                                                        ? { background: 'var(--clr-primary-yellow)' }
                                                        : null
                                                }
                                            >
                                                <div className="booking-item-title">{item?.serviceName}</div>
                                                {item?.serviceId !== 10 && (
                                                    <div className="booking-item-price">{item?.duration}</div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
                <div className="intro-img-flower-mid">
                    <img alt="deco" src={singleFlower} width={'100%'} />
                </div>
                <div className="intro-img-flower-bot">
                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                </div>
                <div className="d-flex gap-1 position-relative" style={{ zIndex: 1 }} id={footerButtonId}>
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

export default Step2;
