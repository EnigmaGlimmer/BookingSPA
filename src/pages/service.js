import React, { useEffect } from 'react';
import serviceBanner from '../images/serviceBanner.png';
import serviceContent from '../images/serviceContent.png';
import aboutDaisy1 from '../images/aboutDaisy1.png';
import aboutDaisy2 from '../images/aboutDaisy2.png';
import aboutDaisy3 from '../images/aboutDaisy3.png';
import aboutDaisy4 from '../images/aboutDaisy4.png';
import homeFlowerDeco from '../images/home/flower.svg';
import aboutBooking from '../images/aboutBooking.png';
import './style/service.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import service from '../config/content/service.json';
import useService from '../hooks/useServices';
import { Link, useSearchParams } from 'react-router-dom';

// DOMPurify
import * as DOMPurify from 'dompurify';

const listImg = [
    aboutDaisy1,
    aboutDaisy2,
    aboutDaisy3,
    aboutDaisy4,
    aboutDaisy1,
    aboutDaisy2,
    aboutDaisy3,
    aboutDaisy4,
];

function Service() {
    const [searchParams] = useSearchParams();

    const { blog } = useService({
        selectedPostName: searchParams?.get?.('name'),
        request: {
            skip: 0,
            take: 100,
        },
    });

    useEffect(() => {}, [searchParams]);

    if (!searchParams.get('name')) {
        return;
    }

    return (
        <div>
            {/* Service Banner */}
            <div className="service-banner container py-5" id="st-banner">
                <div className="mx-auto">
                    <img src={serviceBanner} alt="service-banner" width={'100%'} />
                </div>
            </div>

            {/* Service Name */}
            <div className="service-name container py-2" id="st-serviceProduct">
                <h1 className="mb-3">{searchParams.get('name')}</h1>
                <div
                    style={{ textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog?.blogContent),
                    }}
                >
                    {/* <div className="service-name-title">{service?.product?.title}</div>
                    <p className="service-name-content">{service?.product?.content}</p>
                    <div className="service-name-content-list">
                        <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                    <div className="service-name-img-form">
                        <img src={serviceContent} alt="" width={'100%'} />
                        <p className="service-name-img-alt">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                    </div>
                    <p className="service-name-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Eget magna done fermentum iaculis eu non diam phasellus
                        vestibulum. Id donec ultrices tincidunt arcu. Malesuada proin libero nunc consequat interdum
                        varius sit amet. Eu ultrices vitae auctor eu augue ut lectus. Suscipit tellus mauris a diam.
                        Viverra orci sagittis eu volutpat odio facilisis etmagnis dis parturient mananis interdum arcu
                        ac tortor dignissim convallis aenean.
                    </p>
                    <p className="service-name-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Eget magna done fermentum iaculis eu non diam phasellus
                        vestibulum. Id donec ultrices tincidunt arcu. Malesuada proin libero nunc consequat interdum
                        varius sit amet. Eu ultrices vitae auctor eu augue ut lectus. Suscipit tellus mauris a diam.
                        Viverra orci sagittis eu volutpat odio facilisis etmagnis dis parturient mananis interdum arcu
                        ac tortor dignissim convallis aenean.
                    </p> */}
                </div>
            </div>
            {/* Daisy Images */}
            <div className="about-image-store" id="st-listImage">
                <div className="about-image-store-form">
                    <div className="about-image-store-content">
                        <div className="about-image-store-title">{service?.listImage?.title}</div>
                        <div className="about-image-store-address">
                            {service.listImage.content} <span className="about-image-store-btn">VIEW MAPS</span>
                        </div>
                    </div>
                    {/* <div className="about-image-store-list">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[FreeMode, Pagination, Autoplay]}
                            className="about-image-store-swiper"
                        >
                            {listImg?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="about-image-store-form-child">
                                            <img src={item} alt="" width={'100%'} />
                                            <p className="about-image-store-form-content">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor.
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div> */}
                </div>
            </div>
            {/* Booking */}
            {/* <div className="about-booking" id="st-serviceBooking">
                <div className="about-booking-deco booking-f">
                    <img src={homeFlowerDeco} alt="" width={'100%'} />
                </div>
                <div className="about-booking-img">
                    <img src={aboutBooking} alt="" width={'100%'} />
                </div>
                <div className="about-booking-content">
                    <div className="about-booking-title">{service?.serviceBooking?.title}</div>
                    <Link to={'/booking'}>
                        <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">Book Now</button>
                    </Link>
                </div>
            </div> */}
        </div>
    );
}

export default Service;
