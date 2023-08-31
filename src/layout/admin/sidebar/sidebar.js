import React from 'react';

// style
import './sidebar.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

function Sidebar({ children }) {
    const [toggle, setToggle] = React.useState(true);
    return (
        <div>
            <Row className="h-100" id="sidebar-container" style={{ flexWrap: 'nowrap' }}>
                <Col sm="auto" className="" id="sidebar">
                    <div className={toggle ? `list-link-admin` : `list-link-admin sidebar-hide`}>
                        <div onClick={() => setToggle((e) => !e)}>
                            <AiFillLeftCircle
                                className={toggle ? `sidebar-toggle` : `sidebar-toggle right-side`}
                            ></AiFillLeftCircle>
                        </div>
                        <Link className="link-text" to="/admin/blog">
                            Blog
                        </Link>
                        <Link className="link-text" to="/admin/uploads">
                            Uploaded Images
                        </Link>
                        <Link className="link-text" to="/admin/testimonials">
                            Testimonicals
                        </Link>
                        <Link className="link-text" to="/admin/web">
                            Web Content
                        </Link>
                        <Link className="link-text" to="/admin/services">
                            Services
                        </Link>
                        <Link className="link-text" to="/admin/booking">
                            Booking
                        </Link>
                    </div>
                </Col>
                <Col style={{ backgroundColor: 'var(--clr-background)' }}>{children}</Col>
            </Row>
        </div>
    );
}

export default Sidebar;
