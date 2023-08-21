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
import { Step1 } from './booking';

function Home() {
    document.title = 'Little Daisy - Home';

    return (
        <section>
            {/* Banner */}
            <div className="banner my-5 pb-5">
                <h1 className="banner-title">Lorem ipsum dolor sit, consectetur adipiscing elit</h1>
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
            <div className="intro my-5">
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
                                <h6>About Little Daisy</h6>
                                <h2 className="intro-title">Perfect beauty service</h2>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna.
                            </p>
                            <div>
                                <h5>Lorem ipsum dolor sit amet</h5>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna.
                                </p>
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
            <div className="three py-5">
                <div className="three-form">
                    <div className="nail-care">
                        <div className="nail-care-img">
                            <img src={nailCare} alt="nail care" width={'100%'} />
                        </div>
                        <div className="nail-care-title">Nail Care</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="nail-care">
                        <div className="nail-care-img">
                            <img src={nailArt} alt="nail care" width={'100%'} />
                        </div>
                        <div className="nail-care-title">Nail Art</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="nail-care">
                        <div className="nail-care-img">
                            <img src={bestLashes} alt="nail care" width={'100%'} />
                        </div>
                        <div className="nail-care-title">Best Lashes</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                </div>
            </div>
            {/* Service Quality */}
            <div className="quality">
                <div className="quality-form">
                    <h1 className="quality-title">Our service is always developing the most perfect to serve women</h1>
                    {/* <div className="quality-item-form">
                        <div className="quality-item">
                            <div className="quality-img">
                                <img src={nailService} alt="Service" width={'100%'} />
                            </div>
                            <div className="quality-item-price">2.05 $</div>
                            <div className="quality-item-name">Nails Services</div>
                            <div className="quality-btn-form">
                                <Button
                                    variant="outline"
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline me-2"
                                >
                                    Book Now
                                </Button>
                                <Button
                                    variant="outline"
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                                >
                                    View More
                                </Button>
                            </div>
                        </div> */}
                        {/* Item */}
                        {/* <div className="quality-item">
                            <div className="quality-img">
                                <img src={lashesServices} alt="Service" width={'100%'} />
                            </div>
                            <div className="quality-item-price">2.05 $</div>
                            <div className="quality-item-name">Lashes Services</div>
                            <div className="quality-btn-form">
                                <Button
                                    variant="outline"
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline me-2"
                                >
                                    Book Now
                                </Button>
                                <Button
                                    variant="outline"
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                                >
                                    View More
                                </Button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* Nail Services */}
            <div className="other">
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
                            <div className='other-list'>
                                <div className='other-list-item'>
                                    <p>Lash lift</p>
                                    <div className='other-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                                <div className='other-list-item'>
                                    <p>Eyebrow laminations</p>
                                    <div className='other-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                                <div className='other-list-item'>
                                    <p>Tin tin eyebrow and lashes</p>
                                    <div className='other-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                                <div className='other-list-item'>
                                    <p>Waxing eyebrows</p>
                                    <div className='other-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                            </div>
                            <div>
                                <button className='my-btn text-uppercase btn-primary-outline btn btn-outline'>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lashes Services */}
            <div className="lashes">
                <div className="lashes-bg">
                </div>
                <div className="lashes-form">
                    <div className="lashes-content">
                        <div className="lashes-content-form">
                            <h1 className="lashes-title">Lashes Services</h1>
                            <div className='lashes-list'>
                                <div className='lashes-list-item'>
                                    <p>Lash lift</p>
                                    <div className='lashes-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                                <div className='lashes-list-item'>
                                    <p>Eyebrow laminations</p>
                                    <div className='lashes-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                                <div className='lashes-list-item'>
                                    <p>Tin tin eyebrow and lashes</p>
                                    <div className='lashes-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                                <div className='lashes-list-item'>
                                    <p>Waxing eyebrows</p>
                                    <div className='lashes-list-dashed'></div>
                                    <p>12$</p>
                                </div>
                            </div>
                            <div>
                                <button className='my-btn text-uppercase btn-primary-outline btn btn-outline'>Book Now</button>
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
            <div className="booking py-5 my-5">
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
                <Step1
                ></Step1>
            </div>
            {/* Gallery */}
            <div className="gallery">
                <div className="gallery-form">
                    <h1 className="gallery-title">Gallery</h1>
                    <div className="gallery-img-form">
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={galleryFirst1} alt="Service" width={'100%'} />
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
            <div className="review py-5">
                <div className="review-form">
                    <div className="review-header">
                        <h1 className="review-intro">TESTEMONIALS THOUGHTS</h1>
                        <div className="review-title">Comments & Reviews</div>
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
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            className="review-mySwiper"
                        >
                            <SwiperSlide className="review-slide">
                                {({ isActive }) => (
                                    <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                        <div className="review-img">
                                            <img src={reviewUser} alt="Service" width={'100%'} />
                                        </div>
                                        <div className="review-user-name">John Mad</div>
                                        <div className="review-content">
                                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna.
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                            <SwiperSlide className="review-slide">
                                {({ isActive }) => (
                                    <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                        <div className="review-img">
                                            <img src={reviewUser} alt="Service" width={'100%'} />
                                        </div>
                                        <div className="review-user-name">John Mad</div>
                                        <div className="review-content">
                                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna.
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                            <SwiperSlide className="review-slide">
                                {({ isActive }) => (
                                    <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                        <div className="review-img">
                                            <img src={reviewUser} alt="Service" width={'100%'} />
                                        </div>
                                        <div className="review-user-name">John Mad</div>
                                        <div className="review-content">
                                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna.
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Comment and Review Responsive*/}
            <div className="review-res py-5">
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
                            <SwiperSlide className="review-slide">
                                {({ isActive }) => (
                                    <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                        <div className="review-img">
                                            <img src={reviewUser} alt="Service" width={'100%'} />
                                        </div>
                                        <div className="review-user-name">John Mad</div>
                                        <div className="review-content">
                                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna.
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                            <SwiperSlide className="review-slide">
                                {({ isActive }) => (
                                    <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                        <div className="review-img">
                                            <img src={reviewUser} alt="Service" width={'100%'} />
                                        </div>
                                        <div className="review-user-name">John Mad</div>
                                        <div className="review-content">
                                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna.
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                            <SwiperSlide className="review-slide">
                                {({ isActive }) => (
                                    <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                        <div className="review-img">
                                            <img src={reviewUser} alt="Service" width={'100%'} />
                                        </div>
                                        <div className="review-user-name">John Mad</div>
                                        <div className="review-content">
                                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna. Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna.
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
