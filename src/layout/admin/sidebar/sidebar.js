import React from 'react';

// style
import './sidebar.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar({ children }) {
    return (
        <div>
            <Row className="h-100" id="sidebar-container" style={{ flexWrap: 'nowrap' }}>
                <Col sm="auto" id="sidebar">
                    <ul className="list-style-none ">
                        <li>
                            <Link className="link-text" to="/admin/blog">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link className="link-text" to="/admin/uploads">
                                Uploaded Images
                            </Link>
                        </li>
                        <li>
                            <Link className="link-text" to="/admin/testimonials">
                                Testimonicals
                            </Link>
                        </li>
                        <li>
                            <Link className="link-text" to="/admin/web">
                                Web Content
                            </Link>
                        </li>
                        <li>
                            <Link className="link-text" to="/admin/services">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link className="link-text" to="/admin/booking">
                                Booking
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col style={{ backgroundColor: 'var(--clr-background)' }}>{children}</Col>
            </Row>
        </div>
    );
}

export default Sidebar;
