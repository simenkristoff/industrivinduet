import axios from 'axios';

// Types
import { Options } from '../types';

const API_URL = 'http://localhost:8080/api/options';

class OptionService {
  get() {
    return axios
      .get(API_URL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  update(data: Options) {
    return axios
      .put(`${API_URL}`, {
        ...data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  reset(data: Options) {
    return axios
      .put(`${API_URL}/reset`, {
        ...data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  resetAll() {
    return axios
      .put(`${API_URL}/reset-all`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new OptionService();
