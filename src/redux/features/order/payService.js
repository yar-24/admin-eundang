import { axiosInstance } from "../../../config";

const getPays =  async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance
  .get(`/order/getOrders`, config)
  // .then((res) => {
  //   console.log("sukses get order", res);
  // })
  // .catch((err) => {
  //   console.log("err", err);
  // });

  return response.data;
}

// GET PAY
const getPay =  async (token, id) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance
  .get(`order/status/${id}`, config)

  return response.data;
}

const deletePay = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.delete("order/charge/"+ id, config)
   .then((res) => {
    console.log("sukses");
  })
  .catch((err) => {
    console.log("err");
  });

  return response.data;
};


const payService = {
  getPays,
  getPay,
  deletePay,
};

export default payService;
