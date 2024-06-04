// src/components/DeleteConfirmationModal.css
import React from "react";
import "../styles/DeleteConfirmationModal.css";

function DeleteConfirmationModal({ task, onClose, onConfirm }) {
  return (
    <div className="delete-confirmation-modal-overlay">
      <div style={{ fontWeight: "500" }} className="delete-confirmation-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the task "{task.name}"?</p>
        <div className="delete-confirmation-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
