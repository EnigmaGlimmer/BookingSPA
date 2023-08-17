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
export default function About() {
    document.title = 'Little Daisy - About';
    return (
        <section>
            <div className="about-brand">
                <div className="about-brand-content-form">
                    <div className="about-brand-content-container">
                        <div className="about-brand-title">
                            We are <br />
                            Little Daisy
                        </div>
                        <div className="about-brand-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna.
                        </div>
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
            <div className="about-story">
                <div className="about-story-form">
                    <div className="about-story-item-1">
                        <img src={aboutStory1} alt="Brand" width={'100%'} />
                    </div>
                    <div className="about-story-item-2">
                        <div className="about-story-title">Little Daisy Story</div>
                        <div className="about-story-content">
                            Successful brands know that storytelling is a powerful marketing tool. They know how to use
                            stories to get their message across. But first, why brand stories? What famous brand stories
                            are there? Because stories are the best weapon we have for eliminating noise Because it
                            organizes information in an attractive way Because it is the most effective tool to
                            influence the human brain Or simply put: Brand story in marketing is a filter that helps to
                            simplify the message. And thanks to it, people will see us, hear us and understand us.
                        </div>
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
            <div className="about-image-store">
                <div className="about-image-store-form">
                    <div className="about-image-store-content">
                        <div className="about-image-store-title">Little Daisy Stores</div>
                        <div className="about-image-store-address">
                            ADD: 198 Lorem ipsum Street, MB, AU <span className="about-image-store-btn">VIEW MAPS</span>
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
                            {listImg?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="about-image-store-form-child">
                                            <img src={item} alt="about-1" width={'100%'} />
                                            <p className="about-image-store-form-content">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor.
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* About Deco */}
            <div className="about-deco">
                <div className="about-deco-form">
                    <img src={aboutDeco} alt="Service" width={'100%'} />
                    <h1 className="about-deco-title">spiscing elit & sed do eiusmod</h1>
                </div>
            </div>
            {/* Staff */}
            <div className="about-staff">
                <div className="about-staff-deco booking-f">
                    <img src={homeFlowerDeco} width={'100%'} />
                </div>
                <div className="about-staff-form">
                    <div className="about-staff-title">Our Staff</div>
                    <div className="about-staff-list">
                        <div className="about-staff-item">
                            <div className="about-staff-item-img">
                                <img src={aboutDaisy4} alt="" width={'100%'} />
                            </div>
                            <div className="about-staff-item-name">Full Name</div>
                            <div className="about-staff-item-specialized">
                                <p>- specialized</p>
                                <p>- specialized</p>
                                <p>- specialized</p>
                            </div>
                        </div>
                        <div className="about-staff-item">
                            <div className="about-staff-item-img">
                                <img src={aboutDaisy4} width={'100%'} />
                            </div>
                            <div className="about-staff-item-name">Full Name</div>
                            <div className="about-staff-item-specialized">
                                <p>- specialized</p>
                                <p>- specialized</p>
                                <p>- specialized</p>
                            </div>
                        </div>
                        <div className="about-staff-item">
                            <div className="about-staff-item-img">
                                <img src={aboutDaisy4} width={'100%'} />
                            </div>
                            <div className="about-staff-item-name">Full Name</div>
                            <div className="about-staff-item-specialized">
                                <p>- specialized</p>
                                <p>- specialized</p>
                                <p>- specialized</p>
                            </div>
                        </div>
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
                            <SwiperSlide>
                                <div className="about-staff-item">
                                    <div className="about-staff-item-img">
                                        <img src={aboutDaisy4} width={'100%'} />
                                    </div>
                                    <div className="about-staff-item-name">Full Name</div>
                                    <div className="about-staff-item-specialized">
                                        <p>- specialized</p>
                                        <p>- specialized</p>
                                        <p>- specialized</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="about-staff-item">
                                    <div className="about-staff-item-img">
                                        <img src={aboutDaisy4} width={'100%'} />
                                    </div>
                                    <div className="about-staff-item-name">Full Name</div>
                                    <div className="about-staff-item-specialized">
                                        <p>- specialized</p>
                                        <p>- specialized</p>
                                        <p>- specialized</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="about-staff-item">
                                    <div className="about-staff-item-img">
                                        <img src={aboutDaisy4} width={'100%'} />
                                    </div>
                                    <div className="about-staff-item-name">Full Name</div>
                                    <div className="about-staff-item-specialized">
                                        <p>- specialized</p>
                                        <p>- specialized</p>
                                        <p>- specialized</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Booking */}
            <div className="about-booking">
                <div className="about-booking-deco booking-f">
                    <img src={homeFlowerDeco} width={'100%'} />
                </div>
                <div className="about-booking-img">
                    <img src={aboutBooking} width={'100%'} />
                </div>
                <div className="about-booking-content">
                    <div className="about-booking-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                    <Button
                        variant="outline"
                        className="my-btn text-uppercase btn-primary-outline btn btn-outline me-2"
                    >
                        Book Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
