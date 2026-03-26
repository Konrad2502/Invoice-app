// src/components/Invoices/Invoices.tsx
import "./Invoices.scss";
import arrowDown from "../../assets/icon-arrow-down.svg";
import plusIcon from "../../assets/icon-plus.svg";
import arrowRight from "../../assets/icon-arrow-right.svg";
import { useAppSelector } from "../../store/hooks";
import { selectAppData } from "../../features/appData/appDataSelectors";
import { formatDueDate } from "../../utilis/date";
import emptyData from "../../assets/illustration-empty.svg";
import check from "../../assets/icon-check.svg";
import { useEffect, useRef, useState, useMemo } from "react";
import type { InvoiceStatus } from "../../features/appData/appDataTypes";
import { useNavigate } from "react-router-dom";

export default function Invoices() {
  const data = useAppSelector(selectAppData);
  console.log(data);

  const filterRef = useRef<HTMLDivElement | null>(null);

  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);

  const toggleStatus = (status: InvoiceStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const filteredData = useMemo(() => {
    if (!data) return null;
    if (selectedStatuses.length === 0) return data;
    return data.filter((inv) => selectedStatuses.includes(inv.status));
  }, [data, selectedStatuses]);

  const isChecked = (s: InvoiceStatus) => selectedStatuses.includes(s);

  const toggleFilterDropdown = () => {
    setFilterDropdown((v) => !v);
  };

  useEffect(() => {
    if (!filterDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (filterRef.current && !filterRef.current.contains(target)) {
        setFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterDropdown]);

  const navigate = useNavigate();

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
            <div ref={filterRef} className="invoices__filter-wrap">
              <button
                onClick={toggleFilterDropdown}
                className="invoices__filter"
              >
                <p className="invoices__filter-text">Filter by status</p>
                <img
                  className={`invoices__filter-arrow ${filterDropdown ? "invoices__filter-arrow--open" : ""}`}
                  src={arrowDown}
                  alt=""
                />
              </button>

              {filterDropdown && (
                <div className="invoices__filter-popup">
                  <label className="invoices__filter-option">
                    <input
                      className="invoices__filter-input"
                      type="checkbox"
                      checked={isChecked("draft")}
                      onChange={() => toggleStatus("draft")}
                    />
                    <span className="invoices__filter-box" aria-hidden="true">
                      <img
                        className="invoices__filter-check"
                        src={check}
                        alt=""
                      />
                    </span>
                    <span className="invoices__filter-label">Draft</span>
                  </label>

                  <label className="invoices__filter-option">
                    <input
                      className="invoices__filter-input"
                      type="checkbox"
                      checked={isChecked("pending")}
                      onChange={() => toggleStatus("pending")}
                    />
                    <span className="invoices__filter-box" aria-hidden="true">
                      <img
                        className="invoices__filter-check"
                        src={check}
                        alt=""
                      />
                    </span>
                    <span className="invoices__filter-label">Pending</span>
                  </label>

                  <label className="invoices__filter-option">
                    <input
                      className="invoices__filter-input"
                      type="checkbox"
                      checked={isChecked("paid")}
                      onChange={() => toggleStatus("paid")}
                    />
                    <span className="invoices__filter-box" aria-hidden="true">
                      <img
                        className="invoices__filter-check"
                        src={check}
                        alt=""
                      />
                    </span>
                    <span className="invoices__filter-label">Paid</span>
                  </label>
                </div>
              )}
            </div>

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
            {filteredData === null ? (
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
              filteredData.map((item) => (
                <article
                  key={item.id}
                  className="invoices__item"
                  onClick={() => navigate(`/invoices/${item.id}`)}
                >
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
