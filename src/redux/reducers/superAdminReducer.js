import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../utils/constant';
import superAdminServices from '../services/superAdminServices';

export const superAdminMonitoring = createAsyncThunk(
    'get/super-admin-monitoring',
    async ({ limit, page, searchValue }, thunkAPI) => {
        try {
            const response = await superAdminServices.superAdminMonitoring({
                page
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getDetailSuperAdminFap = createAsyncThunk(
    'get/detailFapSuperAdmin',
    async (id, thunkAPI) => {
        try {
            const response = await superAdminServices.getDetailSuperAdminFap(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    data: null,
    dataDetail: null,
    status: STATUS_CODE.IDLE,
};

const superAdminSlice = createSlice({
    name: 'super-admin',
    initialState,
    reducers: {
        resetSuperAdmin: (state) => {
            (state.data = null), (state.status = STATUS_CODE.IDLE);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(superAdminMonitoring.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(superAdminMonitoring.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(superAdminMonitoring.rejected, (state) => {
            state.status = STATUS_CODE.ERROR;
        });
        // Get Detail
        builder.addCase(getDetailSuperAdminFap.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.dataDetail = action.payload;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getDetailSuperAdminFap.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getDetailSuperAdminFap.rejected, (state) => {
            state.status = STATUS_CODE.ERROR;
        });
    },
});

export const { resetSuperAdmin } = superAdminSlice.actions;
export default superAdminSlice.reducer;
