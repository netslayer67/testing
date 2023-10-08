import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../utils/constant';
import superAdminProfileServices from '../services/superAdminProfileService';

export const getSuperAdminInfo = createAsyncThunk(
    'superadmin/superadmin-profile',
    async (_, thunkAPI) => {
        try {
            return await superAdminProfileServices.getSuperAdminInfo();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    status: STATUS_CODE.IDLE,
    data: null,
};

const superAdminSlice = createSlice({
    name: 'superadmin-profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSuperAdminInfo.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload.data;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getSuperAdminInfo.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getSuperAdminInfo.rejected, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
            }
            state.status = STATUS_CODE.ERROR;
        });
    },
});

export default superAdminSlice.reducer;
