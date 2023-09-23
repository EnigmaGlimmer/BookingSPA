import React from 'react';
import { Modal } from 'react-bootstrap';

function Event({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <img src="https://scontent.fdad1-1.fna.fbcdn.net/v/t1.15752-9/381116028_679508397459752_7103627738005255895_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=eGr1gyM3q7sAX8pi35A&_nc_ht=scontent.fdad1-1.fna&oh=03_AdRPwJTDu2J7m6IpsnSHoznLU4IwUWqAeLJZBT27aByCDg&oe=6534AE5A"></img>
            </Modal.Body>
        </Modal>
    );
}

export default Event;
