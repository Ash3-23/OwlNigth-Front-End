import React, { createContext, useContext, useState } from 'react';
// import { useEffect } from 'react';
// import apiServiceInstance from '../../connect/apiService';

const DateContext = createContext();

export const useDateContext = () => {
  return useContext(DateContext);
};

export const DateProvider = ({ children }) => {
  const [availableDates, setAvailableDates] = useState([]);

  const setDates = (newDates) => {
    setAvailableDates(newDates);
    console.log(newDates);
    console.log(setAvailableDates);
  };
  // const fetchAvailableDates = async () => {
  //   try {
  //     const response = await apiServiceInstance.getAvailableDates();
  //     const datesFromServer = response.data.availableDates;
  //     setAvailableDates(datesFromServer);
  //   } catch (error) {
  //     console.error('Error al obtener las fechas disponibles:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAvailableDates();
  // }, []);

  return (
    <DateContext.Provider value={{ availableDates, setAvailableDates, setDates,
    // fetchAvailableDates
     }}>
      {children}
    </DateContext.Provider>
  );
};
