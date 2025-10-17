import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [expires, setExpires] = useState('')
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    refreshToken(),
    getUsers()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token')
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setExpires(decoded.exp)
    } catch (error) {
      if (error.response) {
        navigate("/")
      }
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    if(expires * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token')
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setExpires(decoded.exp)
    }
    return config 
  }, (error) => {
    return Promise.reject(error)
  })

  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setUsers(response.data)
  }
  
  return (
    <div className="container mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      <p className="text-black-300 mt-2">Welcome Back, {name}!</p>
      <button onClick={ getUsers } className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Get Users
      </button>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-200 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard