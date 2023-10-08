import { API } from '../../config/API';

const registerService = (data) => {
    return API.post('/user/create-user', data);
};

const loginService = async (data) => {
    const response = await API.post('/auth/login', data);
    if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
};

const logOutService = () => {
    localStorage.removeItem('token');
};

const AuthServices = {
    registerService,
    loginService,
    logOutService,
};

export default AuthServices;
