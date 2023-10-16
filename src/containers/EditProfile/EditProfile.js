import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = ({ userData, onSave }) => {
  const { usersName: name, email: initialEmail, age: initialAge, avatarImg: initialProfileImage } = userData;

  const [usersName, setUsersName] = useState(name);
  const [email, setEmail] = useState(initialEmail);
  const [age, setAge] = useState(initialAge);
  const [newProfileImage, setNewProfileImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setNewProfileImage(file);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUserFields = {
      _id: userData._id, 
      usersName,
      email,
      age,
      avatarImg: newProfileImage || initialProfileImage,
    };
    try {
      await onSave(updateUserFields);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-edit-box">
          <label>Nombre:</label>
          <input type="text" value={usersName} onChange={(e) => setUsersName(e.target.value)} />
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Edad:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Foto de Perfil:</label>
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          {newProfileImage && (
            <img
              src={newProfileImage}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
            />
          )}
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
