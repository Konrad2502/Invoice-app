// src/pages/InvoiceDrawer/InvoiceDrawer.tsx
import "./InvoiceDrawer.scss";
import { useState, useRef, useEffect, type SyntheticEvent } from "react";
import "react-day-picker/dist/style.css";
import FormField from "./FormField";
import Calendar from "./Calendar";
import PaymentTerms from "./PaymentTerms";
import ItemRow from "./ItemRow";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectInvoiceById } from "../../features/invoices/invoicesSelectors";
import {
  addInvoice,
  saveInvoiceAsDraft,
  updateInvoice,
} from "../../features/invoices/invoicesSlice";
import type { InvoiceData } from "../../features/appData/appDataTypes";
import {
  makeInvoiceId,
  makeItemId,
  getPaymentTermsDays,
  getPaymentTermsLabel,
  addDays,
  formatDateToISO,
  makeInvoiceCode,
  mapItems,
} from "./utils";

export type InvoiceDrawerMode = "new" | "edit" | null;

type InvoiceDrawerProps = {
  mode: InvoiceDrawerMode;
  setDrawerMode: (mode: InvoiceDrawerMode) => void;
  editingInvoiceId: number | null;
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

// Initial values used to reset the whole form
const initialFormData: FormData = {
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
};

const initialPaymentTerms = "Select payment terms";

export default function InvoiceDrawer({
  mode,
  setDrawerMode,
  editingInvoiceId,
}: InvoiceDrawerProps) {
  const dispatch = useAppDispatch();

  // Load invoice data only when drawer is opened in edit mode
  const editingInvoice = useAppSelector((state) =>
    editingInvoiceId !== null
      ? selectInvoiceById(state, editingInvoiceId)
      : null,
  );

  // UI state for dropdowns and date picker
  const [paymentTerms, setPaymentTerms] = useState(false);
  const [calendar, setCalendar] = useState(false);

  // Main form state
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(undefined);
  const [invoiceDateError, setInvoiceDateError] = useState("");
  const [selectedPaymentTerms, setSelectedPaymentTerms] =
    useState(initialPaymentTerms);
  const [selectedPaymentTermsError, setSelectedPaymentTermsError] =
    useState("");

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isItemsEditing, setIsItemEditing] = useState(false);
  const [itemRows, setItemRows] = useState<ItemRows[]>([]);
  const [itemErrors, setItemError] = useState("");

  // Refs used to close popups when clicking outside
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Reset the drawer to its initial clean state
  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setInvoiceDate(undefined);
    setInvoiceDateError("");
    setSelectedPaymentTerms(initialPaymentTerms);
    setSelectedPaymentTermsError("");
    setItemRows([]);
    setItemError("");
    setIsItemEditing(false);
    setPaymentTerms(false);
    setCalendar(false);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle regular text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

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
    setInvoiceDateError("");
  };

  const handleSelectPayment = (value: string) => {
    setSelectedPaymentTerms(value);
    setPaymentTerms(false);
    setSelectedPaymentTermsError("");
  };

  const togglePayTerms = () => {
    setPaymentTerms((prev) => !prev);
  };

  const toggleCalendar = () => {
    setCalendar((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    resetForm();
    setDrawerMode(null);
  };

  // Item list handlers.
  const handleAddNewItem = () => {
    setIsItemEditing(true);
    setItemRows((prev) => [
      ...prev,
      {
        id: makeItemId(),
        name: "",
        quantity: "",
        price: "",
      },
    ]);
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
    setItemError("");
  };

  const handleSaveChanges = () => {
    const isValid = validateItemsRows();
    if (!isValid) return;
    setIsItemEditing(false);
  };

  // Validate item rows before final save
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

    const hasInvalidNumbers = itemRows.some((row) => {
      return Number(row.quantity) <= 0 || Number(row.price) <= 0;
    });

    if (hasInvalidNumbers) {
      setItemError("Quantity and price must be greater than 0");
      return false;
    }

    setItemError("");
    return true;
  };

  // Validate the main invoice form before save & send
  const validateForm = () => {
    const newErrors: FormErrors = {};
    const email = formData.clientEmail.trim();
    const hasValidPaymentTerms = selectedPaymentTerms !== initialPaymentTerms;

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

    if (!hasValidPaymentTerms) {
      setSelectedPaymentTermsError("Select terms");
    } else {
      setSelectedPaymentTermsError("");
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0 &&
      !!invoiceDate &&
      hasValidPaymentTerms
    );
  };

  // Build payload for a brand new invoice
  const buildInvoicePayload = (): InvoiceData | null => {
    if (!invoiceDate) return null;

    const paymentTermsDays = getPaymentTermsDays(selectedPaymentTerms);
    const items = mapItems(itemRows);
    const total = items.reduce((sum, item) => sum + item.total, 0);

    return {
      id: makeInvoiceId(),
      code: makeInvoiceCode(),
      createdAt: formatDateToISO(invoiceDate),
      paymentDue: formatDateToISO(addDays(invoiceDate, paymentTermsDays)),
      description: formData.projectDesc.trim(),
      paymentTerms: paymentTermsDays,
      clientName: formData.clientName.trim(),
      clientEmail: formData.clientEmail.trim(),
      status: "pending",
      senderAddress: {
        street: formData.fromStreet.trim(),
        city: formData.fromCity.trim(),
        postCode: formData.fromPost.trim(),
        country: formData.fromCountry.trim(),
      },
      clientAddress: {
        street: formData.toStreet.trim(),
        city: formData.toCity.trim(),
        postCode: formData.toPost.trim(),
        country: formData.toCountry.trim(),
      },
      items,
      total,
    };
  };

  // Build payload for editing while keeping original id, code and status
  const buildUpdatedInvoicePayload = (): InvoiceData | null => {
    if (!invoiceDate || !editingInvoice) return null;

    const paymentTermsDays = getPaymentTermsDays(selectedPaymentTerms);
    const items = mapItems(itemRows);
    const total = items.reduce((sum, item) => sum + item.total, 0);

    return {
      id: editingInvoice.id,
      code: editingInvoice.code,
      createdAt: formatDateToISO(invoiceDate),
      paymentDue: formatDateToISO(addDays(invoiceDate, paymentTermsDays)),
      description: formData.projectDesc.trim(),
      paymentTerms: paymentTermsDays,
      clientName: formData.clientName.trim(),
      clientEmail: formData.clientEmail.trim(),
      status: editingInvoice.status,
      senderAddress: {
        street: formData.fromStreet.trim(),
        city: formData.fromCity.trim(),
        postCode: formData.fromPost.trim(),
        country: formData.fromCountry.trim(),
      },
      clientAddress: {
        street: formData.toStreet.trim(),
        city: formData.toCity.trim(),
        postCode: formData.toPost.trim(),
        country: formData.toCountry.trim(),
      },
      items,
      total,
    };
  };

  // Draft payload allows partially filled form data
  const buildDraftPayload = (): InvoiceData => {
    const createdAt = invoiceDate ?? new Date();
    const paymentTermsDays =
      selectedPaymentTerms === initialPaymentTerms
        ? 0
        : getPaymentTermsDays(selectedPaymentTerms);

    const items = itemRows
      .filter(
        (row) => row.name.trim() || row.quantity.trim() || row.price.trim(),
      )
      .map((row) => {
        const quantity = Number(row.quantity) || 0;
        const price = Number(row.price) || 0;

        return {
          name: row.name.trim(),
          quantity,
          price,
          total: quantity * price,
        };
      });

    const total = items.reduce((sum, item) => sum + item.total, 0);

    return {
      id: makeInvoiceId(),
      code: makeInvoiceCode(),
      createdAt: formatDateToISO(createdAt),
      paymentDue: formatDateToISO(addDays(createdAt, paymentTermsDays)),
      description: formData.projectDesc.trim(),
      paymentTerms: paymentTermsDays,
      clientName: formData.clientName.trim(),
      clientEmail: formData.clientEmail.trim(),
      status: "draft",
      senderAddress: {
        street: formData.fromStreet.trim(),
        city: formData.fromCity.trim(),
        postCode: formData.fromPost.trim(),
        country: formData.fromCountry.trim(),
      },
      clientAddress: {
        street: formData.toStreet.trim(),
        city: formData.toCity.trim(),
        postCode: formData.toPost.trim(),
        country: formData.toCountry.trim(),
      },
      items,
      total,
    };
  };

  // Handle both create and edit flows in one submit
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validateForm();
    const areItemsValid = validateItemsRows();

    if (!isFormValid || !areItemsValid) return;

    if (mode === "edit") {
      const updatedInvoice = buildUpdatedInvoicePayload();
      if (!updatedInvoice) return;

      dispatch(updateInvoice(updatedInvoice));
      resetForm();
      setDrawerMode(null);
      return;
    }

    const newInvoice = buildInvoicePayload();
    if (!newInvoice) return;

    dispatch(addInvoice(newInvoice));
    resetForm();
    setDrawerMode(null);
  };

  const handleSaveAsDraft = () => {
    const draftInvoice = buildDraftPayload();
    dispatch(saveInvoiceAsDraft(draftInvoice));
    resetForm();
    setDrawerMode(null);
  };

  // Close payment terms dropdown when clicking outside
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

  // Close calendar when clicking outside
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

  // Prefill form with invoice data when editing.
  useEffect(() => {
    if (mode !== "edit" || !editingInvoice) return;

    setFormData({
      fromStreet: editingInvoice.senderAddress.street,
      fromCity: editingInvoice.senderAddress.city,
      fromPost: editingInvoice.senderAddress.postCode,
      fromCountry: editingInvoice.senderAddress.country,
      clientName: editingInvoice.clientName,
      clientEmail: editingInvoice.clientEmail,
      toStreet: editingInvoice.clientAddress.street,
      toCity: editingInvoice.clientAddress.city,
      toPost: editingInvoice.clientAddress.postCode,
      toCountry: editingInvoice.clientAddress.country,
      projectDesc: editingInvoice.description,
    });

    setInvoiceDate(new Date(editingInvoice.createdAt));
    setSelectedPaymentTerms(getPaymentTermsLabel(editingInvoice.paymentTerms));

    setItemRows(
      editingInvoice.items.map((item, index) => ({
        id: `${editingInvoice.id}-${index}`,
        name: item.name,
        quantity: String(item.quantity),
        price: String(item.price),
      })),
    );

    setErrors({});
    setInvoiceDateError("");
    setSelectedPaymentTermsError("");
    setItemError("");
    setIsItemEditing(false);
  }, [mode, editingInvoice]);

  // Reset stale form values when opening drawer in new mode
  useEffect(() => {
    if (mode === "new") {
      resetForm();
    }
  }, [mode]);

  const isOpen = mode !== null;

  return (
    <div className={`invoice-drawer ${isOpen ? "invoice-drawer--open" : ""}`}>
      <div className="invoice-drawer__backdrop" />

      <aside className="invoice-drawer__panel" role="dialog" aria-modal="true">
        <div className="invoice-drawer__container">
          <h1 className="invoice-drawer__title">
            {mode === "edit" ? "Edit Invoice" : "New Invoice"}
          </h1>

          <form
            className="invoice-drawer__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h3 className="invoice-drawer__section-title">Bill From</h3>

            <FormField
              id="fromStreet"
              errors={errors.fromStreet}
              formData={formData.fromStreet}
              handleChange={handleChange}
              type="text"
              placeholder=""
              label="Street Address"
            />

            <div className="invoice-drawer__grid-3">
              <FormField
                id="fromCity"
                errors={errors.fromCity}
                formData={formData.fromCity}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="City"
              />

              <FormField
                id="fromPost"
                errors={errors.fromPost}
                formData={formData.fromPost}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="Post code"
              />

              <FormField
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

            <FormField
              id="clientName"
              errors={errors.clientName}
              formData={formData.clientName}
              handleChange={handleChange}
              type="text"
              placeholder=""
              label="Client's Name"
            />

            <FormField
              id="clientEmail"
              errors={errors.clientEmail}
              formData={formData.clientEmail}
              handleChange={handleChange}
              type="email"
              placeholder="e.g. email@example.com"
              label="Client's Email"
            />

            <FormField
              id="toStreet"
              errors={errors.toStreet}
              formData={formData.toStreet}
              handleChange={handleChange}
              type="text"
              placeholder=""
              label="Street Address"
            />

            <div className="invoice-drawer__grid-3">
              <FormField
                id="toCity"
                errors={errors.toCity}
                formData={formData.toCity}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="City"
              />

              <FormField
                id="toPost"
                errors={errors.toPost}
                formData={formData.toPost}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="Post Code"
              />

              <FormField
                id="toCountry"
                errors={errors.toCountry}
                formData={formData.toCountry}
                handleChange={handleChange}
                type="text"
                placeholder=""
                label="Country"
              />
            </div>

            <div className="invoice-drawer__grid-2">
              <Calendar
                calendarRef={calendarRef}
                toggleCalendar={toggleCalendar}
                invoiceDate={invoiceDate}
                invoiceDateError={invoiceDateError}
                calendar={calendar}
                handleInvoiceDate={handleInvoiceDate}
              />

              <PaymentTerms
                paymentRef={paymentRef}
                togglePayTerms={togglePayTerms}
                selectedPaymentTerms={selectedPaymentTerms}
                selectedPaymentTermsError={selectedPaymentTermsError}
                paymentTerms={paymentTerms}
                handleSelectPayment={handleSelectPayment}
              />
            </div>

            <FormField
              id="projectDesc"
              errors={errors.projectDesc}
              formData={formData.projectDesc}
              handleChange={handleChange}
              type="text"
              placeholder=""
              label="Project Description"
            />

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
                <ItemRow
                  key={row.id}
                  row={row}
                  handleItemChange={handleItemChange}
                  handleRemoveItems={handleRemoveItems}
                />
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
                  {mode !== "edit" && (
                    <button
                      className="invoice-drawer__footer-btn invoice-drawer__footer-btn--draft"
                      type="button"
                      onClick={handleSaveAsDraft}
                    >
                      Save as Draft
                    </button>
                  )}

                  <button
                    className="invoice-drawer__footer-btn invoice-drawer__footer-btn--save"
                    type="submit"
                  >
                    {mode === "edit" ? "Save Changes" : "Save &amp; Send"}
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
