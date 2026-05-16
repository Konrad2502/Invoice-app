import { useContext } from "react";
import arrowDown from "../../assets/icon-arrow-down.svg";
import { ThemeContext } from "../../context/ThemeContext";

type PaymentTermsProps = {
  paymentRef: React.RefObject<HTMLDivElement | null>;
  togglePayTerms: () => void;
  selectedPaymentTerms: string;
  selectedPaymentTermsError: string;
  paymentTerms: boolean;
  handleSelectPayment: (value: string) => void;
};

export default function PaymentTerms({
  paymentRef,
  togglePayTerms,
  selectedPaymentTerms,
  selectedPaymentTermsError,
  paymentTerms,
  handleSelectPayment,
}: PaymentTermsProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div ref={paymentRef} className="invoice-drawer__field">
      <label
        className={`invoice-drawer__label ${theme === "dark" ? "invoice-drawer__label--dark" : ""}`}
        htmlFor="paymentTerms"
      >
        Payment Terms
      </label>

      <button
        className={`invoice-drawer__control ${theme === "dark" ? "invoice-drawer__control--dark" : ""}`}
        type="button"
        onClick={togglePayTerms}
      >
        <span
          className={`invoice-drawer__control-value ${theme === "dark" ? "invoice-drawer__control-value--dark" : ""}`}
        >
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
        <p className="invoice-drawer__error">{selectedPaymentTermsError}</p>
      )}
      {paymentTerms && (
        <div
          className={`invoice-drawer__terms ${theme === "dark" ? "invoice-drawer__terms--dark" : ""}`}
        >
          <button
            className={`invoice-drawer__terms-option ${theme === "dark" ? "invoice-drawer__terms-option--dark" : ""}`}
            type="button"
            onClick={() => handleSelectPayment("Net 1 Day")}
          >
            Net 1 Day
          </button>
          <button
            className={`invoice-drawer__terms-option ${theme === "dark" ? "invoice-drawer__terms-option--dark" : ""}`}
            type="button"
            onClick={() => handleSelectPayment("Net 7 Days")}
          >
            Net 7 Days
          </button>
          <button
            className={`invoice-drawer__terms-option ${theme === "dark" ? "invoice-drawer__terms-option--dark" : ""}`}
            type="button"
            onClick={() => handleSelectPayment("Net 14 Days")}
          >
            Net 14 Days
          </button>
          <button
            className={`invoice-drawer__terms-option ${theme === "dark" ? "invoice-drawer__terms-option--dark" : ""}`}
            type="button"
            onClick={() => handleSelectPayment("Net 30 Days")}
          >
            Net 30 Days
          </button>
        </div>
      )}
    </div>
  );
}
