import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const Logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout')
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-white text-xl font-bold">
              YourLogo
            </Link>
            
            <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
          </div>

          <div>
            <button onClick={Logout} className="bg-indigo-600 text-white hover:bg-indigo-500 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              Log Out
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;