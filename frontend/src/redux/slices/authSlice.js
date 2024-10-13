import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// Register a user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      
      const result = await axios.post(`${REACT_APP_BASE_URL}/register`, userData);
      
      // Save token and user info to localStorage
      const { token, user } = result.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return result.data;
    } catch (error) {
      console.log("This is error while register", error);
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Login a user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${REACT_APP_BASE_URL}/login`, userData, {
        withCredentials: true
      });
      const { token, user } = result.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null, 
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.successMessage = '';
      state.errorMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.successMessage = "Registration successful!";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Registration failed';
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.successMessage = "Login successful!";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Login failed';
      });
  }
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;
