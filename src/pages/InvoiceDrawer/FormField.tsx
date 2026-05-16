import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type FormFieldProps = {
  id: string;
  label: string;
  formData: string;
  errors?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

export default function FormField({
  errors,
  formData,
  handleChange,
  id,
  type,
  placeholder,
  label,
}: FormFieldProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="invoice-drawer__field">
      <label
        className={`invoice-drawer__label ${theme === "dark" ? "invoice-drawer__label--dark" : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`invoice-drawer__input ${theme === "dark" ? "invoice-drawer__input--dark" : ""} ${errors ? "invoice-drawer__input--error" : ""}`}
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
