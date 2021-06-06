import axios from 'axios';

const baseURL = process.env.REACT_APP_DEV_API_URL;

const setToken = (userToken) => {
  localStorage.setItem('token', JSON.stringify(userToken));
  isAuthenticated = true;
}
const delToken = () => { isAuthenticated = false; localStorage.removeItem('token');}

const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}
var isAuthenticated = getToken() != null;

export default (function() {
  let ax = axios.create({baseURL: baseURL});
  ax.defaults.headers.common['Authorization'] = getToken();
  return ax;
})();

export { setToken, delToken, getToken, isAuthenticated };
