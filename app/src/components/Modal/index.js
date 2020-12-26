import React, {useState} from 'react';

// Components

const Modal = ({hideModal, toggleModal, children}) => {
    if(hideModal) return null;

    return [
        <div key="overlay" className="modal-overlay" onClick={() => toggleModal()} />,
        <div key="modal" className="modal-wrapper">
            <div className="modal">
                {children}
            </div>
        </div>
    ];
};

export default Modal;
