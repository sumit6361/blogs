const LOGGEDIN_USER = "LOGGEDIN_USER";

export const saveAuthToken = (token) => {
  window.localStorage.setItem(LOGGEDIN_USER, token);
};

export const getAuthToken = () => {
  return window.localStorage.getItem(LOGGEDIN_USER);
};

export const removeAuthToken = () => {
  window.localStorage.removeItem(LOGGEDIN_USER);
};
