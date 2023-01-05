import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import payService from "./payService";

// Get pay from localStorage
// const pays = JSON.parse(localStorage.getItem("pays"));

const initialState = {
  pays: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user goals
export const getPays = createAsyncThunk(
  'pay/gets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await payService.getPays(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get pay
export const getPay = createAsyncThunk(
  "pay/get",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await payService.getPay(token, id)
    } catch (error){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const deletePay = createAsyncThunk(
  'pay/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await payService.deletePay(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    resetPay: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPays.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pays = action.payload;
      })
      .addCase(getPays.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPay.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pays = action.payload
      })
      .addCase(getPay.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePay.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePay.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pays = state.pays.filter(
          (pay) => pay._id !== action.payload.id
        )
      })
      .addCase(deletePay.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
});

export const {reset} = paySlice.actions
export default paySlice.reducer
