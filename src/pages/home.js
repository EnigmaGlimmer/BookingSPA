import React from 'react';
import './style/home.css';
import { HiOutlineArrowNarrowDown } from 'react-icons/hi';
import bannerSmall from '../images/bannerSmall.png';
import bannerBig from '../images/bannerBig.png';
import introBig from '../images/introBig.png';
import introSmall from '../images/introSmall.png';
import nailCare from '../images/nailCare.png';
import nailArt from '../images/nailArt.png';
import bestLashes from '../images/bestLashes.png';
import nailService from '../images/nailService.png';
import lashesServices from '../images/lashesService.png';
import lahesSercviceBottom from '../images/lashesServiceBottom.png';
import otherBig from '../images/otherBig.png';
import otherSmall from '../images/otherSmall.png';
import homeFlowerDeco from '../images/home/flower.svg';
import galleryFirst1 from '../images/galleryFirst1.png';
import galleryFirst2 from '../images/galleryFirst2.png';
import gallerySecond1 from '../images/gallerySecond1.png';
import gallerySecond2 from '../images/gallerySecond2.png';
import galleryThird1 from '../images/galleryThird1.png';
import galleryThird2 from '../images/galleryThird2.png';
import reviewUser from '../images/reviewUser.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Button } from 'react-bootstrap';
import { Booking } from '../components';
import BookingPage, { Step1 } from './booking';

// Content
import home from '../config/content/home.json';

