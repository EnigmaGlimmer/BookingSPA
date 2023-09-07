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
            <div className="h-100" id="sidebar-container" style={{ flexWrap: 'nowrap' }}>
                <div className="" id="sidebar">
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
                </div>
                <div className="sidebar-item-2">{children}</div>
            </div>
        </div>
    );
}

export default Sidebar;
