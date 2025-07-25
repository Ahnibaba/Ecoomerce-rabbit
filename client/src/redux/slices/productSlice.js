import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async Thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilters",
  async({ collection, size, color, gender, miniPrice, maxPrice, sortBy, search, category, material, brand, limit }) => {
     const query = new URLSearchParams()
     if (collection) query.append("collection", collection)
     if (size) query.append("size", size)
     if (color) query.append("color", color)
     if (gender) query.append("gender", gender)
     if (minPrice) query.append("minPrice", minPrice)
     if (maxPrice) query.append("maxPrice", maxPrice)
     if (sortBy) query.append("sortBy", sortBy)
     if (search) query.append("search", search)
     if (material) query.append("material", material)
     if (brand) query.append("brand", brand)
     if (limit) query.append("limit", limit)

     const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    )
  }
)