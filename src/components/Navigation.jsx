import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navigation ({ authUser, logout }) {
  return (
    <div className="container">
      <div className="row g-0 mt-2 mb-2 text-center p-4" style={{ borderRadius: '30px 30px 0px 0px', backgroundColor: '#7FE9DE' }}>
        <div className="col-lg-12">
          <h1 className="bodoni" style={{ color: '#3D5656', fontSize: '48px' }}>Discuss</h1>
        </div>
      </div>
      <div className="row g-0">
        <div className="col-lg-12 col-md-8 col-md-8 col-sm-12">
          <nav
            className="navbar navbar-expand-lg"
            style={{ borderRadius: '0px 0px 30px 30px' }}
          >
            <div className="container-fluid justify-content-end">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse d-flex justify-content-center p-2"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item ">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                      style={{ fontFamily: 'Manrope', color: '#7FE9DE' }}
                    >
                      Thread
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/leaderboard"
                      style={{ fontFamily: 'Manrope', color: '#7FE9DE' }}
                    >
                      Leaderboards
                    </Link>
                  </li>
                  {
                    authUser
                      ? (
                        <li className="nav-item dropdown">
                        <button
                          className="bg-transparent border-0 nav-link"
                          type="button"
                          onClick={logout}
                          style={{ fontFamily: 'Manrope', color: '#7FE9DE' }}
                        >
                        Logout
                        </button>
                      </li>
                        )
                      : (
                        <li className="nav-item dropdown">
                        <Link
                          className="nav-link"
                          to="/login"
                          role="button"
                          aria-expanded="false"
                          style={{ fontFamily: 'Manrope', color: '#7FE9DE' }}
                        >
                          Login
                        </Link>
                    </li>
                        )
                  }
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

Navigation.propTypes = {
  authUser: PropTypes.shape(userShape),
  logout: PropTypes.func.isRequired
}

export default Navigation
