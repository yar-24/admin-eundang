import { axiosInstance } from "../../../config";

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance
    .post('goals', goalData, config)
    // .then((res) => {
    //   console.log("sukses");
    // })
    // .catch((err) => {
    //   console.log("err");
    // });

  return response.data;
};

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.get('goals', config);

  return response.data;
};

//getGoal
const getGoal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.get('goals', config)
  // .then((res) => {
  //   console.log("sukses", res);
  // })
  // .catch((err) => {
  //   console.log("err", err);
  // });

  return response.data;
};

//update
const updateGoal =  async (data, token, id) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axiosInstance
  .put(`goals/${id}`, data, config)
  // .then((res) => {
  //   console.log("sukses");
  // })
  // .catch((err) => {
  //   console.log("err");
  // });
  return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.delete(`goals/${goalId}`, config);

  return response.data;
};


const goalService = {
  createGoal,
  getGoals,
  getGoal,
  deleteGoal,
  updateGoal,
};

export default goalService;
