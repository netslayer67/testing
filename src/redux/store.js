import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import nasabahAdminReducer from './reducers/nasabahAdminReducer';
import adminReducer from './reducers/adminReducer';
import jokiReducer from './reducers/jokiReducer';
import jokiProfileReducer from './reducers/jokiProfileReducer';
import superAdminProfileReducer from './reducers/superAdminProfileReducer';
import superAdminReducer from './reducers/superAdminReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nasabahAdmin: nasabahAdminReducer,
        admin: adminReducer,
        joki: jokiReducer,
        jokiProfile: jokiProfileReducer,
        superAdminProfile: superAdminProfileReducer,
        superAdmin: superAdminReducer,
    },
    devTools: true,
});
