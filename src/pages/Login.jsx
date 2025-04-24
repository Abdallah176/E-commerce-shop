import useAuthStore from "../store/useAuthStore";
import { useState, useEffect } from "react";

export default function Login() {
    const [currentState, setCurrentState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser, registerUser, errorMessage, clearErrorMessage } = useAuthStore();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Clear previous error message when trying a new login or register
        clearErrorMessage();

        if (currentState === "Login") {
            await loginUser(email, password);
        } else {
            await registerUser(name, email, password);
        }
    };

    // If errorMessage changes, display it
    useEffect(() => {
        if (errorMessage) {
            // Automatically clear error after 5 seconds (optional)
            setTimeout(() => {
                clearErrorMessage();
            }, 5000);
        }
    }, [errorMessage, clearErrorMessage]);

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            {currentState === "Login" ? null : (
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            )}
            <input
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {/* Display error message if it exists */}
            {errorMessage && (
                <div className="text-red-600 mt-2 text-sm">{errorMessage}</div>
            )}

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forget your password?</p>
                {currentState === "Login" ? (
                    <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
                        Create account
                    </p>
                ) : (
                    <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
                        Login Here
                    </p>
                )}
            </div>
            <button className="bg-black text-white font-light px-8 py-2 mt-4">
                {currentState === "Login" ? "Sign In" : "Sign Up"}
            </button>
        </form>
    );
}
