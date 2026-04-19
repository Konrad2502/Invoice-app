import iconCalendar from "../../assets/icon-calendar.svg";
import { DayPicker } from "react-day-picker";

type CalendarProps = {
  calendarRef: React.RefObject<HTMLDivElement | null>;
  toggleCalendar: () => void;
  invoiceDate: Date | undefined;
  invoiceDateError: string;
  calendar: boolean;
  handleInvoiceDate: (date: Date | undefined) => void;
};

export default function Calendar({
  calendarRef,
  toggleCalendar,
  invoiceDate,
  invoiceDateError,
  calendar,
  handleInvoiceDate,
}: CalendarProps) {
  return (
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
      {invoiceDateError && <p className="invoice-drawer__error">Select date</p>}
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
  );
}
