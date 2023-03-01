const ActionType = {
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD'
}

function receiveLeaderBoardsActionCreator (leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboards
    }
  }
}

export {
  ActionType,
  receiveLeaderBoardsActionCreator
}
