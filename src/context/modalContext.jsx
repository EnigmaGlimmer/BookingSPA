import React from 'react';
import { Modal } from 'react-bootstrap';

export const ModalContext = React.createContext();

const ModalContainer = function ({ children }) {
    const [isModalShown, setIsModalShown] = React.useState(false);
    const [body, setBody] = React.useState(null);
    const [footer, setFooter] = React.useState(null);
    const [modalProps, setModalProps] = React.useState({
        dialogClassName: 'modal-90w',
        size: 'lg',
    });
    function openModal({ bodyComponent, footerComponent, modalProps }) {
        if (bodyComponent) {
            setBody(bodyComponent);
        }

        if (footerComponent) {
            setFooter(footerComponent);
        }

        if (modalProps) {
            setModalProps(modalProps);
        }

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
            <Modal show={isModalShown} onHide={closeModal} {...modalProps}>
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
