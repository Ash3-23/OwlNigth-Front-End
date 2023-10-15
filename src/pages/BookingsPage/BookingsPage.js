import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom"
import 'react-datepicker/dist/react-datepicker.css';
import './BookingPage.css';
import apiServiceInstance from '../../connect/apiService';
// import { useAuth } from '../../connect/AuthContext/AuthContext';
import { useDateContext } from "../../components/DateContext/DateContext";
//necesito hacer cambiooosss

const BookingPage = ({ localInfo }) => {

  const { localId } = useParams();
  // const [selectedDate, setSelectedDate] = useState('');
  const { availableDates, setDates } = useDateContext();
  const [localData, setLocalData] = useState(null);
  const [isBookingProcessing, setIsBookingProcessing] = useState(false);
  // const { token, user, datesFromAddLocal } = useAuth();
  const navigate = useNavigate();

  const getLocalData = async () => {
    const data = await apiServiceInstance.getLocalById(localId)
    setLocalData(data);
  };

  useEffect(() => {
    getLocalData()
  }, []);

  const handleSaveReservation = async () => {
    try {
      setIsBookingProcessing(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticación no encontrado');
        return;
      }
      const userData = await apiServiceInstance.getUserData();
      if (!userData) {
        console.error('No se pudo obtener la información del usuario');
        return;
      };
      const userId = userData._id;
      const localDate = availableDates;
      const dates = localDate ? localDate : [];
      // const bookingData = {
      //   localId: localId,
      //   userId: userId,
      //   dates: dates,
      // };
      const response = await apiServiceInstance.createBooking(userId, localId, dates, token);
      console.log('Respuesta de createBooking:', response);
      setTimeout(() => {
        setIsBookingProcessing(false);
        navigate('/library');
      }, 2000);
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      setIsBookingProcessing(false);
    }
  };

  // const handleDateChange = async (date) => {
  //   const dates = await apiServiceInstance.getLocalById(localData.availableDates)
  //   setSelectedDate(dates);
  // };

  return (
    <>
      <div className="booking-container">
        <h1 className="booking-title">Detalles del Local</h1>
        {localData ? (
          <div className="booking-details">
            <img
              src={localData.imgUrl}
              alt={`Foto de ${localData.discoName}`}
              className="booking-image"
            />
            <div className="booking-info">
              <p className="booking-info-item">
                <strong>Nombre del local:</strong> {localData.discoName}
              </p>
              <p className="booking-info-item">
                <strong>Ubicación:</strong> {localData.ubication}
              </p>
              <div className="booking-info-item">
                <strong>Fecha:</strong>
                <div className="booking-info-item">
                  <option value="">Selecciona una fecha</option>
                  {availableDates.map((date, index) => (
                    <option key={index} value={date}>
                      {date}
                    </option>
                  ))}
                </div>
              </div>
              <p className="booking-info-item">
                <strong>Promoción:</strong> {localData.promotion}
              </p>
              <p className="booking-info-item">
                <strong>Deals:</strong> {localData.deals}
              </p>
              <p className="booking-info-item">
                <strong>Hora:</strong> {localData.hour}
              </p>
              <button className='save-booking-button' onClick={handleSaveReservation}>Guardar Reserva</button>
              {isBookingProcessing && <p>Guardando reserva...</p>}
            </div>
          </div>
        ) : (
          <Link to="/locals" className="back-link">
            <button className="back-button">Volver</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default BookingPage;