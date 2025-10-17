import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom' // <-- DIUBAH: Gunakan useNavigate dan Link

function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('') 
  const navigate = useNavigate() // <-- DIUBAH: Deklarasi useNavigate

  const Register = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
      alert('Registration Successful')
      navigate("/") // <-- DIUBAH: Arahkan ke halaman login
    } catch (error) {
      if (error.response) {
        // Menampilkan pesan error dari backend ke state 'msg'
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Create your account
          </h2>
          {msg && <p className="mt-2 text-sm text-red-500">{msg}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={ Register }>
          <div>
            <label htmlFor="full-name" className="block mb-2 text-sm font-medium text-left text-gray-300">
              Name
            </label>
            <input
              id="full-name"
              name="fullname"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // <-- DIUBAH: onchange -> onChange
              required
              className="relative block w-full px-3 py-2 text-white placeholder-gray-500 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email-address" className="block mb-2 text-sm font-medium text-left text-gray-300">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // <-- DIUBAH: onchange -> onChange
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // <-- DIUBAH: onchange -> onChange
              required
              className="relative block w-full px-3 py-2 text-white placeholder-gray-500 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-left text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // <-- DIUBAH: onchange -> onChange
              required
              className="relative block w-full px-3 py-2 text-white placeholder-gray-500 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/" className="font-medium text-indigo-500 hover:text-indigo-400"> {/* <-- DIUBAH: a href -> Link to */}
                Already have an account? Sign in
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm