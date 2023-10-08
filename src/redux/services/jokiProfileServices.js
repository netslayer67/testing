import { API } from '../../config/API';

const getJokiInfo = async () => {
    const response = await API.get('/joki/get-joki-info');
    return response.data;
};

const JokiProfileService = {
    getJokiInfo,
};

export default JokiProfileService;
