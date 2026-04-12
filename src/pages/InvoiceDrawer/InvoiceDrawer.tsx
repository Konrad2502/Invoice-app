import "./InvoiceDrawer.scss";
import arrowDown from "../../assets/icon-arrow-down.svg";
import deleteIcon from "../../assets/icon-delete.svg";
import iconCalendar from "../../assets/icon-calendar.svg";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import BillFromSection from "./BillFromSection";

export type InvoiceDrawerMode = "new" | "edit" | null;

type InvoiceDrawerProps = {
  mode: InvoiceDrawerMode;
  setDrawerMode: (mode: InvoiceDrawerMode) => void;
};

type ItemRows = {
  id: string;
  name: string;
  quantity: string;
  price: string;
};

export type FormData = {
  fromStreet: string;
  fromCity: string;
  fromPost: string;
  fromCountry: string;
  clientName: string;
  clientEmail: string;
  toStreet: string;
  toCity: string;
  toPost: string;
  toCountry: string;
  projectDesc: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function InvoiceDrawer({
  mode,
  setDrawerMode,
}: InvoiceDrawerProps) {
  const [paymentTerms, setPaymentTerms] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(undefined);
  const [invoiceDateError, setInvoiceDateError] = useState("");
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState(
    "Select payment terms",
  );
  const [selectedPaymentTermsError, setSelectedPaymentTermsError] =
    useState("");

  const [formData, setFormData] = useState<FormData>({
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
    projectDesc: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isItemsEditing, setIsItemEditing] = useState(false);
  const [itemRows, setItemRows] = useState<ItemRows[]>([]);
  const [itemErrors, setItemError] = useState("");

  const paymentRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
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
    setItemRows((prev) => [
      ...prev,
      {
        id: makeId(),
        name: "",
        quantity: "",
        price: "",
      },
    ]);
  };

  const validateItemsRows = () => {
    if (itemRows.length === 0) {
      setItemError("All fields must be added");
      return false;
    }
    const hasEmptyFields = itemRows.some((row) => {
      return !row.name.trim() || !row.quantity.trim() || !row.price.trim();
    });

    if (hasEmptyFields) {
      setItemError("All fields must be added");
      return false;
    }

    const isNumber = itemRows.some((row) => {
      return Number(row.quantity) > 0 && Number(row.price) > 0;
    });
    if (!isNumber) {
      setItemError("Quantity and price must be a number");
      return false;
    }

    setItemError("");
    return true;
  };

  const handleItemChange = (
    id: string,
    field: keyof Omit<ItemRows, "id">,
    value: string,
  ) => {
    setItemRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
    setItemError("");
  };

  const handleRemoveItems = (id: string) => {
    setItemRows((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancelItems = () => {
    setIsItemEditing(false);
    setItemRows([]);
  };

  const handleSaveChanges = () => {
    const isValid = validateItemsRows();
    if (!isValid) return;
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

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const email = formData.clientEmail.trim();

    if (!formData.fromStreet.trim()) newErrors.fromStreet = "Can't be empty";
    if (!formData.fromCity.trim()) newErrors.fromCity = "Can't be empty";
    if (!formData.fromPost.trim()) newErrors.fromPost = "Can't be empty";
    if (!formData.fromCountry.trim()) newErrors.fromCountry = "Can't be empty";
    if (!formData.clientName.trim()) newErrors.clientName = "Can't be empty";
    if (!email) {
      newErrors.clientEmail = "Can't be empty";
    } else if (!isValidEmail(email)) {
      newErrors.clientEmail = "Invalid email";
    }
    if (!formData.toStreet.trim()) newErrors.toStreet = "Can't be empty";
    if (!formData.toCity.trim()) newErrors.toCity = "Can't be empty";
    if (!formData.toPost.trim()) newErrors.toPost = "Can't be empty";
    if (!formData.toCountry.trim()) newErrors.toCountry = "Can't be empty";
    if (!formData.projectDesc.trim()) newErrors.projectDesc = "Can't be empty";

    if (!invoiceDate) {
      setInvoiceDateError("Select date");
    } else {
      setInvoiceDateError("");
    }

    if (selectedPaymentTerms === "Select payment terms") {
      setSelectedPaymentTermsError("Select terms");
    } else {
      setSelectedPaymentTermsError("");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0 && !!invoiceDate;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    console.log(formData);
  };

  return (
    <div className={`invoice-drawer ${isOpen ? "invoice-drawer--open" : ""}`}>
      <div className="invoice-drawer__backdrop" />

      <aside className="invoice-drawer__panel" role="dialog" aria-modal="true">
        <div className="invoice-drawer__container">
          <h1 className="invoice-drawer__title">New Invoice</h1>

          <form
            className="invoice-drawer__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h3 className="invoice-drawer__section-title">Bill From</h3>

            <BillFromSection
              id="fromStreet"
              errors={errors.fromStreet}
              formData={formData.fromStreet}
              handleChange={handleChange}
              type="text"
              placeholder=""
              label="Street Address"
            />

            <div className="invoice-drawer__grid-3">
              <BillFromSection
                id="fromCity"
                errors={errors.fromCity}
                formData={formData.fromCity}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="City"
              />

              <BillFromSection
                id="fromPost"
                errors={errors.fromPost}
                formData={formData.fromPost}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="Post code"
              />

              <BillFromSection
                id="fromCountry"
                errors={errors.fromCountry}
                formData={formData.fromCountry}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="Country"
              />
            </div>

            <h3 className="invoice-drawer__section-title">Bill To</h3>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="clientName">
                Client's Name
              </label>
              <input
                className={`invoice-drawer__input ${errors.clientName ? "invoice-drawer__input--error" : ""}`}
                id="clientName"
                type="text"
                placeholder=""
                value={formData.clientName}
                onChange={handleChange}
              />
              {errors.clientName && (
                <p className="invoice-drawer__error">{errors.clientName}</p>
              )}
            </div>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="clientEmail">
                Client's Email
              </label>
              <input
                className={`invoice-drawer__input ${errors.clientEmail ? "invoice-drawer__input--error" : ""}`}
                id="clientEmail"
                type="email"
                placeholder="e.g. email@example.com"
                value={formData.clientEmail}
                onChange={handleChange}
              />
              {errors.clientEmail && (
                <p className="invoice-drawer__error">{errors.clientEmail}</p>
              )}
            </div>

            <div className="invoice-drawer__field">
              <label className="invoice-drawer__label" htmlFor="toStreet">
                Street Address
              </label>
              <input
                className={`invoice-drawer__input ${errors.toStreet ? "invoice-drawer__input--error" : ""}`}
                id="toStreet"
                type="text"
                placeholder=""
                value={formData.toStreet}
                onChange={handleChange}
              />
              {errors.toStreet && (
                <p className="invoice-drawer__error">{errors.toStreet}</p>
              )}
            </div>

            <div className="invoice-drawer__grid-3">
              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="toCity">
                  City
                </label>
                <input
                  className={`invoice-drawer__input ${errors.toCity ? "invoice-drawer__input--error" : ""}`}
                  id="toCity"
                  type="text"
                  placeholder=""
                  value={formData.toCity}
                  onChange={handleChange}
                />
                {errors.toCity && (
                  <p className="invoice-drawer__error">{errors.toCity}</p>
                )}
              </div>

              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="toPost">
                  Post Code
                </label>
                <input
                  className={`invoice-drawer__input ${errors.toPost ? "invoice-drawer__input--error" : ""}`}
                  id="toPost"
                  type="text"
                  placeholder=""
                  value={formData.toPost}
                  onChange={handleChange}
                />
                {errors.toPost && (
                  <p className="invoice-drawer__error">{errors.toPost}</p>
                )}
              </div>

              <div className="invoice-drawer__field">
                <label className="invoice-drawer__label" htmlFor="toCountry">
                  Country
                </label>
                <input
                  className={`invoice-drawer__input ${errors.toCountry ? "invoice-drawer__input--error" : ""}`}
                  id="toCountry"
                  type="text"
                  placeholder=""
                  value={formData.toCountry}
                  onChange={handleChange}
                />
                {errors.toCountry && (
                  <p className="invoice-drawer__error">{errors.toCountry}</p>
                )}
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
                {invoiceDateError && (
                  <p className="invoice-drawer__error">Select date</p>
                )}
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
                {selectedPaymentTermsError && (
                  <p className="invoice-drawer__error">
                    {selectedPaymentTermsError}
                  </p>
                )}
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
                      onClick={() => handleSelectPayment("Net 7 Days")}
                    >
                      Net 7 Days
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                      onClick={() => handleSelectPayment("Net 14 Days")}
                    >
                      Net 14 Days
                    </button>
                    <button
                      className="invoice-drawer__terms-option"
                      type="button"
                      onClick={() => handleSelectPayment("Net 30 Days")}
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
                className={`invoice-drawer__input ${errors.projectDesc ? "invoice-drawer__input--error" : ""}`}
                id="projectDesc"
                type="text"
                placeholder="e.g. Graphic Design Service"
                value={formData.projectDesc}
                onChange={handleChange}
              />
              {errors.projectDesc && (
                <p className="invoice-drawer__error">{errors.projectDesc}</p>
              )}
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
                  <input
                    className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--name"
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleItemChange(row.id, "name", e.target.value)
                    }
                  />

                  <input
                    className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--qty"
                    type="text"
                    value={row.quantity}
                    onChange={(e) =>
                      handleItemChange(row.id, "quantity", e.target.value)
                    }
                  />

                  <input
                    className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--price"
                    type="text"
                    value={row.price}
                    onChange={(e) =>
                      handleItemChange(row.id, "price", e.target.value)
                    }
                  />

                  <span className="invoice-drawer__item-total">
                    {(Number(row.quantity) * Number(row.price)).toFixed(2)}
                  </span>

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
            {itemErrors && (
              <p className="invoice-drawer__error">{itemErrors}</p>
            )}
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
                    type="submit"
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
