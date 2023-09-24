import React from 'react';

// React Bootstrap
import { Col, Container, Row } from 'react-bootstrap';

// React Icon
import { BiLogoFacebookCircle, BiLogoWhatsapp, BiLogoInstagram } from 'react-icons/bi';

// Google Map
import GoogleMapReact from 'google-map-react';

// Full Logo
import FullLogo from '../logo/fulllogo';

// Css
import './footer.css';
import useService from '../../hooks/useServices';
import { Link } from 'react-router-dom';
import { useContact } from '../../hooks/useContact';

const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627,
    },
    zoom: 11,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Footer() {
    const { services } = useService({
        request: {
            skip: 1,
            take: 10,
            flat: 0,
        },
    });
    const contact = useContact();

    return (
        <section id="footer">
            <Container className="py-5">
                <Row className="align-items-stretch">
                    <Col sm="12" xl="4" className="text-sm-center text-xl-start">
                        <FullLogo></FullLogo>
                        <p className="mt-5">Little Daisy, a fabulous salon for your beautiful Nails and Lashes</p>
                        <p>
                            <b>Phone: </b>
                            {contact?.phone}
                        </p>
                        <p>
                            <b>Email: </b>
                            {contact?.email}
                        </p>
                        <p>
                            <b>Address: </b>
                            {contact?.address}
                        </p>
                        <div className="row justify-content-between">
                            <div className="col-auto">
                                <b>Opening hours: </b>
                            </div>
                            <ul className="col">
                                <div>
                                    <b>Monday - Saturday</b> (9:00am - 5:30pm)
                                </div>
                                <div>
                                    <b>Sunday</b> (Closed)
                                </div>
                            </ul>
                        </div>
                    </Col>
                    <Col sm="6" md="6" xl="2">
                        <h3
                            style={{
                                fontFamily: 'var(--ff-secondary)',
                            }}
                        >
                            Little Daisy
                        </h3>
                        <ul>
                            <li>
                                <Link to={{ pathname: '/' }} className="link-text">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: '/about' }} className="link-text">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: '/promotion' }} className="link-text">
                                    Promotion
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: '/' }} className="link-text">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col sm="6" md="6" xl="2">
                        <h3>Services</h3>
                        <ul>
                            {services.map((s, index) => {
                                return (
                                    <li key={index}>
                                        <a href={`service?name=${s.serviceName}`} className="link-text">
                                            {s?.serviceName}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <Row className="mb-3" style={{ flexWrap: 'nowrap' }}>
                            <Col className="col-auto">
                                <Link to={contact?.facebook} className="link-text">
                                    <BiLogoFacebookCircle className="footer-icon"></BiLogoFacebookCircle>
                                </Link>
                            </Col>
                            <Col className="col-auto">
                                <Link to={contact?.whatsapp} className="link-text">
                                    <BiLogoWhatsapp className="footer-icon"></BiLogoWhatsapp>
                                </Link>
                            </Col>
                            <Col className="col-auto">
                                <Link to={contact?.instagram} className="link-text">
                                    <BiLogoInstagram className="footer-icon"></BiLogoInstagram>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12" xl="4">
                        <div style={{ height: '100%', minHeight: '220px', width: '100%' }}>
                            {/* <GoogleMapReact
                                bootstrapURLKeys={{ key: '' }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                            >
                                <AnyReactComponent lat={contact?.latitude} lng={contact?.longitude} text="My Marker" />
                            </GoogleMapReact> */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3529.8036160342012!2d153.24845617542178!3d-27.78502463021494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9114d885e4b223%3A0xefdd05d77f169d55!2s11c%2F3%20Vaughan%20Dr%2C%20Ormeau%20QLD%204208%2C%20Australia!5e0!3m2!1sen!2sus!4v1695542549952!5m2!1sen!2sus"
                                width="100%"
                                height="auto"
                                style={{
                                    minHeight: '320px',
                                    border: 0,
                                }}
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <div id="copyright" className="py-2 text-center">
                <p>Fabulous salon theme. Just as stunning as your nail art! @Copyright by Catmedia</p>
            </div> */}
        </section>
    );
}

export default Footer;
