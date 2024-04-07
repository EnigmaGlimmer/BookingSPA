import React from 'react';

// React Bootstrap Components
import { Button, Col, Container, Form, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';

// DropDown Component
import DropdownMenu from './dropdown';

// Google Map

// logo
import { default as Logo } from '../logo/logo';

// css
import OffCanvasLogo from '../logo/offCanvasLogo';
import './navbar.css';

// icon
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoWhatsapp } from 'react-icons/bi';

// store
import { useContact } from '../../hooks/useContact';
import useService from '../../hooks/useServices';

const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627,
    },
    zoom: 11,
};

function Navigation() {
    const navRef = React.useRef(null);
    const togglerRef = React.useRef(null);

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [linkPosition, setLinkPosition] = React.useState(0);
    const [contactSidebar, showContactSidebar] = React.useState(false);

    const { services } = useService({
        request: {
            skip: 0,
            take: 3,
            flat: 0,
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
                        {/* <Nav.Link className="menu-link" data-active="false" href="/about">
                            About us
                        </Nav.Link> */}
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
                            boxShadow: '1px 2px 5px var(--clr-border)',
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
                                    overflowX: 'hidden',
                                    overflowY: 'scroll',
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
                        >
                            Services
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
                                show={showDropdown}
                            ></DropdownMenu>
                        </Nav.Link>
                        <Nav.Link className="px-2 menu-link" data-active="false" href="/promotion">
                            Promotion
                        </Nav.Link>
                        <Nav.Link className="px-2 menu-link" data-active="false" href="/booking">
                            <Button variant="outline" className="text-uppercase btn-primary-outline">
                                Book Now
                            </Button>
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
                Little Daisy, a fabulous salon for your beautiful Nails and Lashes
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
            {/* 
            <h3 className="text-center">Lorem ipsum dolor sit, consectetur adipiscing elit</h3>
            <br></br>
            <div className="line mb-2"></div> */}
            <Row className="justify-content-between py-3">
                <Col>
                    <p className="text-nowrap">E: {contact?.email}</p>
                    <p>P: {contact?.phone}</p>
                    <p>A: {contact?.address}</p>
                </Col>
                <Col>
                    <h4 className="text-start">Follow us</h4>
                    <Row className="mb-3 justify-content-start" style={{ flexWrap: 'nowrap' }}>
                        <Col className="col-auto">
                            <a href={contact?.facebook} target="_blank">
                                <BiLogoFacebookCircle style={{ fontSize: '25px' }}></BiLogoFacebookCircle>
                            </a>
                        </Col>
                        <Col className="col-auto">
                            <a href={contact?.whatsapp} target="_blank">
                                <BiLogoWhatsapp style={{ fontSize: '25px' }}></BiLogoWhatsapp>
                            </a>
                        </Col>
                        <Col className="col-auto">
                            <a href={contact?.instagram} target="_blank">
                                <BiLogoInstagram style={{ fontSize: '25px' }}></BiLogoInstagram>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div style={{ height: '100%', maxHeight: '220px', width: '100%' }}>
                {/* <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
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
        </>
    );
}

export default Navigation;
