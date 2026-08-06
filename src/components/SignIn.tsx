import { useState } from "react"
import { Link } from "react-router-dom"

const SignIn = () => {

    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-2xl text-gray-700">Sign In</p>
        <form>
          <div className="flex flex-col my-2">
            <input type="email" placeholder="Email" className="bg-gray-200 border border-gray-300 p-2 rounded mt-4 w-70 active:bg-gray-300" />
            <input type="password" placeholder="Password" className="bg-gray-200 border border-gray-300 p-2 rounded mt-4 w-70 active:bg-gray-300" />
            <button type="submit" disabled={loading} className="bg-gray-800 text-white p-4 mt-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              Sign In
            </button>
          </div>
          <p className="text-gray-600">Don't have an account? <Link to="/signUp" className="text-blue-500 hover:text-blue-700">Sign Up!</Link></p>
        </form>
      </div>
    )
}

export default SignIn