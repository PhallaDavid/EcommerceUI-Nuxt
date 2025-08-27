
import { reactive } from "vue";

export const userStore = reactive({
  user: null,

  init() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  },

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },

  clearUser() {
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});