function Home() {
    document.title = 'Little Daisy - Home';
    return (
        <section>
            {/* Banner */}
            <div className="banner" id="st-hero">
                <h1 className="banner-title">{home.hero.h1}</h1>
                <div className="banner-img">
                    <div className="banner-img-big">
                        <img alt="banner" src={bannerBig} width={'100%'} />
                    </div>
                    <div className="banner-img-extra">
                        <div className="banner-img-flower">
                            <img alt="banner" src={homeFlowerDeco} width={'100%'} />
                        </div>
                        <div className="banner-img-small">
                            <img alt="banner" src={bannerSmall} width={'100%'} />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            {/* Introduce */}
            <div className="intro" id="st-intro">
                <div className="intro-bg"></div>
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
                                <h6>{home.intro.short}</h6>
                                <h2 className="intro-title">{home.intro.firstTitle}</h2>
                            </div>
                            <p>{home.intro.firstSubTitle}</p>
                            <div>
                                <h5>{home.intro.secondTitle}</h5>
                                <p>{home.intro.secondSubTitle}</p>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                                >
                                    About Us
                                </Button>
                            </div>
                        </div>
                        <div className="intro-img-flower-bot">
                            <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Three Service */}
            <div className="three" id="st-messages">
                <div className="three-form">
                    {home.messages.map((item, index) => {
                        return (
                            <div className="nail-care" key={index}>
                                <div className="nail-care-img">
                                    <img src={nailCare} alt="nail care" width={'100%'} />
                                </div>
                                <div className="nail-care-title">{item.title}</div>
                                <p>{item.message}</p>
                            </div>
                        );
                    })}
                    {/* <div className="nail-care">
                        <div className="nail-care-img">
                            <img src={nailArt} alt="nail care" width={'100%'} />
                        </div>
                        <div className="nail-care-title">{home.messages[1].title}</div>
                        <p>{home.messages[1].message}</p>
                    </div>
                    <div className="nail-care">
                        <div className="nail-care-img">
                            <img src={bestLashes} alt="nail care" width={'100%'} />
                        </div>
                        <div className="nail-care-title">{home.messages[2].title}</div>
                        <p>{home.messages[2].message}</p>
                    </div> */}
                </div>
            </div>
            {/* Service Quality */}
            <div className="quality" id="st-introServices">
                <div className="quality-form">
                    <h1 className="quality-title">{home.introServices.title}</h1>
                </div>
            </div>
            {/* Nail Services */}
            <div className="other" id="st-nailService">
                <div className="other-bg">
                    <div className="other-img-flower">
                        <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                    </div>
                </div>
                <div className="other-form">
                    <div className="other-img">
                        <div className="other-img-form">
                            <div className="other-img-big">
                                <img src={otherBig} alt="Service" width={'100%'} />
                            </div>
                            <div className="other-img-small">
                                <img src={otherSmall} alt="Service" width={'100%'} />
                            </div>
                        </div>
                    </div>
                    <div className="other-content">
                        <div className="other-content-form">
                            <h1 className="other-title">Nail Services</h1>
                            <div className="other-list">
                                {home.nailService.packages.map((item, index) => {
                                    return (
                                        <div className="other-list-item" key={index}>
                                            <p>{item.name}</p>
                                            <div className="other-list-dashed"></div>
                                            <p>{item.price}$</p>
                                        </div>
                                    );
                                })}
                                {/* <div className="other-list-item">
                                    <p>Eyebrow laminations</p>
                                    <div className="other-list-dashed"></div>
                                    <p>12$</p>
                                </div>
                                <div className="other-list-item">
                                    <p>Tin tin eyebrow and lashes</p>
                                    <div className="other-list-dashed"></div>
                                    <p>12$</p>
                                </div>
                                <div className="other-list-item">
                                    <p>Waxing eyebrows</p>
                                    <div className="other-list-dashed"></div>
                                    <p>12$</p>
                                </div> */}
                            </div>
                            <div>
                                <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lashes Services */}
            <div className="lashes" id="st-lashesService">
                <div className="lashes-bg"></div>
                <div className="lashes-form">
                    <div className="lashes-content">
                        <div className="lashes-content-form">
                            <h1 className="lashes-title">Lashes Services</h1>
                            <div className="lashes-list">
                                {home.lashesService.packages.map((item, index) => {
                                    return (
                                        <div className="other-list-item" key={index}>
                                            <p>{item.name}</p>
                                            <div className="other-list-dashed"></div>
                                            <p>{item.price}$</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lashes-img">
                        <div className="lashes-img-form">
                            <div className="lashes-img-big">
                                <img src={lashesServices} alt="Service" width={'100%'} />
                            </div>
                            <div className="lashes-img-small">
                                <img src={lahesSercviceBottom} alt="Service" width={'100%'} />
                                <div className="lashes-img-flower">
                                    <img alt="deco" src={homeFlowerDeco} width={'100%'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Booking */}
            <div className="booking">
                {/* <div className="booking-form">
                    <div className="booking-time-form">
                        <div className="booking-intro">Dedication</div>
                        <div className="booking-title">Working Hours</div>
                        <div className="booking-time-frame">
                            <div className="booking-time">
                                <div className="booking-time-name">Frame 1</div>
                                <div className="booking-hour">9A.M - 10A.M</div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-calendar">
                        <div className="booking-calendar-title">Choose the right date for your service use</div>
                        <div className="booking-calendar-module">
                            <Booking></Booking>
                        </div>
                    </div>
                </div> */}
                <BookingPage></BookingPage>
            </div>
            {/* Gallery */}
            <div className="gallery" id="st-galleries">
                <div className="gallery-form">
                    <h1 className="gallery-title">Gallery</h1>
                    <div className="gallery-img-form">
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={galleryFirst1} width={'100%'} />
                            </div>
                            <div className="gallery-img-2">
                                <img src={galleryFirst2} alt="Service" width={'100%'} />
                            </div>
                        </div>
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={gallerySecond1} alt="Service" width={'100%'} />
                            </div>
                            <div className="gallery-img-2">
                                <img src={gallerySecond2} alt="Service" width={'100%'} />
                            </div>
                        </div>
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={galleryThird1} alt="Service" width={'100%'} />
                            </div>
                            <div className="gallery-img-2">
                                <img src={galleryThird2} alt="Service" width={'100%'} />
                            </div>
                        </div>
                    </div>
                    <div className="gallery-view-more">
                        View More
                        <HiOutlineArrowNarrowDown></HiOutlineArrowNarrowDown>
                    </div>
                </div>
            </div>
            {/* Comment and Review */}
            <div className="review py-5" id="st-testimonials">
                <div className="review-form">
                    <div className="review-header">
                        <h1 className="review-intro">{home.testimonials.subTitle}</h1>
                        <div className="review-title">{home.testimonials.title}</div>
                    </div>
                    <div className="review-list">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 200,
                                slideShadows: false,
                                modifier: 1,
                            }}
                            navigation={true}
                            initialSlide={1 || 0}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {home.testimonials.review.map((item, index) => {
                                return (
                                    <SwiperSlide className="review-slide" key={index}>
                                        {({ isActive }) => (
                                            <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                                <div className="review-img">
                                                    <img src={reviewUser} alt="Service" width={'100%'} />
                                                </div>
                                                <div className="review-user-name">{item.title}</div>
                                                <div className="review-content">{item.content}</div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Comment and Review Responsive*/}
            <div className="review-res py-5" id="st-testimonials">
                <div className="review-form">
                    <div className="review-header">
                        <h1 className="review-intro">TESTEMONIALS THOUGHTS</h1>
                        <div className="review-title">Comments & Reviews</div>
                    </div>
                    <div className="review-list">
                        <Swiper
                            navigation={true}
                            pagination={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Pagination, Autoplay]}
                            className="review-mySwiper"
                        >
                            {home.testimonials.review.map((item, index) => {
                                return (
                                    <SwiperSlide className="review-slide" key={index}>
                                        {({ isActive }) => (
                                            <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                                <div className="review-img">
                                                    <img src={reviewUser} alt="Service" width={'100%'} />
                                                </div>
                                                <div className="review-user-name">{item.title}</div>
                                                <div className="review-content">{item.content}</div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
