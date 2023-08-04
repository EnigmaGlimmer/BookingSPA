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

const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627,
    },
    zoom: 11,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Footer() {
    return (
        <section id="footer">
            <Container>
                <Row className="align-items-stretch">
                    <Col sm="12" xl="4" className="text-sm-center text-xl-start">
                        <FullLogo></FullLogo>
                        <p className="mt-5">Little Daisy, a fabulous salon theme. Just as stunning as your nail art!</p>
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
                            <li>Home</li>
                            <li>About us</li>
                            <li>Services</li>
                            <li>Promotion</li>
                            <li>Contact</li>
                        </ul>
                    </Col>
                    <Col sm="6" md="6" xl="2">
                        <h3>Services</h3>
                        <ul>
                            <li>Nails Art</li>
                            <li>Lashes</li>
                            <li>Booking</li>
                        </ul>
                        <Row className="mb-3" style={{ flexWrap: 'nowrap' }}>
                            <Col className="col-auto">
                                <BiLogoFacebookCircle></BiLogoFacebookCircle>
                            </Col>
                            <Col className="col-auto">
                                <BiLogoWhatsapp></BiLogoWhatsapp>
                            </Col>
                            <Col className="col-auto">
                                <BiLogoInstagram></BiLogoInstagram>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12" xl="4">
                        <div style={{ height: '100%', minHeight: '220px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: '' }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                            >
                                <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
                            </GoogleMapReact>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Footer;
