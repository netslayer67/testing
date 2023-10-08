import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../utils/constant';
import AdminServices from '../services/adminServices';

export const getAdminInfo = createAsyncThunk(
    'admin/getAdminInfo',
    async (_, thunkAPI) => {
        try {
            return await AdminServices.getAdminInfo();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    status: STATUS_CODE.IDLE,
    data: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAdminInfo.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload.data;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getAdminInfo.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getAdminInfo.rejected, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
            }
            state.status = STATUS_CODE.ERROR;
        });
    },
});

export default adminSlice.reducer;
