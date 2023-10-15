import LocalCard from "../../components/LocalCard/LocalCard";
import React, { useState, useEffect } from "react";
import "./ListCards.css";
import axios from "axios";

const ListCards = ({ isProManager, customStyle }) => {

  const [locals, setLocals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/locals', "https://owlnight-backend.onrender.com");
      setLocals(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="list-cards-locals" style={customStyle}>
        <div className="frame-list-cards">
          <div className="local-card-list" style={customStyle}>
            {/* {locals.map((local) => (
              <LocalCard key={local.id} localInfo={local} />
            ))} */}
            {locals.map((local, index) => (
              <LocalCard key={index} localInfo={local} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ListCards;
