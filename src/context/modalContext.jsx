import React from 'react';
import { Modal } from 'react-bootstrap';

export const ModalContext = React.createContext();

const ModalContainer = function ({ children }) {
    const [isModalShown, setIsModalShown] = React.useState(false);
    const [body, setBody] = React.useState(null);
    const [footer, setFooter] = React.useState(null);

    function openModal() {
        setIsModalShown(true);
    }
    function closeModal() {
        setIsModalShown(false);
    }

    let value = { openModal, closeModal, setBody, setFooter };
    return (
        <ModalContext.Provider value={value}>
            {children}
            {/* Modal */}
            <Modal show={isModalShown} onHide={closeModal} dialogClassName="modal-90w" size="lg">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>{footer}</Modal.Footer>
            </Modal>
            {/* OffCanvas */}
            {/* <Offcanvas ></Offcanvas> */}
        </ModalContext.Provider>
    );
};

export default ModalContainer;
