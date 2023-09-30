import React, { useEffect, useLayoutEffect, useRef } from 'react';

// style
import './sidebar.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

function Sidebar({ children }) {
    const [toggle, setToggle] = React.useState(true);
    const leftSidebar = useRef(null);
    let [rightContentStyle, setRightContentStyle] = React.useState(null);

    useEffect(() => {
        if (leftSidebar.current) {
            rightContentStyle = {
                width: `calc(100% - ${leftSidebar.current.getBoundingClientRect().width}px)`,
                overflowX: 'scroll',
            };

            setRightContentStyle(rightContentStyle);
        }
    }, [leftSidebar.current]);

    return (
        <div>
            <div className="sbar-admin-form" style={{ flexWrap: 'nowrap', maxWidth: '100vw' }}>
                <span className="" id="sidebar" ref={leftSidebar}>
                    <div className={toggle ? `list-link-admin` : `list-link-admin sidebar-hide`}>
                        <div onClick={() => setToggle((e) => !e)} style={{ cursor: 'pointer' }}>
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
                </span>
                <span className="sidebar-item-2" style={rightContentStyle}>
                    {children}
                </span>
            </div>
        </div>
    );
}

export default Sidebar;
