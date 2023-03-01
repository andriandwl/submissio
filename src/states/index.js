import { loadingBarReducer } from 'react-redux-loading-bar'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import threadsReducer from './thread/reducer'
import usersReducer from './users/reducer'
import threadDetailReducer from './threadDetail/reducer'
import commentsReducer from './comment/reducer'
import leaderboardReducer from './leaderboards/reducer'

const { configureStore } = require('@reduxjs/toolkit')

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    comments: commentsReducer,
    loadingBar: loadingBarReducer,
    leaderboards: leaderboardReducer
  }
})

export default store
