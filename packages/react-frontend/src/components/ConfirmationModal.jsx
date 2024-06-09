// src/components/ConfirmationModal.jsx
import React from "react";
import "../styles/ConfirmationModal.css";

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            className="confirm-button"
            onClick={() => {
              onConfirm();
            }}
          >
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
