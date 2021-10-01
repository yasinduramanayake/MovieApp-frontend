import { api } from "@/Api/index";
import { setToken, clearToken } from "../index";
import notification from "@/ApiConstance/toast";

export default {
  async register(payload) {
    return await api.post("/register", payload).then((res) => {
      notification.toast("Successfully Registered", "success");
      window.location.href = "/";
    });
  },
  async login(payload) {
    return await api.post("/login", payload).then((res) => {
      const token = res.data.token;
      const name = res.data.data.name;
      const role = res.data.data.role;
      const email = res.data.data.email;
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      notification.toast("Successfully logged in", "success");
      if (localStorage.role === "Admin") {
        window.location.href = "/dashboard";
      }
      if (localStorage.role === "User") {
        window.location.href = "/";
      }
    });
  },
  async profile() {
    return await api.get("/profile");
  },
  async logout() {
    clearToken();
    return await api.get("/logout");
  },

  async reset(payload) {
<<<<<<< HEAD
    return await api.post("/forgotpassword", payload).then((res) => {
      notification.toast("Successfully sent email", "success");
      window.location.href = "/prompt";
    });
  },

  async resetconfirm(payload) {
    return await api.post("/resetpassword", payload).then((res) => {
      notification.toast("Password resetted successfully", "success");
      window.location.href = "/";
    });
=======
    return await api.post('/forgotpassword', payload).then((res) => {
      notification.toast('Successfully sent email', 'success');
    })
  },

  async resetconfirm(payload) {
    return await api.post('/resetpassword', payload).then((res) => {
      notification.toast('Password resetted successfully', 'success');
      window.location.href = '/'
    })
>>>>>>> pubudi
  },
};
