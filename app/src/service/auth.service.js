import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {

    login(email, password) {
        return axios.post(`${API_URL}/login`, {
            email,
            password
        })
        .then((response) => {
            if(response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((err) => {
            return err;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        });
    }

}

export default new AuthService();
