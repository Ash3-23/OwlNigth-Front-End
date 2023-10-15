import axios from "axios";

const instance = axios.create({
  baseURL:  "https://owlnight-backend.onrender.com"
});

const apiServiceInstance = {

  //ALLNIGHT
  getAllPlans: async () => {
    try {
      const response = await instance.get('/locals')
      return response.data
    } catch (error) {
      console.log('No me trae bien la data', error)
    }
  },

  //Login de usersNight y proManager
  usersLogin: async (usersName, password) => {
    try {
      const response = await instance.post('/usersnight/login', {
        usersName,
        password,
      });
      console.log(response.data, "este es el response.data");

      if (response.status === 200) {
        const responseData = response.data;
        return {
          success: true,
          token: responseData.token,
          errorMessage: '',
        };
      } else {
        console.error('Error en usersLogin:', response.data);
        return {
          success: false,
          errorMessage: 'Credenciales inválidas',
        };
      }
    } catch (error) {
      console.error('Error en usersLogin:', error);
      return {
        success: false,
        token: null,
        errorMessage: 'Error de conexión',
      };
    }
  },

  loginProManager: async (proName, password) => {
    const response = await instance.post('/proManager/loginpro', {
      proName,
      password,
    });
    if (response.status === 200) {
      const responseData = response.data;
      console.log(responseData, "esto es el responseData");
      return {
        success: true,
        token: responseData.token,
        errorMessage: '',
      };
    } else {
      console.error('Error en usersLogin:', response.data);
      return {
        success: false,
        errorMessage: 'Credenciales inválidas',
      };
    }
  },

  //usersNight Register
  registerUserNight: async (usersName, email, password, dni, age) => {
    try {
      const response = await instance.post("/usersNight", {
        usersName: usersName,
        email,
        password,
        dni,
        age,
      });
      console.log("esto es el response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Traer los usuarios al proManager
  getUsersNight: async () => {
    try {
      const response = await instance.get('/usersnight');
      console.log(response.data, "AQUITIENE QUE IR EL ID");
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios nocturnos:', error);
      throw error;
    }
  },

  addLocal: async (localData) => {
    try {
      const response = await instance.post('/locals/add/upload', localData);
      console.log(response, "prueba de categorías, esto es el response")
      return response.data;
    } catch (error) {
      console.error('Error adding local:', error);
      throw error;
    }
  },

  deleteLocalById: async (localById) => {
    try {
      const response = await instance.delete(`/locals/${localById}`);
      return response.data;
    } catch (error) {
      console.log("Error al borrar el local")
    }
  },

  deleteBookingById: async (bookingId) => {
    try {
      const response = await instance.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.log("Error al borrar la reserva")
    }
  },


  getLatestLocals: async () => {
    try {
      const response = await instance.get('/locals/news');
      console.log(response.data, "ESTOS SON LOS 3 LOCALES QUE BUSCO")
      return response.data;
    } catch (error) {
      console.error('Error al obtener los últimos locales:', error);
      throw error;
    }
  },

  getUserData: async (data) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Usuario no autenticado');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await instance.get('/usersnight/me', config);
      console.log(response.data, "este es el response.data de la petición de getUserData");
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  },

  getLocalById: async (localById) => {
    try {
      const response = await instance.get(`/locals/${localById}`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("no se han encontrado los datos del local")
      }
    } catch (error) {
      console.log("no se ha encontrado el id del local")
    }
  },

  getUserBookings: async (userId) => {
    try {
      const response = await instance.get(`/bookings/usersnight/${userId}`);
      return response.data.bookings;
    } catch (error) {
      console.error('Error al obtener las reservas del usuario:', error);
      throw error;
    }
  },

  createBooking: async (userId, localId, dates, token) => {
    try {
      const response = await instance.post('/bookings', {
        userId: userId,
        localId: localId,
        dates: dates,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "este es el response.data de createBooking");
      return response.data;
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      throw error;
    }
  },

  updateLocals: async (localById, updatedFields) => {
    try {
      const editFields = await instance.patch(`/locals/${localById}`, updatedFields)
      return editFields;
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      throw error;
    }
  },

  updateUsers: async (userNightById, updateUserFields) => {
    try {
      const response = await instance.patch(`/usersnight/${userNightById}`, updateUserFields);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      throw error;
    }
  },

  //Función para cambiar la imagen del Avatar
  updateAvatar: async (avatarImg, userId) => {
    try {
      const formData = new FormData();
      formData.append('avatarImg', avatarImg);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Usuario no autenticado');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await instance.post(`/usersnight/${userId}/update`, formData, config);

      if (response.status === 200) {
        console.log('Imagen de avatar actualizada con éxito');
      } else {
        console.error('Error al actualizar la imagen de avatar:', response.data);
        throw new Error('Error al actualizar la imagen de avatar');
      }
    } catch (error) {
      console.error('Error al actualizar la imagen de avatar:', error);
      throw error;
    }
  },

};

export default apiServiceInstance;
