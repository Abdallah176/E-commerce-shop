import useAuthStore from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import imgUrl from "../assets/banner.png"
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    loginUser,
    registerUser,
    errorMessage,
    clearErrorMessage,
    loading,
  } = useAuthStore();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    clearErrorMessage();

    if (currentState === "Login") {
      await loginUser(email, password, navigate);
    }  else {
        const result = await registerUser(name, email, password, navigate);
        if (result?.success) {
            setShowSuccessAnim(true);
            setTimeout(() => setShowSuccessAnim(false), 2000);
        }
    }
};

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        clearErrorMessage();
      }, 5000);
    }
  }, [errorMessage, clearErrorMessage]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Wave Background */}
      <svg
        className="absolute top-0 left-0 w-full h-64 text-orange-600"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64L40,69.3C80,75,160,85,240,101.3C320,117,400,139,480,144C560,149,640,139,720,128C800,117,880,107,960,117.3C1040,128,1120,160,1200,176C1280,192,1360,192,1400,192L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={imgUrl}
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-5 bg-white"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            {currentState}
          </h2>

          {showSuccessAnim && (
            <div className="flex justify-center items-center gap-2 text-green-600 text-sm animate-fade-in">
              <svg
                className="w-5 h-5 text-green-600 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Account created! Redirecting...
            </div>
          )}

          {currentState === "Login" ? null : (
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        <div className=" relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
            {showPassword ? <EyeOff size={20} /> :  <Eye size={20}/>}
          </button>
        </div>

          {errorMessage && (
            <div className="text-red-600 mt-1 text-sm text-center">{errorMessage}</div>
          )}

          <div className="w-full flex justify-between text-sm text-gray-500">
            <p className="cursor-pointer hover:underline">Forget your password?</p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:underline"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer hover:underline"
              >
                Login Here
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Processing...
              </>
            ) : currentState === "Login" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
