import base from '../../util/base';
import http from '../../util/http';

const request = {
    login(params) {
        let url = base.api + 'login';
        return http.post(url, { params: params });
    },
};

export default request;
