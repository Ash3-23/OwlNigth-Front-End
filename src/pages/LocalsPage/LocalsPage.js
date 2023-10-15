import React from "react";
import "./LocalsPage.css";
import deals from "./imgs/deals.jpg"
import { Link } from "react-router-dom";
import ListCards from "../../containers/ListCards/ListCards";
import { useAuth } from "../../connect/AuthContext/AuthContext"

const Banner = () => {
  return (
    <div className="overlap-group">
      <img className="rectangle" alt="Rectangle" src={deals} />
      <div className="banner-text-offerts">
        <Link to="/newspage">
          <p className="element-OFF">
            <span className="span">20</span>
            <span className="text-wrapper-2">% </span>
            <span className="span">OFF</span>
          </p>
          <p className="p-offerts">Make your first reservation and get</p>
        </Link>
      </div>
    </div>
  );
};

const Locals = () => {
  const { isProManager } = useAuth();

  const listCardsStyle = isProManager()
    ? { marginTop: "0px" }
    : { marginTop: "550px" };
  return (
    <>
      <div className="desktop">
        <div className="div">
          {!isProManager() ? (
            <><div className="desktop">
              <div className="overlap-locals-page">
                <Banner />
              </div>
              <div className="cards-above-banner">
                <ListCards className="list-cards-locals" customStyle={listCardsStyle} />
              </div>
            </div>
              <div className="text-wrapper-5">All Nights</div>
            </>
          ) : (true)}
          {isProManager() && (
            <div className="cards-above-banner">
              <ListCards className="list-cards-locals" customStyle={listCardsStyle} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Locals;