import axios from "axios";
import http from "../http/HttpCommonUser";
import UserType from "../type/UserType";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
  login(username: string, password: string) {
    return axios.post(API_URL + "signin", {
        username,
        password
      }).then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getUsers() {
    return http.get<Array<UserType>>("/users");
  }

  getUsersById(id: any) {
    return http.get<UserType>(`/users/${id}`);
  }

  updateUser( data: UserType, id?: any ) {
    return http.put<any>(`/users/${id}`, data);
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();
