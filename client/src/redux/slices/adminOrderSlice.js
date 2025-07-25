import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL =  `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`



// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(
            `${API_URL}/api/admin/orders`,
            {
              headers: { authorization: `Bearer ${USER_TOKEN}` }
            }
        ) 
        return response.data
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
      }
    }
)

// Update order delivery status (admin only)
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
            `${API_URL}/api/admin/orders/${id}`,
            {
              headers: { authorization: `Bearer ${USER_TOKEN}` }
            }
        ) 
        return response.data
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
      }
    }
)

// Delete an order (admin only)
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(
            `${API_URL}/api/admin/orders/${id}`,
            {
              headers: { authorization: `Bearer ${USER_TOKEN}` }
            }
        ) 
        return id
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
        
      }
    }
)


const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
      orders: [],
      totalOrders: 0,
      totalSales: 0,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
         state.loading = true;
         state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
         state.loading = false;
         state.orders = action.payload;
         state.totalOrders = action.payload.length

         // calculate total sales
         const totalSales = action.payload.reduce((acc, order) => {
            return acc + order.totalPrice
         }, 0)
         state.totalSales = totalSales
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      })

      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
         const updatedOrder = action.payload
         const orderIndex = state.orders.findIndex(
            (order) => order._id === updatedOrder._id
         )
         if (orderIndex !== -1) {
           state.orders[orderIndex] = updatedOrder 
         }
      })

      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
         state.orders = state.orders.filter(
            (order) => order._id !== action.payload
         )
      })
    }
})


export default adminOrderSlice.reducer