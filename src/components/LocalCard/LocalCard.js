import React, { useState } from "react";
import "./LocalCard.css";
import apiServiceInstance from "../../connect/apiService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../connect/AuthContext/AuthContext";
// import { useDateContext } from "../DateContext/DateContext";


const LocalCard = ({ localInfo }) => {
  const { token, isProManager } = useAuth();
  // const { availableDates } = useDateContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({ ...localInfo });
  // const [newLocalInfo, setNewLocalInfo] = useState(localInfo);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Nuevo estado
  // const navigate = useNavigate();

  // const handleReservation = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       localStorage.setItem("pendingLocalReservation", JSON.stringify(localInfo));
  //       navigate("/login&register");
  //     } else {
  //       const response = await apiServiceInstance.getLocalById(localInfo._id);
  //       console.log(response, "este es el Local");
  //       setLocalData(response);
  //     }
  //   } catch (error) {
  //     console.error('Error al crear reserva:', error);
  //   }
  // };

  const handleDeleteLocal = async (localById) => {
    if (!showDeleteConfirmation) {
      setShowDeleteConfirmation(true);
    } else {
      try {
        await apiServiceInstance.deleteLocalById(localById);
        window.location.reload();
        console.log(localById, "este es el ide del local seleccionado");
      } catch (error) {
        console.error('Error al eliminar el local:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        const response = await apiServiceInstance.updateLocals(localInfo._id, editedFields);
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };
  console.log(editedFields.availableDates, "ESTAS SON LAS FECASSSSS");

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields({ ...editedFields, [name]: value });
  };

  return (
    <>
      <div className="overlap-group-wrapper">
        <div className="overlap-group-2">
          <img className="rectangle-2" alt={localInfo.id} src={localInfo.imgUrl} />
          {showDeleteConfirmation ? (
            <div className="delete-confirmation">
              ¿Seguro que quieres borrar este local?
              <button onClick={() => setShowDeleteConfirmation(false)}>Cancelar</button>
            </div>
          ) : isEditing ? (
            <div className="edit-fields">
              <input
                type="text"
                className="edit-input-text"
                name="discoName"
                value={editedFields.discoName}
                onChange={handleChange}
              />
              <input
                type="text"
                className="edit-input-text"
                name="ubication"
                value={editedFields.ubication}
                onChange={handleChange}
              />
              <input
                type="text"
                className="edit-input-text"
                name="deals"
                value={editedFields.deals}
                onChange={handleChange}
                placeholder="Precio"
              />
              <span className="input-addon">€</span>
              <input
                type="text"
                className="edit-input-text"
                name="promotion"
                value={editedFields.promotion}
                onChange={handleChange}
              />
              <input
                type="text"
                className="edit-input-text"
                name="availableDates"
                value={editedFields.availableDates}
                onChange={handleChange}
              />
              <input
                type="text"
                className="edit-input-text"
                name="categories"
                value={editedFields.categories}
                onChange={handleChange}
              />
            </div>
          ) : (

            // Contenido normal de la card
            <div>
              <div className="text-wrapper-10">
                {editedFields.localInfo || localInfo.localInfo}
              </div>
              <div className="element-entrada-antes-de">
                <p className="local-category">Categorías: {localInfo.categories}</p>
                <span className="local-deals">{localInfo.deals}€ - </span>
                <span className="local-hour">{localInfo.hour}</span>
              </div>
              <p className="refresco-cerveza-o"> (Refresco, cerveza, copa, etc )</p>
              <div className="text-wrapper-10">{localInfo.discoName}</div>
              <p className="text-wrapper-11">{localInfo.ubication}</p>
              <p className="div-2">
                <span className="text-wrapper-12">Oferta: </span>
                <span className="text-wrapper-13">{localInfo.promotion}</span>
              </p>
              <p className="local-available-dates">
                Fechas disponibles:
                {localInfo.availableDates.join(', ').split(',').map((date, index) => (
                  <span key={index} className="date-item">{date.trim()}</span>
                ))}
              </p>
            </div>
          )}
          {isEditing ? (
            <div className="edit-buttons-fields">
              <button className="save-button" onClick={handleSave}>
                Guardar Cambios
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          ) : isProManager() ? (
            <div className="edit-buttons-card">
              <button className="add-local" onClick={handleEdit}>
                Editar
              </button>
              <button className="edit-local" onClick={() => handleDeleteLocal(localInfo._id)}>
                Borrar
              </button>
            </div>
          ) : (
            // Botón de reserva normal
            <div className="reserve-button-container">
              <button className="reserve-button">
                {token ? (
                  <Link to={`/booking/${localInfo._id}`} className=".text-wrapper-6 ">RESERVAR</Link>
                ) : (
                  <Link to="/login&register" className=".text-wrapper-6 ">RESERVAR</Link>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LocalCard;
