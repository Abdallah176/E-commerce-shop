import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import imgUrl from "../assets/bann.png";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, errorMessage, clearErrorMessage, loading } = useAuthStore();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    clearErrorMessage();
    const result = await registerUser(name, email, password, navigate);
    if (result?.success) {
      navigate("/"); 
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-64 text-orange-600" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,64L40,69.3C80,75,160,85,240,101.3C320,117,400,139,480,144C560,149,640,139,720,128C800,117,880,107,960,117.3C1040,128,1120,160,1200,176C1280,192,1360,192,1400,192L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
      </svg>

      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={imgUrl} alt="register" className="w-full h-full object-cover" />
        </div>

        <form onSubmit={onSubmitHandler} className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-5 bg-white">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">Create Account</h2>

          {errorMessage && (
            <div className="text-red-600 mt-1 text-sm text-center">{errorMessage}</div>
          )}

          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            
          />

          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // autocomplete="current-password"
          />

          <div className="w-full flex justify-between text-sm text-gray-500">
            <p onClick={() => navigate("/login")} className="cursor-pointer hover:underline">
              Already have an account? Login Here
            </p>
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
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
