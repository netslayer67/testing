import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_CODE } from "../../utils/constant";
import tambahAnggotaAdminService from "../services/tambahAnggotaAdminService";

export const addAdminMember = createAsyncThunk(
  "add/add-member-admin",
  async (data, thunkAPI) => {
    try {
      const response = await tambahAnggotaAdminService.addMemberAdmin(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null,
  status: STATUS_CODE.IDLE,
};

const tambahAnggotaAdminSlice = createSlice({
  name: "add-member-admin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addAdminMember.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUS_CODE.IDLE;
    });
    builder.addCase(addAdminMember.pending, (state) => {
      state.status = STATUS_CODE.LOADING;
    });
    builder.addCase(addAdminMember.rejected, (state) => {
      state.status = STATUS_CODE.ERROR;
    });
  },
});

export default tambahAnggotaAdminSlice.reducer;
