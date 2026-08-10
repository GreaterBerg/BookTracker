import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signInUser } = UserAuth() as { session: any | null; signInUser: (email: string, password: string) => Promise<{success: boolean, data?: any, error?: string}> };
  const navigate = useNavigate()

  const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    
    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate("/profile")
      }
    } catch {
      console.error("There was an error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-2xl text-gray-700">Sign In</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
          <input
          onChange={(e) => { setEmail(e.target.value) }}
          type="email"
          placeholder="Email"
          className="bg-gray-200 border border-gray-300 p-2 rounded mt-4 w-70 active:bg-gray-300" 
          />
          <input
          onChange={(e) => { setPassword(e.target.value) }}
          type="password"
          placeholder="Password"
          className="bg-gray-200 border border-gray-300 p-2 rounded mt-4 w-70 active:bg-gray-300" 
          />
          <button type="submit" disabled={loading} className="bg-gray-800 text-white p-4 mt-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Sign In
          </button>
        </div>
        <p className="text-gray-600">Don't have an account? <Link to="/signUp" className="text-blue-500 hover:text-blue-700">Sign Up!</Link></p>
      {error && (<p className="text-red-300 text-center">{error}</p>)}
      </form>
    </div>
  )
}

export default SignIn