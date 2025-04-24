import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const domain = "http://localhost:1337";

// Create a separate store for user authentication
const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            errorMessage: "",  // Add error message state

            setUser: (user, jwt) => {
                set({ user, isLoggedIn: true, errorMessage: "" });  // Reset error message on successful login
                localStorage.setItem('jwt', jwt);  // Save JWT to localStorage for persistent sessions
            },

            loginUser: async (identifier, password) => {
                try {
                    const res = await axios.post(`${domain}/api/auth/local`, {
                        identifier,
                        password,
                    });

                    // Check if the response contains user data
                    const { user, jwt } = res.data;
                    if (user) {
                        set({ user, isLoggedIn: true, errorMessage: "" });
                        localStorage.setItem('jwt', jwt);  // Save JWT for persistent sessions
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    console.error("Login failed", error);
                    set({ errorMessage: "Invalid email or password" });  // Set error message for invalid login
                }
            },

            registerUser: async (username, email, password) => {
                try {
                    const res = await axios.post(`${domain}/api/auth/local/register`, {
                        username,
                        email,
                        password,
                    });

                    const { user, jwt } = res.data;
                    if (user) {
                        set({ user, isLoggedIn: true, errorMessage: "" });
                        localStorage.setItem('jwt', jwt);  // Save JWT for persistent sessions
                    } else {
                        throw new Error("Registration failed");
                    }
                } catch (error) {
                    console.error("Registration failed", error);
                    set({ errorMessage: "Failed to register. Please try again." });  // Show error on registration failure
                }
            },

            logoutUser: () => {
                set({ user: null, isLoggedIn: false, errorMessage: "" });
                localStorage.removeItem('jwt'); // Remove JWT when logged out
            },

            getToken: () => {
                return localStorage.getItem('jwt');
            },

            clearErrorMessage: () => {
                set({ errorMessage: "" });  // Function to clear error messages
            },

        }),
        {
            name: 'auth-store',  // Persist the store with a name
        }
    )
);

export default useAuthStore;
