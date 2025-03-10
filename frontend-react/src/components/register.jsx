import React, { useState } from 'react'
// npm install axios
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleRegistration = async (e) => {
    // Pour éviter le rechargement de la page
    e.preventDefault()

    setLoading(true)
    const userData = {
      // On crée le dictionnaire des valeurs saisies pour l'envoyer à DRF
      username,
      email,
      password
    }
    console.log(userData)
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
      console.log('response.data==> ', response.data)
      console.log('response.status==> ', response.status);
      setErrors({})
      setSuccess(true)
    }
    catch(error){
      setErrors(error.response.data)
      console.log('Registration error ==>', error.response.data)
    }
    finally{
      setLoading(false)
    }
  }
  
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 bg-light-dark p-5 rounded'>
            <h3 className='text-light text-center mb-4'>Create an Account</h3>
            <form onSubmit={handleRegistration}>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Enter username' value={username} onChange={(e) => {setUsername(e.target.value); setErrors({})}} />
                <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
              </div>
              <div className='mb-3'>
                <input type="emal" className='form-control' placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value); setErrors({}) } } />
                <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
              </div>
              <div className='mb-3'>
                <input type="password" className='form-control' placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value), setErrors({}) }}/>
                <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
              </div>
              {success && <div className='alert alert-success text-center'>Registration successful</div>}
              {loading ? (
                <button type='submit' className='btn btn-info d-block mx-auto disabled'><FontAwesomeIcon icon={faSpinner} spin /> Please wait...</button>
              ) :
                (<button type='submit' className='btn btn-info d-block mx-auto'>Register</button>)
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register