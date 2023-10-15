import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import apiServiceInstance from '../../connect/apiService';
import { useAuth } from '../../connect/AuthContext/AuthContext';
import avatar from '../../images/iconoAvatar.png';
import EditProfile from '../../containers/EditProfile/EditProfile';

const Profile = () => {
    const { logout, } = useAuth()
    const [avatarImg, setAvatarImg] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [editAvatar, setEditAvatar] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        apiServiceInstance.getUserData()
            .then(response => {
                setDataUser(response);
            })
            .catch(error => {
                console.error('Error al obtener los datos del usuario:', error);
            });
    }, []);

    const handleAvatarChange = (event) => {
        const selected = event.target.files[0];
        if (selected) {
            setSelectedAvatar(selected);
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarImg(e.target.result);
            };
            reader.readAsDataURL(selected);
        }
    };
    const handleEditAvatar = async () => {
        try {
            if (selectedAvatar) {
                const response = await apiServiceInstance.updateAvatar(selectedAvatar, dataUser._id);
                if (response && response.data && response.data.avatarImg) {
                    setAvatarImg(response.data.avatarImg);
                    setEditAvatar(false);
                    console.log('Imagen de avatar actualizada con éxito');
                }
            } else {
                console.error('Debes seleccionar una imagen de avatar.');
            }
        } catch (error) {
            console.error('Error al actualizar la imagen de avatar:', error);
        }
    };
    
    
    const handleSave = async (updateUserFields) => {
        try {
            if (!dataUser._id) {
                console.error('ID de usuario no válido.');
                return;
            }
            const response = await apiServiceInstance.updateUsers(dataUser._id, updateUserFields);
            setDataUser(response);

            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    return (
        <>
            <div className="profile-container">
                <h1 className='profile-name'>Bienvenido a tu perfil, {dataUser.usersName}</h1>
                <div className="user-info">
                    {isEditing ? (
                        <EditProfile userData={dataUser} onSave={handleSave} profileImage={avatarImg} />
                    ) : (
                        <><div className="user-avatar">
                            <img
                                className='user-image-profile'
                                src={avatarImg || dataUser.avatarImg || avatar}
                                alt="Avatar del usuario"
                            />
                            {editAvatar && (
                                <button className="save-avatar-button" onClick={handleEditAvatar}>
                                    Guardar imagen de perfil
                                </button>
                            )}
                        </div>
                            <div className="user-details">
                                <div className="name-wrapper-1">Nombre de Usuario</div>
                                <div className='rectangle-inputs-1'><p className='edit-buttor-for-user'>{dataUser.usersName}</p></div>
                                <div className="email-wrapper-3">Email</div>
                                <div className='rectangle-inputs-1'><p className='edit-buttor-for-user'>{dataUser.email}</p></div>
                                <div className="dni-wrapper-4">DNI</div>
                                <div className='rectangle-inputs-1'><p className='edit-buttor-for-user'>{dataUser.dni}</p></div>
                                <div className="age-wrapper-5">Edad</div>
                                <div className="age-input-container">
                                    <div className='rectangle-inputs-2'><p className='edit-buttor-for-user'>{dataUser.age}</p></div>
                                    <button className="edit-button edit-age-button">
                                        <label
                                            htmlFor="avatar-input"
                                            className="edit-avatar-button"
                                            onClick={() => setEditAvatar(true)}
                                        >Editar imagen de perfil</label>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {isEditing ? (
                    <button onClick={() => setIsEditing(false)} className='button-profile-delete'>Cancelar Edición</button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className='button-profile-update'>Editar Perfil</button>
                )}
                <button className="logout-button" onClick={logout}>Cerrar Sesión</button>
            </div>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-input"
                onChange={handleAvatarChange}
            />
        </>
    );
};

export default Profile;
