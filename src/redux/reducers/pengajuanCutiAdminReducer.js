import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_CODE } from "../../utils/constant";
import pengajuanCutiAdminService from "../services/pengajuanCutiAdminService";

export const leaveApplicationAdmin = createAsyncThunk(
  "save/leave-application-admin",
  async (data, thunkAPI) => {
    try {
      const response = await pengajuanCutiAdminService.leaveApplicationAdmin(data);
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
    builder.addCase(leaveApplicationAdmin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUS_CODE.IDLE;
    });
    builder.addCase(leaveApplicationAdmin.pending, (state) => {
      state.status = STATUS_CODE.LOADING;
    });
    builder.addCase(leaveApplicationAdmin.rejected, (state) => {
      state.status = STATUS_CODE.ERROR;
    });
  },
});

export default tambahAnggotaAdminSlice.reducer;
