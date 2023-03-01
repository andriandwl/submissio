import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncAddThread } from '../states/thread/action'

function AddThreadPage () {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onAddThread = () => {
    dispatch(asyncAddThread({ title, body, category }))
    navigate('/')
  }

  return (
    <div className="container mt-2">
      <div className="row g-0">
        <div className="col-lg-12 mt-4 mb-4">
          <h3 className="bungee text-center">Buat Thread Baru</h3>
        </div>
        <div className="col-lg-12">
          <div className="form-floating mb-2">
            <input type="text" className="form-control" value={title} onChange={({ target }) => setTitle(target.value)} id="floatingInput" placeholder="name@example.com" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={category} onChange={({ target }) => setCategory(target.value)} id="floatingPassword" placeholder="Password" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" value={body} onChange={({ target }) => setBody(target.value)} id="floatingTextarea2" style={{ height: '100px' }} />
          </div>
        </div>
        <button type="submit" onClick={onAddThread} className="mt-2 p-2" style={{ backgroundColor: 'transparent', borderRadius: '10px' }}>Submit</button>
      </div>
    </div>
  )
}

export default AddThreadPage
