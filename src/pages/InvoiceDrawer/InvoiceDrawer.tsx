import "./InvoiceDrawer.scss";
import arrowDown from "../../assets/icon-arrow-down.svg";
import iconCalendar from "../../assets/icon-calendar.svg";
import { useState, useRef, useEffect } from "react";

export type InvoiceDrawerMode = "new" | "edit" | null;

type InvoiceDrawerProps = {
  mode: InvoiceDrawerMode;
  onClose?: () => void;
};

export default function InvoiceDrawer({ mode, onClose }: InvoiceDrawerProps) {
  const [paymentTerms, setPaymnetTerms] = useState(false);
  const paymentRef = useRef<HTMLDivElement | null>(null);

  const togglePayTerms = () => {
    setPaymnetTerms((p) => !p);
  };

  useEffect(() => {
    if (!paymentTerms) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (paymentRef.current && !paymentRef.current.contains(target)) {
        setPaymnetTerms(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [paymentTerms]);

  const isOpen = mode !== null;

  return (
    <div className={`invoice-drawer ${isOpen ? "invoice-drawer--open" : ""}`}>
      <div className="invoice-drawer__backdrop" onClick={onClose} />

      <aside className="invoice-drawer__panel" role="dialog" aria-modal="true">
        <div className="invoice-drawer__container">
          <h1 className="invoice-drawer__title">New Invoice</h1>

          <form className="invoice-drawer__form">
            <h3 className="invoice-drawer__section-title">Bill From</h3>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="fromStreet">
                Street Address
              </label>
              <input
                className="invoice-drawer__input"
                id="fromStreet"
                type="text"
                placeholder=""
              />
            </div>

            <div className="invoice-drawer__grid-3">
              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="fromCity">
                  City
                </label>
                <input
                  className="invoice-drawer__input"
                  id="fromCity"
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="fromPost">
                  Post Code
                </label>
                <input
                  className="invoice-drawer__input"
                  id="fromPost"
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="fromCountry">
                  Country
                </label>
                <input
                  className="invoice-drawer__input"
                  id="fromCountry"
                  type="text"
                  placeholder=""
                />
              </div>
            </div>

            <h3 className="invoice-drawer__section-title">Bill To</h3>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="clientName">
                Client&apos;s Name
              </label>
              <input
                className="invoice-drawer__input"
                id="clientName"
                type="text"
                placeholder=""
              />
            </div>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="clientEmail">
                Client&apos;s Email
              </label>
              <input
                className="invoice-drawer__input"
                id="clientEmail"
                type="email"
                placeholder="e.g. email@example.com"
              />
            </div>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="toStreet">
                Street Address
              </label>
              <input
                className="invoice-drawer__input"
                id="toStreet"
                type="text"
                placeholder=""
              />
            </div>

            <div className="invoice-drawer__grid-3">
              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="toCity">
                  City
                </label>
                <input
                  className="invoice-drawer__input"
                  id="toCity"
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="toPost">
                  Post Code
                </label>
                <input
                  className="invoice-drawer__input"
                  id="toPost"
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="toCountry">
                  Country
                </label>
                <input
                  className="invoice-drawer__input"
                  id="toCountry"
                  type="text"
                  placeholder=""
                />
              </div>
            </div>

            <div className="invoice-drawer__grid-2">
              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="invoiceDate">
                  Invoice Date
                </label>

                <button className="invoice-drawer__control" type="button">
                  <span className="invoice-drawer__control-value">
                    21 Aug 2021
                  </span>
                  <img
                    className="invoice-drawer__control-icon"
                    src={iconCalendar}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div ref={paymentRef} className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="paymentTerms">
                  Payment Terms
                </label>

                <button
                  className="invoice-drawer__control"
                  type="button"
                  onClick={togglePayTerms}
                >
                  <span className="invoice-drawer__control-value">
                    Net 30 Days
                  </span>
                  <img
                    className="invoice-drawer__control-icon"
                    src={arrowDown}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
                {paymentTerms && (
                  <div className="invoice-drawer__terms">
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                    >
                      Net 1 Day
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                    >
                      Net 7 Days
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                    >
                      Net 14 Days
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                    >
                      Net 30 Days
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="projectDesc">
                Project Description
              </label>
              <input
                className="invoice-drawer__input"
                id="projectDesc"
                type="text"
                placeholder="e.g. Graphic Design Service"
              />
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
}
