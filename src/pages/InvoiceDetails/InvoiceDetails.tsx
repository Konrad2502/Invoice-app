import "./InvoiceDetails.scss";
import arrowLeft from "../../assets/icon-arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectInvoiceById } from "../../features/invoices/invoicesSelectors";
import { formatDueDate } from "../../utilis/date";
import { useAppDispatch } from "../../store/hooks";
import {
  markInvoiceAsPaid,
  deleteInvocie,
} from "../../features/invoices/invoicesSlice";
import type { InvoiceDrawerMode } from "../InvoiceDrawer/InvoiceDrawer";
import DeletionPopup from "../DeletionPopup/DeletionPopup";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type InvoiceDetailsProps = {
  setDrawerMode: (mode: InvoiceDrawerMode) => void;
  setEditingInvoiceId: (id: number | null) => void;
};

export default function InvoiceDetails({
  setDrawerMode,
  setEditingInvoiceId,
}: InvoiceDetailsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const invoiceId = Number(id);
  const invoice = useAppSelector((state) =>
    Number.isFinite(invoiceId) ? selectInvoiceById(state, invoiceId) : null,
  );
  console.log(invoice);
  if (!invoice) {
    return null;
  }

  const handleMarkAsPaid = (id: number) => {
    dispatch(markInvoiceAsPaid(id));
  };

  const handleEditInvoice = () => {
    setEditingInvoiceId(invoice.id);
    setDrawerMode("edit");
    console.log("nacisnieto edit");
  };
  console.log(invoice.id);

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteInvocie(invoice.id));
    setIsDeleteOpen(false);
    navigate("/");
  };

  return (
    <section
      className={
        theme === "light"
          ? "invoice-details"
          : "invoice-details invoice-details--dark"
      }
    >
      <div className="invoice-details__content">
        <button
          className="invoice-details__back"
          type="button"
          onClick={() => navigate("/")}
        >
          <img className="invoice-details__back-icon" src={arrowLeft} alt="" />
          <span
            className={
              theme == "light"
                ? "invoice-details__back-text"
                : "invoice-details__back-text invoice-details__back-text--dark"
            }
          >
            Go back
          </span>
        </button>

        <div
          className={
            theme === "light"
              ? "invoice-details__status-bar"
              : "invoice-details__status-bar invoice-details__status-bar--dark"
          }
        >
          <div className="invoice-details__status-left">
            <span className="invoice-details__status-label">Status</span>

            <div
              className={`invoice-details__badge invoice-details__badge--${invoice.status}`}
            >
              <span
                className={`invoice-details__dot invoice-details__dot--${invoice.status}`}
              />
              <span className="invoice-details__badge-text">
                {invoice.status}
              </span>
            </div>
          </div>

          <div className="invoice-details__actions">
            <button
              className="invoice-details__btn invoice-details__btn--edit"
              type="button"
              onClick={handleEditInvoice}
              disabled={invoice.status === "paid"}
            >
              {invoice.status === "paid" ? "Cannot edit" : "Edit"}
            </button>
            <button
              className="invoice-details__btn invoice-details__btn--delete"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="invoice-details__btn invoice-details__btn--mark"
              type="button"
              onClick={() => handleMarkAsPaid(invoice.id)}
              disabled={invoice.status === "draft" || invoice.status === "paid"}
            >
              {invoice.status === "draft" || invoice.status === "paid"
                ? "Cannot mark draft"
                : "Mark as Paid"}
            </button>
          </div>
        </div>

        <div
          className={
            theme === "light"
              ? "invoice-details__card"
              : "invoice-details__card invoice-details__card--dark"
          }
        >
          <div className="invoice-details__top">
            <div className="invoice-details__code">
              <p
                className={
                  theme === "light"
                    ? "invoice-details__code-id"
                    : "invoice-details__code-id invoice-details__code-id--dark"
                }
              >
                <span
                  className={
                    theme === "light"
                      ? "invoice-details__hash"
                      : "invoice-details__hash invoice-details__hash--dark"
                  }
                >
                  #
                </span>
                {invoice?.code}
              </p>
              <p
                className={
                  theme === "light"
                    ? "invoice-details__code-desc"
                    : "invoice-details__code-desc invoice-details__code-desc--dark"
                }
              >
                {invoice.description}
              </p>
            </div>

            <div className="invoice-details__sender">
              <p
                className={
                  theme === "light"
                    ? "invoice-details__small"
                    : "invoice-details__small invoice-details__small--dark"
                }
              >
                {invoice.senderAddress.street}
              </p>
              <p
                className={
                  theme === "light"
                    ? "invoice-details__small"
                    : "invoice-details__small invoice-details__small--dark"
                }
              >
                {invoice.senderAddress.city}
              </p>
              <p
                className={
                  theme === "light"
                    ? "invoice-details__small"
                    : "invoice-details__small invoice-details__small--dark"
                }
              >
                {invoice.senderAddress.postCode}
              </p>
              <p
                className={
                  theme === "light"
                    ? "invoice-details__small"
                    : "invoice-details__small invoice-details__small--dark"
                }
              >
                {invoice.senderAddress.country}
              </p>
            </div>
          </div>

          <div className="invoice-details__middle">
            <div className="invoice-details__dates">
              <div className="invoice-details__block">
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__label"
                      : "invoice-details__label invoice-details__label--dark"
                  }
                >
                  Invoice Date
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__value"
                      : "invoice-details__value invoice-details__value--dark"
                  }
                >
                  {formatDueDate(invoice.createdAt)}
                </p>
              </div>

              <div className="invoice-details__block">
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__label"
                      : "invoice-details__label invoice-details__label--dark"
                  }
                >
                  Payment Due
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__value"
                      : "invoice-details__value invoice-details__value--dark"
                  }
                >
                  {formatDueDate(invoice.paymentDue)}
                </p>
              </div>
            </div>

            <div className="invoice-details__billto">
              <p
                className={
                  theme === "light"
                    ? "invoice-details__label"
                    : "invoice-details__label invoice-details__label--dark"
                }
              >
                Bill To
              </p>
              <p
                className={
                  theme === "light"
                    ? "invoice-details__value"
                    : "invoice-details__value invoice-details__value--dark"
                }
              >
                {invoice.clientName}
              </p>
              <div className="invoice-details__address">
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__small"
                      : "invoice-details__small invoice-details__small--dark"
                  }
                >
                  {invoice.clientAddress.street}
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__small"
                      : "invoice-details__small invoice-details__small--dark"
                  }
                >
                  {invoice.clientAddress.city}
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__small"
                      : "invoice-details__small invoice-details__small--dark"
                  }
                >
                  {invoice.clientAddress.postCode}
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__small"
                      : "invoice-details__small invoice-details__small--dark"
                  }
                >
                  {invoice.clientAddress.country}
                </p>
              </div>
            </div>

            <div className="invoice-details__sentto">
              <p
                className={
                  theme === "light"
                    ? "invoice-details__label"
                    : "invoice-details__label invoice-details__label--dark"
                }
              >
                Sent to
              </p>
              <p
                className={
                  theme === "light"
                    ? "invoice-details__value"
                    : "invoice-details__value invoice-details__value--dark"
                }
              >
                {invoice.clientEmail}
              </p>
            </div>
          </div>

          <div
            className={
              theme === "light"
                ? "invoice-details__items"
                : "invoice-details__items invoice-details__items--dark"
            }
          >
            <div className="invoice-details__items-head">
              <p
                className={
                  theme === "light"
                    ? "invoice-details__items-label"
                    : "invoice-details__items-label invoice-details__items-label--dark"
                }
              >
                Item Name
              </p>
              <p
                className={`invoice-details__items-label invoice-details__items-label--qty ${theme === "dark" ? "invoice-details__items-label--dark" : ""}`}
              >
                QTY.
              </p>
              <p
                className={`invoice-details__items-label invoice-details__items-label--price ${theme === "dark" ? "invoice-details__items-label--dark" : ""}`}
              >
                Price
              </p>
              <p
                className={`invoice-details__items-label invoice-details__items-label--total ${theme === "dark" ? "invoice-details__items-label--dark" : ""}`}
              >
                Total
              </p>
            </div>
            {invoice.items.map((it, idx) => (
              <div
                key={`${it.name}-${idx}`}
                className="invoice-details__items-row"
              >
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__item-name"
                      : "invoice-details__item-name invoice-details__item-name--dark"
                  }
                >
                  {it.name}
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__item-qty"
                      : "invoice-details__item-qty invoice-details__item-qty--dark"
                  }
                >
                  {it.quantity}
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__item-price"
                      : "invoice-details__item-price invoice-details__item-price--dark"
                  }
                >
                  £ {it.price.toFixed(2)}
                </p>
                <p
                  className={
                    theme === "light"
                      ? "invoice-details__item-total"
                      : "invoice-details__item-total invoice-details__item-total--dark"
                  }
                >
                  £ {it.total.toFixed(2)}
                </p>
              </div>
            ))}

            <div
              className={
                theme === "light"
                  ? "invoice-details__amount"
                  : "invoice-details__amount invoice-details__amount--dark"
              }
            >
              <p className="invoice-details__amount-label">Amount Due</p>
              <p className="invoice-details__amount-value">
                £{" "}
                {invoice.items
                  .reduce((sum, it) => sum + it.total, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isDeleteOpen && (
        <DeletionPopup
          invoiceCode={invoice.code}
          handleConfirmDelete={handleConfirmDelete}
          handleCloseDelete={handleCloseDelete}
        />
      )}
    </section>
  );
}
