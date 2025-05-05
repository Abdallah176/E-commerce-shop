import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'react-toastify';
import useShopStore from './useShopStore';

const domain = "http://localhost:1337";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      jwt: null,
      errorMessage: "",
      loading: false,
      isLoggedIn: false,

      setUser: (user, jwt) => {
        set({ user, jwt, isLoggedIn: true, errorMessage: "" });
        localStorage.setItem('jwt', jwt);
      },

      loginUser: async (identifier, password, navigate) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${domain}/api/auth/local`, {
            identifier,
            password,
          });

          const { user, jwt } = res.data;
          if (user && jwt) {
            set({ user, jwt, isLoggedIn: true, errorMessage: "", loading: false });
            localStorage.setItem('jwt', jwt);

            useShopStore.getState().clearShopState();
            toast.success("Welcome back! Logged in successfully");

            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Login failed", error);
          set({ errorMessage: "Invalid email or password", loading: false });
          toast.error("Login failed. Check your credentials!");
        }
      },

      registerUser: async (username, email, password, navigate) => {
        set({ loading: true });
        try {
          const res = await axios.post(`${domain}/api/auth/local/register`, {
            username,
            email,
            password,
          });

          const { user, jwt } = res.data;
          if (user && jwt) {
            set({ user, jwt, isLoggedIn: true, errorMessage: "", loading: false });
            localStorage.setItem('jwt', jwt);
            toast.success("Account created successfully");

            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            throw new Error("Registration failed");
          }
        } catch (error) {
          console.error("Registration failed", error);

          let msg = "Failed to register. Please try again.";
          if (error.response?.data?.error?.message?.includes("Email is already taken")) {
            msg = "Email already exists. Please use another email.";
          }

          set({ errorMessage: msg, loading: false });
          toast.error(msg);
          return { success: false };
        }
      },

      logoutUser: (navigate) => {
        set({ user: null, jwt: null, isLoggedIn: false, errorMessage: "", loading: false });
        useShopStore.getState().clearShopState();
        localStorage.removeItem('jwt');
        localStorage.removeItem('auth-store');
        toast.success("Logged out successfully");
        navigate('/');
      },

      getToken: () => {
        return get().jwt || localStorage.getItem('jwt');
      },

      clearErrorMessage: () => {
        set({ errorMessage: "" });
      },

      resetAuth: () => {
        set({ user: null, jwt: null, isLoggedIn: false, errorMessage: "", loading: false });
        localStorage.removeItem("auth-store");
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;