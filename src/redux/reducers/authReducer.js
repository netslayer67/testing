import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../services/authServices';
import { STATUS_CODE } from '../../utils/constant';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

export const register = createAsyncThunk(
    'save/register',
    async (data, thunkAPI) => {
        try {
            const response = await AuthServices.registerService(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        const response = await AuthServices.loginService(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    AuthServices.logOutService();
});

const initialState = {
    status: STATUS_CODE.IDLE,
    data: [],
    isLoggedIn: false,
    user: token ? jwtDecode(token) : null,
};

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        resetAuth(state) {
            state.data = [];
        },
        getUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUS_CODE.IDLE;
            })
            .addCase(register.pending, (state) => {
                state.status = STATUS_CODE.LOADING;
            })
            .addCase(register.rejected, (state, action) => {
                state.data = action.payload.response.data.error_field;
                state.status = STATUS_CODE.ERROR;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUS_CODE.IDLE;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.data = action.payload.response.data.error_field;
                state.status = STATUS_CODE.ERROR;
                state.isLoggedIn = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoggedIn = false;
                state.status = STATUS_CODE.LOADING;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
            });
    },
});

export const { resetAuth, getUser } = AuthSlice.actions;
export default AuthSlice.reducer;
