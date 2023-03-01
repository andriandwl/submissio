import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RegisterInput from '../components/RegisterInput'
import { asyncRegisterUser } from '../states/users/action'

function RegisterPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }))
    navigate('/')
  }

  return (
    <div className="container mt-5">
      <div className="row g-0">
        <div className="col-lg-12">
          <RegisterInput register={onRegister} />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
