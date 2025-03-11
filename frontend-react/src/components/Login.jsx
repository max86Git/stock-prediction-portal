import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../AuthProvider'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {username, password}
    //console.log(userData);

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsLoggedIn(true);
      navigate('/dashboard');
      // console.log(response.data)
      
    }
    catch(error){
      //console.log(error.response.data);
      setError('Invalid username or password');
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6 bg-light-dark p-5 rounded'>
                <h3 className='text-light text-center mb-4'>Login to your Account</h3>
                <form onSubmit={handleLogin}>
                  <div className='mb-3'>
                    <input type="text" className='form-control' placeholder='Enter username' value={username} onChange={(e) => {setUsername(e.target.value); setError('')}} />
                  </div>
                  <div className='mb-3'>
                    <input type="password" className='form-control mb-1' placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value), setError('') }}/>
                    {error && <div className='text-danger text-center'>{error}</div>}
                  </div>
                  
                  {loading ? (
                    <button type='submit' className='btn btn-info d-block mx-auto disabled'><FontAwesomeIcon icon={faSpinner} spin /> Logging in...</button>
                  ) :
                    (<button type='submit' className='btn btn-info d-block mx-auto'>Login</button>)
                  }
                </form>
              </div>
            </div>
          </div>
        </>
  )
}

export default Login