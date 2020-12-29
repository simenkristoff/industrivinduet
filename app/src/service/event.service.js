import axios from 'axios';

const API_URL = 'http://localhost:8080/api/events';

class EventService {

    create(data) {
        return axios.post(API_URL, {...data
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
    }

    findAll() {
        return axios.get(API_URL)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        }); 
    }

    find(id) {
        return axios.get(`${API_URL}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        }); 
    }

    update(data) {
        const {_id} = data;

        return axios.put(`${API_URL}/${_id}`, {
            ...data
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
    }

    delete(id) {
        return axios.delete(`${API_URL}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        }); 
    }

}

export default new EventService();
