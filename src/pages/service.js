import React, { useEffect } from 'react';

import './style/service.css';
import service from '../config/content/service.json';
import useService from '../hooks/useServices';
import { Link, useSearchParams } from 'react-router-dom';

// DOMPurify
import * as DOMPurify from 'dompurify';
import { useContact } from '../hooks/useContact';

function Service() {
    const [searchParams] = useSearchParams();

    const { blog } = useService({
        selectedPostName: searchParams?.get?.('name'),
        request: {
            skip: 0,
            take: 100,
        },
    });

    const contact = useContact();

    useEffect(() => {}, [searchParams]);

    if (!searchParams.get('name')) {
        return;
    }

    return (
        <div>
            {/* Service Banner */}
            <div className="service-banner container py-5" id="st-banner">
                {/* <div className="mx-auto">
                    <img src={serviceBanner} alt="service-banner" width={'100%'} />
                </div> */}
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
                            ADD: {contact?.address} <span className="about-image-store-btn">VIEW MAPS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
