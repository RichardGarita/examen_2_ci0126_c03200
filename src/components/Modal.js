// Modal.js
import React from 'react';

export default function Modal ({ id, content, buttonRef, button, title }) {
    const closeModal = () => {
        buttonRef.current.click();
    }

  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close">
                </button>
            </div>
            <div className="modal-body">
                {content}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                {button ? button : ''}
            </div>
            </div>
        </div>
    </div>
  );
};
