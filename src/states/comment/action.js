import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRAL_UPVOTE_COMMENT: 'TOGGLE_NEUTRAL_UPVOTE_COMMENT',
  TOGGLE_NEUTRAL_DOWNVOTE_COMMENT: 'TOGGLE_NEUTRAL_DOWNVOTE_COMMENT'
}

function addCommentActionCreator (comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: comment
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

function asyncAddComment ({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const comment = await api.createComment({ id, content })
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncToggleUpVoteComment ({ id, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleUpVoteCommentActionCreator({ id, commentId, userId: authUser.id }))

    try {
      await api.upVoteComment({ id, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(toggleUpVoteCommentActionCreator({ id, commentId, userId: authUser.id }))
    }
  }
}

function asyncToggleDownVoteComment ({ id, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(toggleDownVoteCommentActionCreator({ id, commentId, userId: authUser }))

    try {
      await api.upVoteComment({ id, commentId })
    } catch (error) {
      alert(error.message)
      dispatch(toggleDownVoteCommentActionCreator({ id, commentId, userId: authUser }))
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
  ActionType, addCommentActionCreator, asyncAddComment, asyncToggleUpVoteComment,
  asyncToggleDownVoteComment, toggleDownVoteCommentActionCreator,
  toggleUpVoteCommentActionCreator, toggleNeutralDownVoteCommentDetailActionCreator,
  toggleNeutralUpVoteCommentDetailActionCreator, asyncToggleNeutralDownVoteCommentDetail,
  asyncToggleNeutralUpVoteCommentDetail
}
