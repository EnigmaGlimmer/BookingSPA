import React from 'react';
import { useNavigate } from 'react-router-dom';
// style
import './navbar.css';

// Logo
import Logo from '../../logo/logo';
import { Button, Container, Form, Nav, NavDropdown, Offcanvas, Navbar } from 'react-bootstrap';
import { logout } from '../../../store/auth/action';

function AdminNavbar() {
    document.title = 'Little Daisy - Admin Dashboard';
    const navigate = useNavigate();
    return (
        <Navbar expand={'lg'} className="bg-main" style={{ borderBottom: '1px solid var(--clr-border)' }}>
            <Container fluid>
                <Navbar.Brand href="/">
                    <Logo></Logo>
                </Navbar.Brand>
                <Button
                    variant="outline"
                    onClick={() =>
                        logout().then((res) => {
                            navigate('/');
                        })
                    }
                >
                    Log out
                </Button>
                {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} /> */}
                {/* <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id={`offcanvasNavbarDropdown-expand-lg`}>
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas> */}
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;
