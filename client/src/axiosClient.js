import axios from "axios";

export const BASE_URL = "http://localhost:4000/api/v1";

export const signUpApi = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
