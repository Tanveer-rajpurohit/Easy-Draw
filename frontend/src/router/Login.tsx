import { FilePenLine } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log(token);
    

    if (token) {
      
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } else {
      console.error("No token provided");
    }
  }, [navigate]);
  return (
    <div className="w-full bg-[#060606] text-[#E3E3E3] min-h-screen font-Quicksand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="w-full flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <FilePenLine className="w-6 h-6 text-[#E3E3E3]" />
            <h2 className="text-xl font-semibold">Easy-Draw</h2>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-lg">
            <h2 className="text-white text-3xl font-bold mb-4 text-center">
              Enter into Easy Draw
            </h2>
            <p className="text-[#BEC0C3] text-sm mb-8 text-center">
              By signing in or signing up, you agree to our{" "}
              <a href="#" className="text-[#68aaf2] hover:underline">
                terms of service
              </a>
            </p>
            <Link to={"http://localhost:8000/auth/google"}>
              <button className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-md shadow-md hover:bg-gray-100 transition duration-300 flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </Link>

            <p className="mt-6 text-center text-sm text-gray-400">
              Click the above button to enter into{" "}
              <span className="text-[#68aaf2] hover:underline">Esay Draw</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
