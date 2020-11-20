import Axios from 'axios';
import { setUserSession, removeUserSession } from './SessionStorage';

const baseUrl = 'http://hilmi.pw';

const login = async (email, password) => {
  const response = await Axios.post(`${baseUrl}/login`, { email, password });
  setUserSession(response.data.accessToken);
};

const logout = () => {
  removeUserSession();
};

export default { login, logout };
