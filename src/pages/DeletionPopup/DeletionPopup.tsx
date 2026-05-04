import "./Deletionpopup.scss";

type DeletionPopupProps = {
  invoiceCode: string;
  handleCloseDelete: () => void;
  handleConfirmDelete: () => void;
};

export default function DeletionPopup({
  handleCloseDelete,
  invoiceCode,
  handleConfirmDelete,
}: DeletionPopupProps) {
  return (
    <div className="deletion__layer">
      <div className="deletion__window">
        <div className="deletion__content">
          <h1 className="deletion__content-heading">Confirm deletion</h1>
          <p className="deletion__content-text">
            Are you sure you want to delete invoice #{invoiceCode}? This action
            cannot be undone
          </p>
          <div className="deletion__content-buttons">
            <button
              type="button"
              className="deletion-button deletion-button--cancel"
              onClick={handleCloseDelete}
            >
              Cancel
            </button>
            <button
              type="button"
              className="deletion-button deletion-button--delete"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
