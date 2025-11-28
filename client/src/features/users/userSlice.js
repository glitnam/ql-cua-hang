import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async () => {
    const res = await userService.getUsers();
    return res.data; 
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load";
      });
  }
});

export default userSlice.reducer;
