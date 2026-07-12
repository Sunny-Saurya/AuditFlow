import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const setAuthToken = (token) => {
  const finalToken = token || (localStorage.getItem('auditflow_guest_mode') === 'true' ? 'guest-evaluator-token' : null);
  if (finalToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${finalToken}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthTokenSafe = async (getTokenFunc) => {
  try {
    if (getTokenFunc) {
      const token = await getTokenFunc();
      if (token) return token;
    }
  } catch (err) {
    
  }
  if (localStorage.getItem('auditflow_guest_mode') === 'true') {
    return 'guest-evaluator-token';
  }
  return null;
};

export default api;

