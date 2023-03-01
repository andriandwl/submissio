import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncPopulateLeaderboards } from '../states/shared/action'

function LeaderBoardPage () {
  const { leaderboards = [] } = useSelector((states) => states)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  }, [])

  return (
    <div className="container my-4">
      <div className="row g-0">
        <div className="col-lg-6">
          <h4>Users</h4>
        </div>
        <div className="col-lg-6 text-end">
          <h4>Score</h4>
        </div>
          {
            leaderboards.map((leaderboard) => {
              return (
                <div key={leaderboard.user.id} className="col-lg-12 d-flex gap-2 my-3 align-items-center justify-content-between">
                  <div className="col-lg-6 d-flex align-items-center gap-2">
                    <img src={leaderboard.user.avatar} className="rounded-circle"/>
                    <p>{leaderboard.user.name}</p>
                  </div>
                  <div className="col-lg-6 text-end">
                    <p className="me-4" style={{ fontSize: '1.5em' }}>{leaderboard.score}</p>
                  </div>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}

export default LeaderBoardPage
