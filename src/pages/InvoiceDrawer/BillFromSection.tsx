type BillFromSectionProps = {
  id: string;
  label: string;
  formData: string;
  errors?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

export default function BillFromSection({
  errors,
  formData,
  handleChange,
  id,
  type,
  placeholder,
  label,
}: BillFromSectionProps) {
  return (
    <div className="invoice-drawer__field">
      <label className="invoice-drawer__label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`invoice-drawer__input ${errors ? "invoice-drawer__input--error" : ""}`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={formData}
        onChange={handleChange}
      />
      {errors && <p className="invoice-drawer__error">{errors}</p>}
    </div>
  );
}
