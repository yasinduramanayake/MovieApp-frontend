import { api } from "@/Api/index";
import { setToken, clearToken } from "../index";
import notification from "@/ApiConstance/toast";
//test
export default {
  async login(payload) {
    return await api.post("/login", payload).then(res => {
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      notification.toast("Successfully logged in", "success");
    });
  },
  async profile() {
    return await api.get("/profile");
  },
  async logout() {
    clearToken();
    return await api.get("/logout");
  }
};
