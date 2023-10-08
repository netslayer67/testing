import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../utils/constant';
import nasabahAdminService from '../services/nasabahAdminService';
import { toastError, toastSuccess } from '../../components';

export const getNasabahAdmin = createAsyncThunk(
    'get/nasabahAdmin',
    async ({ limit, page, searchValue }, thunkAPI) => {
        try {
            const response = await nasabahAdminService.getNasabahAdmin({
                limit,
                page,
                searchValue,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getDetailFap = createAsyncThunk(
    'get/detailFap',
    async (id, thunkAPI) => {
        try {
            const response = await nasabahAdminService.getDetailFap(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const respondFap = createAsyncThunk(
    'patch/respondFap',
    async (payload, thunkAPI) => {
        try {
            const response = await nasabahAdminService.respondFap(payload);
            toastSuccess('Berhasil Submit');
            return response.data;
        } catch (error) {
            toastError('Gagal Submit');
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getDestBranch = createAsyncThunk(
    'get/getDestBranches',
    async (_, thunkAPI) => {
        try {
            const response = await nasabahAdminService.getDestBranches();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getJoki = createAsyncThunk('get/getJoki', async (_, thunkAPI) => {
    try {
        const response = await nasabahAdminService.getJoki();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    data: null,
    dataDetail: null,
    status: STATUS_CODE.IDLE,
    branches: null,
    message: null,
    joki: null,
};

const nasabahAdminSlice = createSlice({
    name: 'nasabahAdmin',
    initialState,
    reducers: {
        resetNasabah(state) {
            state.data = null;
            state.status = STATUS_CODE.IDLE;
            state.branches = null;
        },
    },
    extraReducers: (builder) => {
        /* Get nasabah */
        builder.addCase(getNasabahAdmin.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload;
            }
            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getNasabahAdmin.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getNasabahAdmin.rejected, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload;
            }
            state.status = STATUS_CODE.ERROR;
        });
        /* Get detail */
        builder.addCase(getDetailFap.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.dataDetail = action.payload;
            }
            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getDetailFap.pending, (state, action) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getDetailFap.rejected, (state, action) => {
            if (action.payload.data) {
                state.dataDetail = action.payload;
            }
            state.status = STATUS_CODE.ERROR;
        });
        builder.addCase(respondFap.fulfilled, (state, action) => {
            state.status = STATUS_CODE.IDLE;
            state.message = action.payload.message;
        });
        builder.addCase(respondFap.rejected, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload;
            }
            console.log(action.payload);
            state.status = STATUS_CODE.ERROR;
        });
        builder.addCase(respondFap.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getDestBranch.fulfilled, (state, action) => {
            state.status = STATUS_CODE.IDLE;
            state.branches = action.payload;
        });
        builder.addCase(getDestBranch.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getDestBranch.rejected, (state) => {
            state.status = STATUS_CODE.ERROR;
        });
        builder.addCase(getJoki.fulfilled, (state, action) => {
            state.status = STATUS_CODE.IDLE;
            if (action.payload.data) {
                state.joki = action.payload;
            }
        });
        builder.addCase(getJoki.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getJoki.rejected, (state) => {
            state.status = STATUS_CODE.ERROR;
            state.joki = null;
        });
    },
});

export const { resetNasabah } = nasabahAdminSlice.actions;
export default nasabahAdminSlice.reducer;
