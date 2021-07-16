import { api, setToken, clearToken } from "@/Api/index";

export default {
  async login(payload) {
    // eslint-disable-next-line no-return-await
    return await api.post("/login", payload).then(res => {
      const token = res.data;
      setToken(token);
      sessionStorage.setItem("token", token);
    });
  },
  async profile() {
    // eslint-disable-next-line no-return-await
    return await api.get("/profile");
  },
  async logout() {
    // eslint-disable-next-line no-return-await
    sessionStorage.clear();
    clearToken();
  }
};
