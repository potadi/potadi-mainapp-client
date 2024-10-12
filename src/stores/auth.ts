import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
  }

  async function login(credentials: User) {
    try {
      const { data } = await ApiService.post("auth/login/", credentials);
      setAuth(data.user);
      return true;
    } catch (error: any) {
      setError(error.response?.data || "Login failed");
      return false;
    }
  }

  async function logout() {
    try {
      await ApiService.post("auth/logout/", {});
      purgeAuth();
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  }

  async function register(credentials: User) {
    try {
      await ApiService.post("auth/registration/", credentials);
      await login(credentials);
    } catch (error: any) {
      setError(error?.response?.data || "Login failed");
    }
  }

  async function forgotPassword(email: string) {
    try {
      await ApiService.post("auth/password/reset/", email);
    } catch (error: any) {
      setError(error.response?.data || "Password reset failed");
    }
  }

  async function forgotPasswordConfirm(values: any) {
    try {
      const response = await ApiService.post(
        "auth/password/reset/confirm/",
        values
      );
      return response;
    } catch (error: any) {
      setError(error.response?.data || "Password reset failed");
      console.log(error);
    }
  }

  async function verifyAuth() {
    if (!isAuthenticated.value) {
      try {
        const { data } = await ApiService.get("auth/user");
        setAuth(data);
        return true;
      } catch (error: any) {
        purgeAuth();
        return false;
      }
    }
    return true;
  }

  async function refreshToken() {
    try {
      await ApiService.post("auth/token/refresh/", {});
      const { data } = await ApiService.get("auth/user");
      setAuth(data);
      return true;
    } catch (error) {
      console.error("Refresh token failed:", error);
      purgeAuth();
      return false;
    }
  }

  // CRUD operations for user profile
  async function getUserProfile() {
    try {
      const response = await ApiService.get("auth/user/");
      return response.data;
    } catch (error: any) {
      setError(error.response?.data || "Failed to fetch user profile");
    }
  }

  async function updateUserProfile(data: any) {
    try {
      const response = await ApiService.patch("auth/user/", data);
      setAuth(response.data);
      return true;
    } catch (error: any) {
      setError(error.response?.data || "Update failed");
      return false;
    }
  }

  async function updateUserAvatar(file: File) {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      ApiService.setMultipartHeader();
      const response = await ApiService.patch("auth/user/", formData);
      setAuth(response.data);
      return true;
    } catch (error: any) {
      setError(error.response?.data || "Update failed");
      return false;
    }
  }

  async function updateUserPassword(data: any) {
    try {
      const response = await ApiService.post("auth/password/change/", data);
      return response;
    } catch (error: any) {
      setError(error.response?.data || "Failed to update password");
      return false;
    }
  }

  // Google OAuth
  async function loginWithGoogle(code: string) {
    try {
      const { data } = await ApiService.post("auth/oauth/google/", {
        code: code,
      });
      setAuth(data.user);
      return true;
    } catch (error: any) {
      setError(error.response?.data || "Login failed");
      return false;
    }
  }

  async function checkGoogleConnection() {
    try {
      const { data } = await ApiService.get("auth/oauth/status");
      return data;
    } catch (error: any) {
      setError(error.response?.data || "Checking failed");
      return false;
    }
  }

  async function connectGoogle(code: string) {
    try {
      const { data } = await ApiService.post("auth/oauth/google/connect/", {
        code: code,
      });
      return data;
    } catch (error: any) {
      setError(error.response?.data || "Failed to connect");
      return false;
    }
  }

  async function disconnectGoogle(pk: number) {
    try {
      const { data } = await ApiService.post(
        `auth/oauth/google/disconnect/${pk}/`,
        {}
      );
      return data;
    } catch (error: any) {
      setError(error.response?.data || "Failed to disconnect");
      return false;
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    setAuth,
    login,
    loginWithGoogle,
    checkGoogleConnection,
    connectGoogle,
    disconnectGoogle,
    logout,
    register,
    forgotPassword,
    forgotPasswordConfirm,
    verifyAuth,
    refreshToken,
    getUserProfile,
    updateUserProfile,
    updateUserAvatar,
    updateUserPassword,
  };
});
