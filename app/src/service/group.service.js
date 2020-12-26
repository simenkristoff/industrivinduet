import axios from 'axios';

const API_URL = 'http://localhost:8080/api/group';

class GroupService {

    create({name}) {
        return axios.post(API_URL, {
            name
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

    update({_id, name}) {
        return axios.put(`${API_URL}/${_id}`, {
            name
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

export default new GroupService();
