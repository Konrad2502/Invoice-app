import "./InvoiceDetails.scss";
import arrowLeft from "../../assets/icon-arrow-left.svg";

export default function InvoiceDetails() {
  return (
    <section className="invoice-details">
      <div className="invoice-details__content">
        <button className="invoice-details__back" type="button">
          <img className="invoice-details__back-icon" src={arrowLeft} alt="" />
          <span className="invoice-details__back-text">Go back</span>
        </button>

        <div className="invoice-details__status-bar">
          <div className="invoice-details__status-left">
            <span className="invoice-details__status-label">Status</span>

            <div className="invoice-details__badge invoice-details__badge--pending">
              <span className="invoice-details__dot invoice-details__dot--pending" />
              <span className="invoice-details__badge-text">Pending</span>
            </div>

            {/* 
            <div className="invoice-details__badge invoice-details__badge--paid">...</div>
            <div className="invoice-details__badge invoice-details__badge--draft">...</div>
            */}
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
                <span className="invoice-details__hash">#</span>XM9141
              </p>
              <p className="invoice-details__code-desc">Graphic Design</p>
            </div>

            <div className="invoice-details__sender">
              <p className="invoice-details__small">19 Union Terrace</p>
              <p className="invoice-details__small">London</p>
              <p className="invoice-details__small">E1 3EZ</p>
              <p className="invoice-details__small">United Kingdom</p>
            </div>
          </div>

          <div className="invoice-details__middle">
            <div className="invoice-details__dates">
              <div className="invoice-details__block">
                <p className="invoice-details__label">Invoice Date</p>
                <p className="invoice-details__value">21 Aug 2021</p>
              </div>

              <div className="invoice-details__block">
                <p className="invoice-details__label">Payment Due</p>
                <p className="invoice-details__value">20 Sep 2021</p>
              </div>
            </div>

            <div className="invoice-details__billto">
              <p className="invoice-details__label">Bill To</p>
              <p className="invoice-details__value">Alex Grim</p>
              <div className="invoice-details__address">
                <p className="invoice-details__small">84 Church Way</p>
                <p className="invoice-details__small">Bradford</p>
                <p className="invoice-details__small">BD1 9PB</p>
                <p className="invoice-details__small">United Kingdom</p>
              </div>
            </div>

            <div className="invoice-details__sentto">
              <p className="invoice-details__label">Sent to</p>
              <p className="invoice-details__value">alexgrim@mail.com</p>
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

            <div className="invoice-details__items-row">
              <p className="invoice-details__item-name">Banner Design</p>
              <p className="invoice-details__item-qty">1</p>
              <p className="invoice-details__item-price">£ 156.00</p>
              <p className="invoice-details__item-total">£ 156.00</p>
            </div>

            <div className="invoice-details__items-row">
              <p className="invoice-details__item-name">Email Design</p>
              <p className="invoice-details__item-qty">2</p>
              <p className="invoice-details__item-price">£ 200.00</p>
              <p className="invoice-details__item-total">£ 400.00</p>
            </div>

            <div className="invoice-details__amount">
              <p className="invoice-details__amount-label">Amount Due</p>
              <p className="invoice-details__amount-value">£ 556.00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
