// src/components/Invoices/Invoices.tsx
import "./Invoices.scss";
import arrowDown from "../../assets/icon-arrow-down.svg";
import plusIcon from "../../assets/icon-plus.svg";
import arrowRight from "../../assets/icon-arrow-right.svg";
import { useAppSelector } from "../../store/hooks";
import { selectAppData } from "../../features/appData/appDataSelectors";
import { formatDueDate } from "../../utilis/date";
import emptyData from "../../assets/illustration-empty.svg";

export default function Invoices() {
  const data = useAppSelector(selectAppData);
  console.log(data);

  return (
    <main className="invoices">
      <div className="invoices__content">
        <div className="invoices__top">
          <div className="invoices__header">
            <h3 className="invoices__header-title">Invoices</h3>
            <p className="invoices__header-text">
              There are {data?.length} total invoices
            </p>
          </div>
          <div className="invoices__buttons">
            <button className="invoices__filter">
              <p className="invoices__filter-text">Filter by status</p>
              <img className="invoices__filter-arrow" src={arrowDown} alt="" />
            </button>
            <button className="invoices__add">
              <span className="invoices__add-icon">
                <img className="invoices__add-plus" src={plusIcon} alt="" />
              </span>
              <p className="invoices__add-text">New invoices</p>
            </button>
          </div>
        </div>

        <div className="invoices__bottom">
          <div className="invoices__list">
            {data === null ? (
              <div className="invoices__empty">
                <img src={emptyData} alt="" className="invoices__empty-img" />
                <h2 className="invoices__empty-heading">
                  There is nothing here
                </h2>
                <p className="invoices__empty-text">
                  Creater an invoice by clicking <span>New Invoice</span> button
                  and get started
                </p>
              </div>
            ) : (
              data.map((item) => (
                <article key={item.id} className="invoices__item">
                  <p className="invoices__id">
                    <span className="invoices__hash">#</span>
                    {item.code}
                  </p>
                  <p className="invoices__meta">
                    Due {formatDueDate(item.paymentDue)}
                  </p>
                  <p className="invoices__meta">{item.clientName}</p>
                  <p className="invoices__amount">£ {item.total.toFixed(2)}</p>
                  <div
                    className={`invoices__status invoices__status--${item.status}`}
                  >
                    <span
                      className={`invoices__dot invoices__dot--${item.status}`}
                    />
                    <span className="invoices__status-text">{item.status}</span>
                  </div>
                  <img className="invoices__chevron" src={arrowRight} alt="" />
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
