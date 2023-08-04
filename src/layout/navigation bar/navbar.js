import React, { useEffect } from 'react';

// React Bootstrap Components
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

// DropDown Component
import DropdownMenu from './dropdown';

// logo
import { default as Logo } from '../logo/logo';

// css
import './navbar.css';

function Navigation() {
    const navRef = React.useRef(null);
    const togglerRef = React.useRef(null);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [linkPosition, setLinkPosition] = React.useState(0);

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
                        submenu={[
                            { title: 'Nail', link: 'nail' },
                            { title: 'Popeye', link: 'popeye' },
                        ]}
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
                        <Nav.Link eventKey={2} href="/contact" className="text-uppercase d-flex align-items-center">
                            Contact
                        </Nav.Link>
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
                                // setShowDropdown(false);
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

export default Navigation;
