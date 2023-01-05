// import {applyMiddleware, createStore} from 'redux'
// import reducer from './reducer/reducer';
// import thunk from 'redux-thunk'

// const store = createStore(reducer, applyMiddleware(thunk))

// export default store;


import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import goalReducer from './features/goals/goalSlice'
import payReducer from './features/order/paySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    pays: payReducer,
  },
})

export default store;