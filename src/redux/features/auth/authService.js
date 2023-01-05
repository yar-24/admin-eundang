import { axiosInstance } from '../../../config'

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post('users/register',userData)
  //    .then((res) => {
  //   console.log("sukses", res);
  // })
  // .catch((err) => {
  //   console.log("err", err);
  // });


  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


// Login user
const login = async (userData) => {
  const response = await axiosInstance.post('users/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//update
const update =  async (data, id) => {

  const config = {
    headers: {
      // Accept: 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axiosInstance
  .put(`users/update/${id}`, data, config)
  .then((res) => {
    console.log("sukses");
  })
  .catch((err) => {
    console.log("err", err);
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


//updatebyadmin
const updateByAdmin =  async (data,token, id) => {

  const config = {
    headers: {
      // Accept: 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axiosInstance
  .put(`users/update/${id}`, data, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

//DELETE
 const response = await axiosInstance.delete(`users/${id}`, config, token)
 .then((res) => {
    console.log("sukses", res);
  })
  .catch((err) => {
    console.log("err", err);
  });

  if (response.data) {
    localStorage.setItem('users', JSON.stringify(response.data))
  }

  return response.data
};

//Login Google
// const loginGoggle = async (userData) => {
//   const response = await axios.get('http://localhost:5000/auth/login/success', userData)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

//   return response.data
// }

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const getUsers = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axiosInstance.get('users', config, token)

  if (response.data) {
    localStorage.setItem('users', JSON.stringify(response.data))
  }

  return response.data
}

const getUser = async (token, id) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axiosInstance.get(`users/${id}`, config, token)
  //  .then((res) => {
  //   console.log("sukses", res);
  // })
  // .catch((err) => {
  //   console.log("err", err);
  // });

  if (response.data) {
    localStorage.setItem('users', JSON.stringify(response.data))
  }

  return response.data
}

const authService = {
  register,
  logout,
  login,
  update,
  deleteUser,
  getUsers,
  getUser,
  updateByAdmin,
}

export default authService