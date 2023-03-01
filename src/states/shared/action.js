import api from '../../utils/api'
import { receiveLeaderBoardsActionCreator } from '../leaderboards/action'
import { receiveThreadsActionCreator } from '../thread/action'
import { receiveUsersActionCreator } from '../users/action'

function asyncPopulateUsersAndThreads () {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers()
      const threads = await api.getAllThread()

      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncPopulateLeaderboards () {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getAllLeaderboards()

      dispatch(receiveLeaderBoardsActionCreator(leaderboards))
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  asyncPopulateUsersAndThreads, asyncPopulateLeaderboards
}
