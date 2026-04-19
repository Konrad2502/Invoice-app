import deleteIcon from "../../assets/icon-delete.svg";

type ItemRowProps = {
  row: {
    id: string;
    name: string;
    quantity: string;
    price: string;
  };
  handleItemChange: (
    id: string,
    field: "name" | "quantity" | "price",
    value: string,
  ) => void;
  handleRemoveItems: (id: string) => void;
};

export default function ItemRow({
  row,
  handleItemChange,
  handleRemoveItems,
}: ItemRowProps) {
  return (
    <div key={row.id} className="invoice-drawer__item-row">
      <input
        className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--name"
        type="text"
        value={row.name}
        onChange={(e) => handleItemChange(row.id, "name", e.target.value)}
      />

      <input
        className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--qty"
        type="text"
        value={row.quantity}
        onChange={(e) => handleItemChange(row.id, "quantity", e.target.value)}
      />

      <input
        className="invoice-drawer__input invoice-drawer__item-input invoice-drawer__item-input--price"
        type="text"
        value={row.price}
        onChange={(e) => handleItemChange(row.id, "price", e.target.value)}
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
  );
}
