import { ModalContext } from 'context/modalContext';
import React from 'react';

export default function useModalContext() {
    return React.useContext(ModalContext);
}
