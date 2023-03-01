import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LeaderboardPage from './pages/LeaderBoardPage'
import AddThreadPage from './pages/AddThreadPage'
import Loading from './components/Loading'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'

function App () {
  const { authUser = null, isPreload = false } = useSelector((states) => states)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser())
  }

  if (isPreload) {
    return null
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    )
  }

  return (
    <>
      {/* <Loading /> */}
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} logout={onLogout}/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/addthread" element={<AddThreadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
