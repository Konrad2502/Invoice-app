// src/components/Invoices/Invoices.tsx
import "./Invoices.scss";
import arrowDown from "../../assets/icon-arrow-down.svg";
import plusIcon from "../../assets/icon-plus.svg";
import arrowRight from "../../assets/icon-arrow-right.svg";

export default function Invoices() {
  return (
    <main className="invoices">
      <div className="invoices__content">
        <div className="invoices__top">
          <div className="invoices__header">
            <h3 className="invoices__header-title">Invoices</h3>
            <p className="invoices__header-text">There are 7 total invoices</p>
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
            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>RT3080
              </p>
              <p className="invoices__meta">Due 19 Aug 2021</p>
              <p className="invoices__meta">Jensen Huang</p>
              <p className="invoices__amount">£ 1,800.90</p>
              <div className="invoices__status invoices__status--paid">
                <span className="invoices__dot invoices__dot--paid" />
                <span className="invoices__status-text">Paid</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>

            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>XM9141
              </p>
              <p className="invoices__meta">Due 20 Sep 2021</p>
              <p className="invoices__meta">Alex Grim</p>
              <p className="invoices__amount">£ 556.00</p>
              <div className="invoices__status invoices__status--pending">
                <span className="invoices__dot invoices__dot--pending" />
                <span className="invoices__status-text">Pending</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>

            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>RG0314
              </p>
              <p className="invoices__meta">Due 01 Oct 2021</p>
              <p className="invoices__meta">John Morrison</p>
              <p className="invoices__amount">£ 14,002.33</p>
              <div className="invoices__status invoices__status--paid">
                <span className="invoices__dot invoices__dot--paid" />
                <span className="invoices__status-text">Paid</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>

            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>RT2080
              </p>
              <p className="invoices__meta">Due 12 Oct 2021</p>
              <p className="invoices__meta">Alysa Werner</p>
              <p className="invoices__amount">£ 102.04</p>
              <div className="invoices__status invoices__status--pending">
                <span className="invoices__dot invoices__dot--pending" />
                <span className="invoices__status-text">Pending</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>

            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>AA1449
              </p>
              <p className="invoices__meta">Due 14 Oct 2021</p>
              <p className="invoices__meta">Melissa Clarke</p>
              <p className="invoices__amount">£ 4,032.33</p>
              <div className="invoices__status invoices__status--pending">
                <span className="invoices__dot invoices__dot--pending" />
                <span className="invoices__status-text">Pending</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>

            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>TY9141
              </p>
              <p className="invoices__meta">Due 31 Oct 2021</p>
              <p className="invoices__meta">Thomas Wayne</p>
              <p className="invoices__amount">£ 6,155.91</p>
              <div className="invoices__status invoices__status--pending">
                <span className="invoices__dot invoices__dot--pending" />
                <span className="invoices__status-text">Pending</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>

            <article className="invoices__item">
              <p className="invoices__id">
                <span className="invoices__hash">#</span>FV2353
              </p>
              <p className="invoices__meta">Due 12 Nov 2021</p>
              <p className="invoices__meta">Anita Wainwright</p>
              <p className="invoices__amount">£ 3,102.04</p>
              <div className="invoices__status invoices__status--draft">
                <span className="invoices__dot invoices__dot--draft" />
                <span className="invoices__status-text">Draft</span>
              </div>
              <img className="invoices__chevron" src={arrowRight} alt="" />
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
