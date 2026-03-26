import "./InvoiceDetails.scss";
import arrowLeft from "../../assets/icon-arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectInvoiceById } from "../../features/appData/appDataSelectors";
import { formatDueDate } from "../../utilis/date";

export default function InvoiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const invoiceId = Number(id);
  const invoice = useAppSelector((state) =>
    Number.isFinite(invoiceId) ? selectInvoiceById(state, invoiceId) : null,
  );
  console.log(invoice);
  if (!invoice) {
    return null;
  }
  return (
    <section className="invoice-details">
      <div className="invoice-details__content">
        <button
          className="invoice-details__back"
          type="button"
          onClick={() => navigate("/")}
        >
          <img className="invoice-details__back-icon" src={arrowLeft} alt="" />
          <span className="invoice-details__back-text">Go back</span>
        </button>

        <div className="invoice-details__status-bar">
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
            >
              Edit
            </button>
            <button
              className="invoice-details__btn invoice-details__btn--delete"
              type="button"
            >
              Delete
            </button>
            <button
              className="invoice-details__btn invoice-details__btn--mark"
              type="button"
            >
              Mark as Paid
            </button>
          </div>
        </div>

        <div className="invoice-details__card">
          <div className="invoice-details__top">
            <div className="invoice-details__code">
              <p className="invoice-details__code-id">
                <span className="invoice-details__hash">#</span>
                {invoice?.code}
              </p>
              <p className="invoice-details__code-desc">
                {invoice.description}
              </p>
            </div>

            <div className="invoice-details__sender">
              <p className="invoice-details__small">
                {invoice.senderAddress.street}
              </p>
              <p className="invoice-details__small">
                {invoice.senderAddress.city}
              </p>
              <p className="invoice-details__small">
                {invoice.senderAddress.postCode}
              </p>
              <p className="invoice-details__small">
                {invoice.senderAddress.country}
              </p>
            </div>
          </div>

          <div className="invoice-details__middle">
            <div className="invoice-details__dates">
              <div className="invoice-details__block">
                <p className="invoice-details__label">Invoice Date</p>
                <p className="invoice-details__value">
                  {formatDueDate(invoice.createdAt)}
                </p>
              </div>

              <div className="invoice-details__block">
                <p className="invoice-details__label">Payment Due</p>
                <p className="invoice-details__value">
                  {formatDueDate(invoice.paymentDue)}
                </p>
              </div>
            </div>

            <div className="invoice-details__billto">
              <p className="invoice-details__label">Bill To</p>
              <p className="invoice-details__value">{invoice.clientName}</p>
              <div className="invoice-details__address">
                <p className="invoice-details__small">
                  {invoice.clientAddress.street}
                </p>
                <p className="invoice-details__small">
                  {invoice.clientAddress.city}
                </p>
                <p className="invoice-details__small">
                  {invoice.clientAddress.postCode}
                </p>
                <p className="invoice-details__small">
                  {invoice.clientAddress.country}
                </p>
              </div>
            </div>

            <div className="invoice-details__sentto">
              <p className="invoice-details__label">Sent to</p>
              <p className="invoice-details__value">{invoice.clientEmail}</p>
            </div>
          </div>

          <div className="invoice-details__items">
            <div className="invoice-details__items-head">
              <p className="invoice-details__items-label">Item Name</p>
              <p className="invoice-details__items-label invoice-details__items-label--qty">
                QTY.
              </p>
              <p className="invoice-details__items-label invoice-details__items-label--price">
                Price
              </p>
              <p className="invoice-details__items-label invoice-details__items-label--total">
                Total
              </p>
            </div>
            {invoice.items.map((it, idx) => (
              <div
                key={`${it.name}-${idx}`}
                className="invoice-details__items-row"
              >
                <p className="invoice-details__item-name">{it.name}</p>
                <p className="invoice-details__item-qty">{it.quantity}</p>
                <p className="invoice-details__item-price">
                  £ {it.price.toFixed(2)}
                </p>
                <p className="invoice-details__item-total">
                  £ {it.total.toFixed(2)}
                </p>
              </div>
            ))}

            <div className="invoice-details__amount">
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
    </section>
  );
}
