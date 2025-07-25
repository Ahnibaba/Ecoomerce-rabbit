import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async(_, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
          {
            headers: {
                authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
          }
        )
        return response.data
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
        
      }  
    }
)

// Async thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk(
   "orders/fetchOrderDetails",
   async (orderId, { rejectWithValue }) => {
     try {
       const response = await axios.get(
         `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
         {
            headers: {
              authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
         }
       ) 
       return response
     } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)
        
     }
   } 

)

const orderSlice = createSlice({
     name: "orders",
     initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null
     },
     reducers: {}
})