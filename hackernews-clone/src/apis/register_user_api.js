import axios from 'axios';

const API_ORIGIN = 'http://localhost:3090';

const registerUserApi = ({ email, password }) => (
  axios.post(`${API_ORIGIN}/signup`, { email, password }, {
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.data.token).catch(error => error.message)
);

export default registerUserApi;
