import axios from 'axios';

// Types
import { Member } from '../types';

const API_URL = 'http://localhost:8080/api/members';

class MemberService {
  create(data: Member) {
    return axios
      .post(API_URL, { ...data })
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

  update({ _id, ...data }: Member) {
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

export default new MemberService();
