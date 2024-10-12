import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ currentPage = 1 } = {}, { rejectWithValue }) => {
    try {
    let  skip = (currentPage - 1) * 10
      const response = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );

      
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error While Fetching Users");
    }
  }
);

const allUserSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    isError: false,
    users: [],
    totalUsers: 0,
    limit: 10,
    skip: 0,
    errorMessage: "",
    currentPage: 1
  },
  reducers: {
    setPagination: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload.users || [];
        state.totalUsers = action.payload.total || 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch users";
      });
  },
});

export const { setPagination } = allUserSlice.actions;

export default allUserSlice.reducer; 