/* eslint-disable operator-linebreak */
import { ActionType } from './action'

function threadDetailReducer (threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail
    case ActionType.CLEAR_THREAD_DETAIL:
      return null
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...threadDetail]
    case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy.concat([action.payload.userId])
      }
    case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.downVotesBy.concat([action.payload.userId])
      }
    case ActionType.TOGGLE_NEUTRAL_UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy:
          threadDetail.upVotesBy.includes(action.payload.userId) &&
          threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
      }
    case ActionType.TOGGLE_NEUTRAL_DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy:
          threadDetail.downVotesBy.includes(action.payload.userId)
          && threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
      }
    // case ActionType.TOGGLE_UPVOTE_COMMENT:
    //   return {
    //     ...threadDetail,
    //     comments: [
    //       {
    //         ...threadDetail.comments,
    //         upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
    //           ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
    //           : threadDetail.upVotesBy.concat([action.payload.userId])
    //       }
    //     ]
    //   }
    // case ActionType.TOGGLE_DOWNVOTE_COMMENT:
    //   return {
    //     ...threadDetail,
    //     comments: [
    //       {
    //         ...threadDetail.comments,
    //         downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
    //           ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
    //           : threadDetail.downVotesBy.concat([action.payload.userId])
    //       }
    //     ]
    //   }
    // case ActionType.TOGGLE_NEUTRAL_UPVOTE_COMMENT:
    //   return {
    //     ...threadDetail,
    //     upVotesBy:
    //         threadDetail.comments.upVotesBy.includes(action.payload.userId) &&
    //         threadDetail.comments.upVotesBy.filter((id) => id !== action.payload.userId)
    //   }
    // case ActionType.TOGGLE_NEUTRAL_DOWNVOTE_COMMENT:
    //   return {
    //     ...threadDetail,
    //     downVotesBy:
    //         threadDetail.comments.downVotesBy.includes(action.payload.userId)
    //         && threadDetail.comments.downVotesBy.filter((id) => id !== action.payload.userId)
    //   }
    default:
      return threadDetail
  }
}

export default threadDetailReducer
