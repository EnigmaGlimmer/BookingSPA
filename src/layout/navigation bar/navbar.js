import React, { useEffect } from 'react';

// React Bootstrap Components
import { Button, Col, Container, Form, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';

// DropDown Component
import DropdownMenu from './dropdown';

// Google Map
import GoogleMapReact from 'google-map-react';

// logo
import { default as Logo } from '../logo/logo';

// css
import './navbar.css';
import OffCanvasLogo from '../logo/offCanvasLogo';

// icon
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoWhatsapp } from 'react-icons/bi';

// store
import { useDispatch, useSelector } from 'react-redux';
import { getService } from '../../store/actions';
import { useContact } from '../../hooks/useContact';
import useService from '../../hooks/useServices';

const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627,
    },
    zoom: 11,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Navigation() {
    const navRef = React.useRef(null);
    const togglerRef = React.useRef(null);

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [linkPosition, setLinkPosition] = React.useState(0);
    const [contactSidebar, showContactSidebar] = React.useState(false);

    const { services } = useService({
        request: {
            skip: 0,
            take: 2,
        },
    });

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            id="nav"
            ref={navRef}
            onMouseLeave={() => {
                if (showDropdown) {
                    setShowDropdown(false);
                }
            }}
        >
            <Container fluid>
                <Navbar.Collapse id="main-nav" className="d-lg-flex">
                    <Nav className="text-uppercase">
                        <Nav.Link className="menu-link" data-active="false" href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="menu-link" data-active="false" href="/about">
                            About us
                        </Nav.Link>
                        <Nav.Link
                            className="menu-link"
                            data-active="false"
                            onClick={(e) => {
                                setShowDropdown((i) => !i);
                                setLinkPosition(e.currentTarget.getBoundingClientRect().left);
                            }}
                        >
                            Services
                        </Nav.Link>
                        <Nav.Link className="menu-link" data-active="false" href="/promotion">
                            Promotion
                        </Nav.Link>
                    </Nav>
                    <DropdownMenu
                        submenu={
                            services
                                ?.filter((s) => {
                                    return s.parentId === 0;
                                })
                                .map?.((service) => ({
                                    title: service?.serviceName,
                                    link: `service?name=${service?.serviceName}`,
                                    childs: service?.childs?.map?.((c) => ({
                                        title: c?.serviceName,
                                        link: `service?name=${c?.serviceName}`,
                                    })),
                                })) || []
                        }
                        styleContainer={{
                            position: 'absolute',
                            top: navRef?.current?.getBoundingClientRect?.()?.height,
                            left: linkPosition,
                        }}
                        show={showDropdown}
                    ></DropdownMenu>
                </Navbar.Collapse>

                <Navbar.Brand className="me-auto" href="/">
                    <Logo></Logo>
                </Navbar.Brand>

                <Navbar.Collapse id="secondary-nav" className="d-lg-flex">
                    <Nav className="ms-auto">
                        <Form className="d-flex position-relative me-2 align-items-center">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="position-relative"
                                aria-label="Search"
                                id="global-search"
                            />
                            <div className="position-absolute top-50 end-0 search-icon">
                                <div id="gls"></div>
                            </div>
                        </Form>
                        <Nav.Link href="/booking" className="d-flex align-items-center">
                            <Button variant="outline" className="text-uppercase btn-primary-outline">
                                Book Now
                            </Button>
                        </Nav.Link>
                        <Nav.Link
                            eventKey={2}
                            onClick={() => showContactSidebar(true)}
                            className="text-uppercase d-flex align-items-center"
                        >
                            Contact
                        </Nav.Link>
                        <Offcanvas
                            show={contactSidebar}
                            placement="end"
                            onHide={() => showContactSidebar(false)}
                            style={{
                                backgroundColor: 'var(--clr-darker-background)',
                                width: '30rem',
                            }}
                        >
                            <Offcanvas.Header closeButton></Offcanvas.Header>
                            <Offcanvas.Body
                                style={{
                                    overflow: 'hidden',
                                }}
                            >
                                <Contact></Contact>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Toggle
                    children={
                        <div className="nav-hamburger text-uppercase">
                            <span>menu</span>
                        </div>
                    }
                    aria-controls="mobile-nav-menu"
                    ref={togglerRef}
                    style={{ border: 'none' }}
                />

                <Navbar.Collapse
                    id="mobile-nav-menu"
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: !!navRef?.current ? `${navRef?.current?.getBoundingClientRect?.()?.height}px` : '88px',
                        width: '100%',
                        zIndex: 100,
                    }}
                >
                    <Nav className="text-uppercase">
                        <Nav.Link className="px-2 menu-link" data-active="false" href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="px-2 menu-link" data-active="false" href="/about">
                            About us
                        </Nav.Link>
                        <Nav.Link
                            className="px-2 menu-link"
                            data-active="false"
                            onClick={(e) => {
                                setShowDropdown((i) => !i);
                                setLinkPosition(e.currentTarget.getBoundingClientRect().left);
                            }}
                            onMouseOver={(e) => {
                                console.log(e.currentTarget.getBoundingClientRect());
                            }}
                        >
                            Services
                        </Nav.Link>
                        <Nav.Link className="px-2 menu-link" data-active="false" href="/promotion">
                            Promotion
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Contact() {
    const contact = useContact();
    return (
        <>
            <div className="text-center">
                <OffCanvasLogo></OffCanvasLogo>
            </div>
            <p className="mt-5 px-4 text-center mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna.
            </p>
            <div>
                <Form className="d-flex position-relative align-items-center">
                    <Form.Control
                        type="search"
                        placeholder="Your phone number"
                        className="position-relative me-2"
                        aria-label="Search"
                        id="global-search"
                    />
                    <Button variant="outline" className="text-uppercase btn-primary-outline">
                        Subscribe
                    </Button>
                </Form>
            </div>

            <br></br>
            <br></br>

            <h3 className="text-center">Lorem ipsum dolor sit, consectetur adipiscing elit</h3>
            <br></br>
            <div className="line mb-2"></div>
            <Row className="justify-content-between py-3">
                <Col>
                    <p className="text-nowrap">E: {contact?.email}</p>
                    <p>P: {contact?.phone}</p>
                </Col>
                <Col>
                    <h4 className="text-end">Follow us</h4>
                    <Row className="mb-3 justify-content-end" style={{ flexWrap: 'nowrap' }}>
                        <Col className="col-auto">
                            <a href={contact?.facebook} target="_blank">
                                <BiLogoFacebookCircle></BiLogoFacebookCircle>
                            </a>
                        </Col>
                        <Col className="col-auto">
                            <a href={contact?.whatsapp} target="_blank">
                                <BiLogoWhatsapp></BiLogoWhatsapp>
                            </a>
                        </Col>
                        <Col className="col-auto">
                            <a href={contact?.instagram} target="_blank">
                                <BiLogoInstagram></BiLogoInstagram>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div style={{ height: '100%', maxHeight: '220px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
                </GoogleMapReact>
            </div>
        </>
    );
}

export default Navigation;
