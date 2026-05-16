import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
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
  const { theme } = useContext(ThemeContext);

  return (
    <div className="deletion__layer">
      <div
        className={
          theme === "light"
            ? "deletion__window"
            : "deletion__window deletion__window--dark"
        }
      >
        <div className="deletion__content">
          <h1
            className={
              theme === "light"
                ? "deletion__content-heading"
                : "deletion__content-heading deletion__content-heading--dark"
            }
          >
            Confirm deletion
          </h1>
          <p
            className={
              theme === "light"
                ? "deletion__content-text"
                : "deletion__content-text deletion__content-text--dark"
            }
          >
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
