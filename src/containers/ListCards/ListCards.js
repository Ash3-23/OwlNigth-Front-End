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
      const response = await axios.get('http://localhost:4000/locals');
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
            {locals && locals.length > 0 ? (
              locals.map((local) => (
                <LocalCard key={local.id} localInfo={local} />
              ))
            ) : (
              <p>No hay locales disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ListCards;
