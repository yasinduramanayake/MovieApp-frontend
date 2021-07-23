import { api } from "@/Api/index";
import { setToken } from "../index";

export default {
  async login(payload) {
    return await api.post("/login", payload).then(res => {
      const token = res.data.token;
      setToken(token);
      sessionStorage.setItem("token", token);
    });
  },
  async profile() {
    return await api.get("/profile");
  },
  async logout() {
    return await api.get("/logout");
  }
};
