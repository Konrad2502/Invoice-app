import arrowDown from "../../assets/icon-arrow-down.svg";

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
  return (
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
        <p className="invoice-drawer__error">{selectedPaymentTermsError}</p>
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
  );
}
