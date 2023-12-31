import React, { useState } from 'react';
import apiServiceInstance from '../../connect/apiService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../connect/AuthContext/AuthContext'
import DatePicker from 'react-datepicker';
import owl from "../../images/logoOwl.png"
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import "./AddLocal.css"

const AddLocal = () => {
  //MODELO del Locales
  const [discoName, setDiscoName] = useState('');
  const [ubication, setUbication] = useState('');
  const [promotion, setPromotion] = useState('');
  const [deals, setDeals] = useState('');
  const [hour, setHour] = useState('');
  const [imgUrl, setimgUrl] = useState(null);
  const initialDate = new Date();
  const [availableDates, setAvailableDates] = useState([]);

  console.log(availableDates, "estos son fechitasasssssss");

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [message, setMessage] = useState('');
  const [selectMessage, setSelectMessage] = useState('');
  const [imgSelected, setImgSelected] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [error, setError] = useState(false);
  const { isProManager } = useAuth();
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);

  const resetForm = () => {
    setDiscoName('');
    setUbication('');
    setPromotion('');
    setDeals('');
    setHour('');
    setimgUrl(null);
    setAvailableDates([]);
    setSelectedDate(initialDate);
    setMessage('');
    setSelectMessage('');
    setImgSelected(false);
    setRedirect(false);
    setSelectedCategories([]);
    setCurrentDate(null);
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleAddDate = (event) => {
    event.preventDefault();
    if (currentDate && !availableDates.includes(currentDate)) {
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      setAvailableDates([...availableDates, formattedDate]);
      setCurrentDate(null);
    }
  };

  const handleRemoveDate = (dateToRemove) => {
    const updatedDates = availableDates.filter((date) => date !== dateToRemove);
    setAvailableDates(updatedDates);
  };

  const handleImageChange = (event) => {
    setimgUrl(event.target.files[0]);
    setImgSelected(true)
    setSelectMessage('*Archivo seleccionado correctamente*')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!discoName || selectedCategories.length === 0) {
      setRequiredFieldsEmpty(true);
      setError(true);
      return;
    }
    if (!imgUrl) {
      setRequiredFieldsEmpty(true);
      setError(true);
      setMessage('La imagen es un campo obligatorio.');
      return;
    }

    const formattedDates = selectedDate.toISOString();
    console.log(formattedDates, "formattedDates");
    console.log(event, "este es el evento");
    const formData = new FormData();
    formData.append('discoName', discoName);
    formData.append('deals', deals);
    formData.append('imgUrl', imgUrl);
    formData.append('ubication', ubication);
    formData.append('hour', hour);
    formData.append('promotion', promotion);
    formData.append('availableDates', (availableDates));
    formData.append('categories', (selectedCategories));
    setRequiredFieldsEmpty(false);
    try {
      const response = await apiServiceInstance.addLocal(formData);
      resetForm();
      setMessage('*Local Añadido Correctamente*');
      setRedirect(true);

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setMessage('No se ha podido añadir el local');
    }
  };

  const categories = [
    { name: "Festivales y Macro Discotecas" },
    { name: "Despedidas de Soltera" },
    { name: "Conciertos" },
    { name: "Celebraciones y Eventos" },
    { name: "Novedades" },
  ];

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(category => category !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <div className="add-local-container">
      <div className="back-button-add-local">
        <Link to={isProManager ? '/pro-manager-home' : '/locals'}>
          <span>&lt;</span>
        </Link>
      </div>
      <div className="owl-background">
        <img className="owl-img" alt="Group" src={owl} />
      </div>
      <div className="form-container">
        <div className="login-overlap">
          <div className="login-overlap-group">
            <h1 className="text-init">Añadir Local</h1>
          </div>
        </div>
        <form className='add-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="discoName">*Nombre del Lugar:</label>
            <input
              type="text"
              id="discoName"
              value={discoName}
              onChange={(e) => setDiscoName(e.target.value)}
              autoComplete='off'
              placeholder='Ej: Nombre del local o fiesta'
            />
          </div>
          <div>
            <label htmlFor="ubication">Ubicación:</label>
            <input
              type="text"
              id="ubication"
              value={ubication}
              onChange={(e) => setUbication(e.target.value)}
              autoComplete='off'
              placeholder='Ej: Calle de Atocha, 125, 28012 Madrid '
            />
          </div>
          <div>
            <label htmlFor="promotion">Promoción:</label>
            <input
              type="text"
              id="promotion"
              value={promotion}
              onChange={(e) => setPromotion(e.target.value)}
              autoComplete='off'
              placeholder='Ej: bebida + entrada...'
            />
            <p className='success-message-promotion'>*Bebidas: (Refresco, cerveza, copa, etc )*</p>
          </div>
          <div>
            <label htmlFor="deals">Precio(€):</label>
            <input
              type="number"
              id="deals"
              value={deals}
              onChange={(e) => setDeals(e.target.value)}
              autoComplete='off'
              placeholder='Ej: 15 €'
            />
          </div>
          <div className='date-picker-container'>
            <label htmlFor="date">Selecciona una fecha:</label>
            <div className="date-picker">
              <DatePicker
                id="date"
                selected={currentDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                isClearable
                placeholderText="Seleccione una fecha"
                autoComplete="off"
              />
              <button type="button" className="add-date-button" onClick={handleAddDate}>
                Agregar Fecha
              </button>
            </div>
            <ul className='list-of-dates'>
              {availableDates.map((date, index) => (
                <li key={index} className="date-item">
                  {date}
                  <button className="remove-date-button" onClick={() => handleRemoveDate(date)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="hour">Hora de entrada:</label>
            <input
              type="text"
              id="hour"
              value={hour}
              autoComplete='off'
              onChange={(e) => setHour(e.target.value)}
              placeholder='Ej: Entrada antes de la 1:30 a.m.'
            />
          </div>
          <div>
            <label htmlFor="imgUrl">*Imagen:</label>
            <input
              type="file"
              id="imgUrl"
              onChange={handleImageChange}
            />
            {imgSelected && (
              <p className="selected-message">{selectMessage}</p>
            )}
          </div>
          <button type="submit" disabled={redirect}>Add Local</button>
          {setMessage ? (<p className="success-message">{message}</p>) : (<p className="success-message">*No se ha podido añadir el local*</p>)}
        </form>
        {redirect && (
          <Link to="/locals">
            <div className="icons8-volver">Volver</div>
          </Link>
        )}
      </div>
      <div className='categories-container'>
        <label htmlFor="categories" className='label'>*Selecciona categorías:</label>
        <div className='categories-list'>
          {categories.map(category => (
            <label key={category.name}>
              <input
                type="checkbox"
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={handleCategoryChange}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      {requiredFieldsEmpty && (
        <p className="add-local-error-message">Por favor, complete todos los campos obligatorios(*)</p>
      )}
    </div>

  );
};

export default AddLocal;
