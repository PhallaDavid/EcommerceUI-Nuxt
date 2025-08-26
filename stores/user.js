// stores/user.js
import { reactive } from "vue";

export const userStore = reactive({
  user: null,

  init() {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch {
        this.user = null;
      }
    }
  },

  setUser(newUser) {
    this.user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  },

  clearUser() {
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});
