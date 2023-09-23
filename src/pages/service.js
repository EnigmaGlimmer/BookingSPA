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
    'https://media.glamour.com/photos/62fc067841e2129275280833/1:1/w_894,h_894,c_limit/Untitled%20design%20(1).png',
    'https://bonsainailspalincoln.com/wp-content/uploads/2022/06/about-1-1.jpg',
    'https://img.grouponcdn.com/deal/4RGKHMEf4BG6By9xMQcewVqExUcS/4R-2000x1200/v1/t600x362.jpg',
    'https://purespauk.com/cdn/shop/products/GelMani_c1f5c753-d706-46db-9ba8-6918d6e13bb8.jpg?v=1635170188',
    'https://s3-media0.fl.yelpcdn.com/bphoto/vk0wsuV7YLXSne612HtXPA/348s.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-m/1280/20/c6/ee/00/wonderful-nail-spa.jpg',
    'https://seydamakeupandmore.de/wp-content/uploads/2020/10/Cutie-Pie_IMG_2362.1510-500x500.jpg',
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
                ></div>
                <div style={{ textAlign: 'center' }}>
                    <Link to={'/booking'}>
                        <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">Book Now</button>
                    </Link>
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
                                            <img src={item} height={'100%'} width={'100%'} />
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
