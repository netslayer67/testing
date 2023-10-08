import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../utils/constant';
import jokiService from '../services/jokiService';

export const jokiMonitoringWork = createAsyncThunk(
    'get/jokiMonitoringWork',
    async ({ limit, page, searchValue }, thunkAPI) => {
        try {
            const response = await jokiService.jokiMonitoringWork({
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

export const getDetailJokiFap = createAsyncThunk(
    'get/detailFap',
    async (id, thunkAPI) => {
        try {
            const response = await jokiService.getDetailJokiFap(id);
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

const jokiSlice = createSlice({
    name: 'joki',
    initialState,
    reducers: {
        resetJoki: (state) => {
            (state.data = null), (state.status = STATUS_CODE.IDLE);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(jokiMonitoringWork.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(jokiMonitoringWork.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(jokiMonitoringWork.rejected, (state) => {
            state.status = STATUS_CODE.ERROR;
        });
        // Get Detail
        builder.addCase(getDetailJokiFap.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.dataDetail = action.payload;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getDetailJokiFap.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getDetailJokiFap.rejected, (state) => {
            state.status = STATUS_CODE.ERROR;
        });
    },
});

export const { resetJoki } = jokiSlice.actions;
export default jokiSlice.reducer;
