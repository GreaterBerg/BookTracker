import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const SignUp = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUpNewUser } = UserAuth() as { session: any | null; signUpNewUser: (email: string, password: string) => Promise<{success: boolean, data?: any, error?: string}> };
  const navigate = useNavigate()

  const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: username,
      email: email,
    }

    const { data, error } = await supabase.from("Profile Settings").insert([userData]).single();

    if (error) {
      console.error('Error inserting profile:', error);
      setError("There was an error creating your profile. Please try again.");
      setLoading(false);
      return;
    } else {
      console.log('Profile inserted:', data);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setError("Username must be 3-20 characters long and can only contain letters, numbers, and underscores.");
      setLoading(false);
      return;
    }

    try {

      const result = await signUpNewUser(email, password);

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
      <p className="text-2xl text-gray-700">Sign Up</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
          <input
          onChange={(e) => { setUsername(e.target.value) }}
          type="text"
          placeholder="Username"
          className="bg-gray-200 border border-gray-300 p-2 rounded mt-4 w-70 active:bg-gray-300"
          />
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
          <button type="submit" className="bg-gray-800 text-white p-4 mt-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Sign Up
          </button>
        </div>
        {error && (<p className="text-red-500 text-center">{error}</p>)}
        <p className="text-gray-600">Already have an account? <Link to="/signIn" className="text-blue-500 hover:text-blue-700">Sign In!</Link></p>
      </form>
    </div>
  )
}

export default SignUp