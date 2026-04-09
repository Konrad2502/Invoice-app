import "./InvoiceDrawer.scss";
import arrowDown from "../../assets/icon-arrow-down.svg";
import deleteIcon from "../../assets/icon-delete.svg";
import iconCalendar from "../../assets/icon-calendar.svg";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export type InvoiceDrawerMode = "new" | "edit" | null;

type InvoiceDrawerProps = {
  mode: InvoiceDrawerMode;
  setDrawerMode: (mode: InvoiceDrawerMode) => void;
};

type ItemRows = {
  id: string;
};

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function InvoiceDrawer({
  mode,
  setDrawerMode,
}: InvoiceDrawerProps) {
  const [paymentTerms, setPaymentTerms] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(undefined);
  const [selectedPaymentTerms, setSelectedPaymentTerms] =
    useState("Net 30 Days");

  const [formData, setFormData] = useState({
    fromStreet: "",
    fromCity: "",
    fromPost: "",
    fromCountry: "",
    clientName: "",
    clientEmail: "",
    toStreet: "",
    toCity: "",
    toPost: "",
    toCountry: "",
  });

  const [isItemsEditing, setIsItemEditing] = useState(false);
  const [itemRows, setItemRows] = useState<ItemRows[]>([]);

  const paymentRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleInvoiceDate = (date: Date | undefined) => {
    setInvoiceDate(date);
    setCalendar(false);
  };

  const handleSelectPayment = (value: string) => {
    setSelectedPaymentTerms(value);
    setPaymentTerms(false);
  };

  const togglePayTerms = () => {
    setPaymentTerms((p) => !p);
  };

  const toggleCalendar = () => {
    setCalendar((c) => !c);
  };

  const handleCloseDrawer = () => {
    setDrawerMode(null);
  };

  const handleAddNewItem = () => {
    setIsItemEditing(true);
    setItemRows((prev) => [...prev, { id: makeId() }]);
  };

  const handleRemoveItems = (id: string) => {
    setItemRows((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancelItems = () => {
    setIsItemEditing(false);
    setItemRows([]);
  };

  const handleSaveChanges = () => {
    setIsItemEditing(false);
  };

  useEffect(() => {
    if (!paymentTerms) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (paymentRef.current && !paymentRef.current.contains(target)) {
        setPaymentTerms(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [paymentTerms]);

  useEffect(() => {
    if (!calendar) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (calendarRef.current && !calendarRef.current.contains(target)) {
        setCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendar]);

  const isOpen = mode !== null;

  return (
    <div className={`invoice-drawer ${isOpen ? "invoice-drawer--open" : ""}`}>
      <div className="invoice-drawer__backdrop" />

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
                value={formData.fromStreet}
                onChange={handleChange}
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
                  value={formData.fromCity}
                  onChange={handleChange}
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
                  value={formData.fromPost}
                  onChange={handleChange}
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
                  value={formData.fromCountry}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h3 className="invoice-drawer__section-title">Bill To</h3>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="clientName">
                Client's Name
              </label>
              <input
                className="invoice-drawer__input"
                id="clientName"
                type="text"
                placeholder=""
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="clientEmail">
                Client's Email
              </label>
              <input
                className="invoice-drawer__input"
                id="clientEmail"
                type="email"
                placeholder="e.g. email@example.com"
                value={formData.clientEmail}
                onChange={handleChange}
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
                value={formData.toStreet}
                onChange={handleChange}
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
                  value={formData.toCity}
                  onChange={handleChange}
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
                  value={formData.toPost}
                  onChange={handleChange}
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
                  value={formData.toCountry}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="invoice-drawer__grid-2">
              <div ref={calendarRef} className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="invoiceDate">
                  Invoice Date
                </label>

                <button
                  className="invoice-drawer__control"
                  type="button"
                  onClick={toggleCalendar}
                >
                  <span className="invoice-drawer__control-value">
                    {invoiceDate ? invoiceDate.toDateString() : "Select date"}
                  </span>
                  <img
                    className="invoice-drawer__control-icon"
                    src={iconCalendar}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
                {calendar && (
                  <div className="invoice-drawer__calendar">
                    <DayPicker
                      mode="single"
                      selected={invoiceDate}
                      onSelect={handleInvoiceDate}
                    />
                  </div>
                )}
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
                    {selectedPaymentTerms}
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
                      onClick={() => handleSelectPayment("Net 1 Day")}
                    >
                      Net 1 Day
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                      onClick={() => handleSelectPayment("Net 7 Day")}
                    >
                      Net 7 Days
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                      onClick={() => handleSelectPayment("Net 14 Day")}
                    >
                      Net 14 Days
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                      onClick={() => handleSelectPayment("Net 30 Day")}
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
            <div className="invoice-drawer__items">
              <h3 className="invoice-drawer__items-title">Item List</h3>

              <div className="invoice-drawer__items-head">
                <span className="invoice-drawer__items-col invoice-drawer__items-col--name">
                  Item Name
                </span>
                <span className="invoice-drawer__items-col invoice-drawer__items-col--qty">
                  Qty.
                </span>
                <span className="invoice-drawer__items-col invoice-drawer__items-col--price">
                  Price
                </span>
                <span className="invoice-drawer__items-col invoice-drawer__items-col--total">
                  Total
                </span>
              </div>

              {itemRows.map((row) => (
                <div key={row.id} className="invoice-drawer__item-row">
                  <input className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--name" />
                  <input className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--qty" />
                  <input className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--price" />
                  <span className="invoice-drawer__item-total">156.00</span>

                  <button
                    className="invoice-drawer__item-delete"
                    type="button"
                    onClick={() => handleRemoveItems(row.id)}
                  >
                    <img
                      className="invoice-drawer__item-delete-icon"
                      src={deleteIcon}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ))}

              <button
                className="invoice-drawer__add-item"
                type="button"
                onClick={handleAddNewItem}
              >
                + Add New Item
              </button>
            </div>
            {/* Footer: UI switch */}
            {isItemsEditing ? (
              <div className="invoice-drawer__footer invoice-drawer__footer--edit">
                <button
                  className="invoice-drawer__footer-btn invoice-drawer__footer-btn--discard"
                  type="button"
                  onClick={handleCancelItems}
                >
                  Cancel
                </button>

                <button
                  className="invoice-drawer__footer-btn invoice-drawer__footer-btn--save"
                  type="button"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="invoice-drawer__footer">
                <button
                  className="invoice-drawer__footer-btn invoice-drawer__footer-btn--discard"
                  type="button"
                  onClick={handleCloseDrawer}
                >
                  Discard
                </button>

                <div className="invoice-drawer__footer-right">
                  <button
                    className="invoice-drawer__footer-btn invoice-drawer__footer-btn--draft"
                    type="button"
                  >
                    Save as Draft
                  </button>
                  <button
                    className="invoice-drawer__footer-btn invoice-drawer__footer-btn--save"
                    type="button"
                  >
                    Save &amp; Send
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </aside>
    </div>
  );
}
