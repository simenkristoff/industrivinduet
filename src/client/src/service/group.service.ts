import axios from 'axios';

// Types
import { Group } from '../types';

const API_URL = 'http://localhost:8080/api/groups';

class GroupService {
  create(payload: any) {
    return axios
      .post(API_URL, { ...payload })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  findAll() {
    return axios
      .get(API_URL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  find(id: string) {
    return axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  update({ _id, ...data }: Group) {
    return axios
      .put(`${API_URL}/${_id}`, { ...data })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  delete(id: string) {
    return axios
      .delete(`${API_URL}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new GroupService();
