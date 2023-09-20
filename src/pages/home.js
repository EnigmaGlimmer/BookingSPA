import React from 'react';

import * as DOMPurify from 'dompurify';

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

import BookingPage from './booking';

// Content
// import home from '../config/content/home.json';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList } from '../store/settings/action';
import { getService } from '../store/actions';
import { Link } from 'react-router-dom';

function Home() {
    document.title = 'Little Daisy - Home';
    const dispatch = useDispatch();

    const { home } = useSelector((state) => {
        return {
            home: state.Setting?.setting?.content?.home,
        };
    });

    const { services } = useSelector((state) => {
        return {
            services: state?.Service?.services || [],
        };
    });

    React.useEffect(() => {
        dispatch(getSettingList('home'));
        dispatch(
            getService({
                take: 100,
                skip: 1,
            }),
        );
    }, [dispatch]);

    return (
        <section>
            {/* Banner */}
            <div className="banner" id="st-hero">
                <h1 className="banner-title">{home?.hero?.title}</h1>
                <h2>{home?.hero?.subtitle}</h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(home?.hero?.content),
                    }}
                ></p>

                <div className="banner-img">
                    <div className="banner-img-big">
                        <img alt="banner" src={home?.hero?.images?.[0] || bannerBig} width={'100%'} loading="lazy" />
                    </div>
                    <div className="banner-img-extra">
                        <div className="banner-img-flower">
                            <img alt="banner" src={homeFlowerDeco} width={'100%'} loading="lazy" />
                        </div>
                        <div className="banner-img-small">
                            <img
                                alt="banner"
                                src={home?.hero?.childImage?.[0] || bannerSmall}
                                width={'100%'}
                                loading="lazy"
                            />
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
                                <img alt="intro" src={introBig} width={'100%'} loading="lazy" />
                            </div>
                            <div className="intro-img-small">
                                <img alt="intro" src={introSmall} width={'100%'} loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="intro-content">
                        <div className="intro-img-flower-top">
                            <img alt="deco" src={homeFlowerDeco} width={'100%'} loading="lazy" />
                        </div>
                        <div className="intro-content-form">
                            <div>
                                <h6>{home?.intro?.subtitle}</h6>
                                <h2 className="intro-title">{home?.intro?.title}</h2>
                            </div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(home?.intro?.content),
                                }}
                            ></p>
                            <div>
                                <h5>{home?.intro?.child?.title}</h5>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(home?.intro?.child?.content),
                                    }}
                                ></p>
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
                            <img alt="deco" src={homeFlowerDeco} width={'100%'} loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Three Service */}
            <div className="three">
                <div className="three-form">
                    <div className="nail-care" id="st-messages1">
                        <div className="nail-care-img">
                            <img src={nailCare} alt="nail care" width={'100%'} loading="lazy" />
                        </div>
                        <div className="nail-care-title">{home?.messages1?.title}</div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(home?.messages1?.content),
                            }}
                        ></p>
                    </div>
                    <div className="nail-care" id="st-messages2">
                        <div className="nail-care-img">
                            <img src={nailArt} alt="nail care" width={'100%'} loading="lazy" />
                        </div>
                        <div className="nail-care-title">{home?.messages2?.title}</div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(home?.messages2?.content),
                            }}
                        ></p>
                    </div>
                    <div className="nail-care" id="st-messages3">
                        <div className="nail-care-img">
                            <img src={bestLashes} alt="nail care" width={'100%'} loading="lazy" />
                        </div>
                        <div className="nail-care-title">{home?.messages3?.title}</div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(home?.messages3?.content),
                            }}
                        ></p>
                    </div>
                </div>
            </div>
            {/* Service Quality */}
            <div className="quality" id="st-introServices">
                <div className="quality-form">
                    <h1 className="quality-title">{home?.introServices?.title}</h1>
                </div>
            </div>
            {/* Nail Services */}
            <div className="other" id="st-nailService">
                <div className="other-bg">
                    <div className="other-img-flower">
                        <img alt="deco" src={homeFlowerDeco} width={'100%'} loading="lazy" />
                    </div>
                </div>
                <div className="other-form">
                    <div className="other-img">
                        <div className="other-img-form">
                            <div className="other-img-big">
                                <img src={otherBig} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                            <div className="other-img-small">
                                <img src={otherSmall} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="other-content">
                        <div className="other-content-form">
                            <h1 className="other-title">Nail Services</h1>
                            <div className="other-list">
                                {services
                                    ?.find?.((e) => e.serviceId === 1 || e.serviceName === 'Nail')
                                    ?.childs?.slice(0, 5)
                                    ?.map?.((item, index) => {
                                        return (
                                            <div className="other-list-item" key={index}>
                                                <p>{item.serviceName}</p>
                                                <div className="other-list-dashed"></div>
                                                {/* <p>{item.price}$</p> */}
                                                <p>-20%</p>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div>
                                <div className="btn-frame-dark">
                                    <Link to="/booking" className="link-text">
                                        <button className="my-btn text-uppercase btn-primary-outline btn btn-outline btn-dark">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
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
                                {services
                                    ?.find?.((e) => {
                                        console.log(e.serviceId, e.serviceName);
                                        return e.serviceId === 3 || e.serviceName === 'Lashes';
                                    })
                                    ?.childs?.slice?.(0, 5)
                                    ?.map?.((item, index) => {
                                        return (
                                            <div className="other-list-item" key={index}>
                                                <p>{item.serviceName}</p>
                                                <div className="other-list-dashed"></div>
                                                <p>{item.price}$</p>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div>
                                <div className="btn-frame-dark">
                                    <Link to="/booking" className="link-text">
                                        <button className="my-btn text-uppercase btn-primary-outline btn btn-outline btn-dark">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lashes-img">
                        <div className="lashes-img-form">
                            <div className="lashes-img-big">
                                <img src={lashesServices} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                            <div className="lashes-img-small">
                                <img src={lahesSercviceBottom} alt="Service" width={'100%'} loading="lazy" />
                                <div className="lashes-img-flower">
                                    <img alt="deco" src={homeFlowerDeco} width={'100%'} loading="lazy" />
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
                                <img src={galleryFirst1} width={'100%'} loading="lazy" />
                            </div>
                            <div className="gallery-img-2">
                                <img src={galleryFirst2} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                        </div>
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={gallerySecond1} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                            <div className="gallery-img-2">
                                <img src={gallerySecond2} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                        </div>
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={galleryThird1} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                            <div className="gallery-img-2">
                                <img src={galleryThird2} alt="Service" width={'100%'} loading="lazy" />
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
                        <h1 className="review-intro">{home?.testimonials?.subtitle}</h1>
                        <div className="review-title">{home?.testimonials?.title}</div>
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
                            {home?.testimonials?.review?.map((item, index) => {
                                return (
                                    <SwiperSlide className="review-slide" key={index}>
                                        {({ isActive }) => (
                                            <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                                <div className="review-img">
                                                    <img src={reviewUser} alt="Service" width={'100%'} loading="lazy" />
                                                </div>
                                                <div className="review-user-name">{item?.title}</div>
                                                <div
                                                    className="review-content"
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(item?.content),
                                                    }}
                                                ></div>
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
                            {home?.testimonials?.child?.map?.((item, index) => {
                                return (
                                    <SwiperSlide className="review-slide" key={index}>
                                        {({ isActive }) => (
                                            <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                                <div className="review-img">
                                                    <img src={reviewUser} alt="Service" width={'100%'} loading="lazy" />
                                                </div>
                                                <div className="review-user-name">{item?.title}</div>
                                                <div
                                                    className="review-content"
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(item?.content),
                                                    }}
                                                ></div>
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
