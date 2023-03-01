import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

function RegisterInput ({ register }) {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  return (
    <>
    <div className="row g-0 mt-2 mb-2 text-center p-4" style={{ borderRadius: '30px 30px 0px 0px', backgroundColor: '#7FE9DE' }}>
      <div className="col-lg-12">
        <h1 className="bodoni" style={{ color: '#3D5656', fontSize: '48px' }}>Discuss</h1>
      </div>
    </div>
    <form className="p-4 p-md-5 border rounded-3 bg-light">
      <div className="form-floating mb-3">
        <input type="text" value={name} onChange={onNameChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input type="email" value={email} onChange={onEmailChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" value={password} onChange={onPasswordChange} className="form-control" id="floatingPassword" placeholder="Password" />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button className="w-100 btn btn-lg" type="button" onClick={() => register({ name, email, password })} style={{ backgroundColor: '#3D5656', color: 'white' }}>Sign up</button>
      <hr className="my-4"/>
      <small className="text-muted">Have an Account ? <Link to="/login">Register</Link></small>
    </form>
    </>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
}

export default RegisterInput
