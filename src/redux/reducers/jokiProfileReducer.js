import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../utils/constant';
import JokiProfileService from '../services/jokiProfileServices';

export const getJokiInfo = createAsyncThunk(
    'joki/getJokiInfo',
    async (_, thunkAPI) => {
        try {
            return await JokiProfileService.getJokiInfo();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    status: STATUS_CODE.IDLE,
    data: null,
};

const jokiSlice = createSlice({
    name: 'joki-profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getJokiInfo.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.data = action.payload.data;
            }

            state.status = STATUS_CODE.IDLE;
        });
        builder.addCase(getJokiInfo.pending, (state) => {
            state.status = STATUS_CODE.LOADING;
        });
        builder.addCase(getJokiInfo.rejected, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
            }
            state.status = STATUS_CODE.ERROR;
        });
    },
});

export default jokiSlice.reducer;
