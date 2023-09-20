import React from 'react';
import './style/about.css';
import aboutBrand from '../images/aboutBrand.png';
import homeFlowerDeco from '../images/home/flower.svg';
import aboutStory1 from '../images/aboutStory1.png';
import aboutStory2 from '../images/aboutStory2.png';
import aboutDaisy1 from '../images/aboutDaisy1.png';
import aboutDaisy2 from '../images/aboutDaisy2.png';
import aboutDaisy3 from '../images/aboutDaisy3.png';
import aboutDaisy4 from '../images/aboutDaisy4.png';
import aboutDeco from '../images/aboutDeco.png';
import aboutBooking from '../images/aboutBooking.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getSettingList } from '../store/actions';
import { Link } from 'react-router-dom';

export default function About() {
    document.title = 'Little Daisy - About';

    const dispatch = useDispatch();

    const { about } = useSelector((state) => {
        return {
            about: state.Setting?.setting?.content?.about,
        };
    });

    React.useEffect(() => {
        dispatch(getSettingList('about'));
    }, []);

    React.useEffect(() => {
        console.log(about);
    }, [about]);

    return (
        <section className="about">
            <div className="about-brand" id="st-intro">
                <div className="about-brand-content-form">
                    <div className="about-brand-content-container">
                        <div className="about-brand-title">{about?.intro?.title}</div>
                        <div className="about-brand-content">{about?.intro?.content}</div>
                    </div>
                    <div className="about-brand-img-flower-1 booking-f">
                        <img alt="brand" src={homeFlowerDeco} width={'100%'} />
                    </div>
                    <div className="about-brand-img-flower-2 booking-f">
                        <img alt="brand" src={homeFlowerDeco} width={'100%'} />
                    </div>
                </div>
                <div className="about-brand-img">
                    <img src={aboutBrand} alt="Brand" width={'100%'} />
                </div>
            </div>
            {/* Daisy Story */}
            <div className="about-story" id="st-story">
                <div className="about-story-form">
                    <div className="about-story-item-1">
                        <img src={aboutStory1} alt="Brand" width={'100%'} />
                    </div>
                    <div className="about-story-item-2">
                        <div className="about-story-title">{about?.story?.title}</div>
                        <div className="about-story-content">{about?.story?.content}</div>
                        <div className="about-story-img-flower booking-f">
                            <img src={homeFlowerDeco} alt="" width={'100%'} />
                        </div>
                    </div>
                    <div className="about-story-item-3">
                        <img src={aboutStory2} alt="story" width={'100%'} />
                    </div>
                </div>
            </div>
            {/* Daisy Images */}
            <div className="about-image-store" id="st-listImage">
                <div className="about-image-store-form">
                    <div className="about-image-store-content">
                        <div className="about-image-store-title">{about?.listImage?.title}</div>
                        <div className="about-image-store-address">
                            {about?.listImage?.content}
                            <span className="about-image-store-btn">VIEW MAPS</span>
                        </div>
                    </div>
                    <div className="about-image-store-list">
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
                            <SwiperSlide>
                                {/* <div className="about-image-store-form-child">
                                    <img src={''} alt="about-1" width={'100%'} />
                                    <p className="about-image-store-form-content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                                    </p>
                                </div> */}
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* About Deco */}
            <div className="about-deco" id="st-deco">
                <div className="about-deco-form">
                    <img src={aboutDeco} alt="Service" width={'100%'} />
                    <h1 className="about-deco-title">{about?.deco?.title}</h1>
                </div>
            </div>
            {/* Staff */}
            <div className="about-staff" id="st-listStaff">
                <div className="about-staff-deco booking-f">
                    <img src={homeFlowerDeco} width={'100%'} />
                </div>
                <div className="about-staff-form">
                    <div className="about-staff-title">{about?.listStaff?.title}</div>
                    <div className="about-staff-list">
                        {about?.listStaff?.child?.map?.((item, index) => {
                            return (
                                <div className="about-staff-item" key={index}>
                                    <div className="about-staff-item-img">
                                        <img src={aboutDaisy4} alt="" width={'100%'} />
                                    </div>
                                    <div className="about-staff-item-name">{item?.title}</div>
                                    <p>{item?.subtitle}</p>
                                    <div className="about-staff-item-specialized">
                                        <i>{item?.content}</i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Staff Responsive */}
                    <div className="about-staff-list-res">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {about?.listStaff?.child?.map?.((c, key) => {
                                return (
                                    <SwiperSlide key={key}>
                                        <div className="about-staff-item">
                                            <div className="about-staff-item-img">
                                                <img src={aboutDaisy4} width={'100%'} />
                                            </div>
                                            <div className="about-staff-item-name">{c?.title}</div>
                                            <p>{c?.subtitle}</p>
                                            <div className="about-staff-item-specialized">
                                                <p>{c?.content}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Booking */}
            <div className="about-booking" id="st-bookingAbout">
                <div className="about-booking-deco booking-f">
                    <img src={homeFlowerDeco} width={'100%'} />
                </div>
                <div className="about-booking-img">
                    <img src={aboutBooking} width={'100%'} />
                </div>
                <div className="about-booking-content">
                    <div className="about-booking-title">{about?.bookingAbout?.title}</div>
                    <Link to={'/booking'}>
                        <Button
                            variant="outline"
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline me-2"
                        >
                            Book Now
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
