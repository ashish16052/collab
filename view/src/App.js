import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import axios from 'axios'
import './App.scss'
import { useDispatch } from 'react-redux'
import { login } from './reducers/user'

function App() {

  const [user, setUser] = useState(sessionStorage.getItem('user'));
  const dispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:5001/auth/loginStatus`, { withCredentials: true })
    setUser(data);
    sessionStorage.setItem('user', JSON.stringify(data));
    dispatch(login(data))
    console.log(data);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route  path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route  path='/dashboard/:id' element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;