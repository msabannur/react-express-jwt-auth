import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('') 
  const navigate = useNavigate()

  const Auth = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      })
      alert('Login Successful') 
      navigate("/dashboard")
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          {msg && <p className="mt-2 text-sm text-red-500">{msg}</p>}
        </div>

        <form className="mt-8 space-y-6" onSubmit={ Auth }>
          <div>
            <label htmlFor="email-address" className="block mb-2 text-sm font-medium text-left text-gray-300">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 text-white placeholder-gray-500 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="youremail@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-2 text-white placeholder-gray-500 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-500 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/register" className="font-medium text-indigo-500 hover:text-indigo-400">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm