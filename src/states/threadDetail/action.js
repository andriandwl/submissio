import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_UPVOTE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_UPVOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_DOWNVOTE_THREAD_DETAIL:
    'TOGGLE_NEUTRAL_DOWNVOTE_THREAD_DETAIL',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRAL_UPVOTE_COMMENT: 'TOGGLE_NEUTRAL_UPVOTE_COMMENT',
  TOGGLE_NEUTRAL_DOWNVOTE_COMMENT: 'TOGGLE_NEUTRAL_DOWNVOTE_COMMENT'

}

function receiveThreadDetailActionCreator (threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  }
}

function clearThreadDetailActionCreator () {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL
  }
}

function addCommentActionCreator (comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  }
}

function toggleUpVoteThreadDetailActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleDownVoteThreadDetailActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleNeutralUpVoteThreadDetailActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_UPVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleNeutralDownVoteThreadDetailActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_DOWNVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId
    }
  }
}

function toggleUpVoteCommentActionCreator ({ id, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      id,
      commentId,
      userId
    }
  }
}

function toggleDownVoteCommentActionCreator ({ id, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      id,
      commentId,
      userId
    }
  }
}

function toggleNeutralUpVoteCommentDetailActionCreator ({ id, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_UPVOTE_COMMENT,
    payload: {
      id,
      commentId,
      userId
    }
  }
}

function toggleNeutralDownVoteCommentDetailActionCreator ({ id, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_DOWNVOTE_COMMENT,
    payload: {
      id,
      commentId,
      userId
    }
  }
}

// function toggleUpVoteCommentActionCreator ({ threadId, commentId, userId }) {
//   return {
//     type: ActionType.TOGGLE_UPVOTE_COMMENT,
//     payload: {
//       threadId,
//       commentId,
//       userId
//     }
//   }
// }

// function toggleDownVoteCommentActionCreator ({ threadId, commentId, userId }) {
//   return {
//     type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
//     payload: {
//       threadId,
//       commentId,
//       userId
//     }
//   }
// }

// function toggleNeutralUpVoteCommentDetailActionCreator ({ threadId, commentId, userId }) {
//   return {
//     type: ActionType.TOGGLE_NEUTRAL_UPVOTE_COMMENT,
//     payload: {
//       threadId,
//       commentId,
//       userId
//     }
//   }
// }

// function toggleNeutralDownVoteCommentDetailActionCreator ({ threadId, commentId, userId }) {
//   return {
//     type: ActionType.TOGGLE_NEUTRAL_DOWNVOTE_COMMENT,
//     payload: {
//       threadId,
//       commentId,
//       userId
//     }
//   }
// }

function asyncAddComment ({ content, commentTo }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const comment = await api.createComment({ content, commentTo })
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncReceiveThreadDetail (threadId) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const threadDetail = await api.getDetailThread(threadId)
      dispatch(receiveThreadDetailActionCreator(threadDetail))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleUpVoteThreadDetail (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    )
    try {
      await api.upVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      )
    }
  }
}

function asyncToggleDownVoteThreadDetail (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    )
    try {
      await api.downVoteThread(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id
        })
      )
    }
  }
}

function asyncToggleUpVoteComment ({ id, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleUpVoteCommentActionCreator({ id, commentId, userId: authUser.id })
    )
    try {
      await api.upVoteComment({ id, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleUpVoteCommentActionCreator({ id, commentId, userId: authUser.id })
      )
    }
  }
}

function asyncToggleDownVoteComment ({ id, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleDownVoteCommentActionCreator({ id, commentId, userId: authUser.id })
    )
    try {
      await api.downVoteComment({
        id,
        commentId
      })
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleDownVoteCommentActionCreator({ id, commentId, userId: authUser.id })
      )
    }
  }
}

function asyncToggleNeutralUpVoteThreadDetail (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleNeutralUpVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id
      })
    )

    try {
      await api.neutralizeThreadVote(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleNeutralUpVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id
        })
      )
    }
  }
}

function asyncToggleNeutralDownVoteThreadDetail (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleNeutralDownVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id
      })
    )

    try {
      await api.neutralizeThreadVote(threadId)
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleNeutralDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id
        })
      )
    }
  }
}

function asyncToggleNeutralUpVoteCommentDetail ({ id, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleNeutralUpVoteCommentDetailActionCreator({
        id,
        commentId,
        userId: authUser.id
      })
    )

    try {
      await api.neutralizeCommentVote({ id, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleNeutralUpVoteCommentDetailActionCreator({
          id,
          commentId,
          userId: authUser.id
        })
      )
    }
  }
}

function asyncToggleNeutralDownVoteCommentDetail ({ id, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      toggleNeutralDownVoteCommentDetailActionCreator({
        id,
        commentId,
        userId: authUser.id
      })
    )

    try {
      await api.neutralizeCommentVote({ id, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(
        toggleNeutralDownVoteCommentDetailActionCreator({
          id,
          commentId,
          userId: authUser.id
        })
      )
    }
  }
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralUpVoteThreadDetailActionCreator,
  toggleNeutralDownVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralUpVoteThreadDetail,
  asyncToggleNeutralDownVoteThreadDetail,
  addCommentActionCreator,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralDownVoteCommentDetail,
  asyncToggleNeutralUpVoteCommentDetail,
  toggleNeutralUpVoteCommentDetailActionCreator,
  toggleNeutralDownVoteCommentDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator
}
