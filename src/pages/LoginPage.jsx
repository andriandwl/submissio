import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoginInput from '../components/LoginInput'
import { asyncSetAuthUser } from '../states/authUser/action'

function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
    navigate('/')
  }

  return (
    <div className="container mt-5">
      <div className="row g-0">
        <div className="col-lg-12">
          <LoginInput login={onLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
