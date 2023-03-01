/* eslint-disable no-undef */
/**
 * test scenario for talksReducer
 *
 * - threadDetailReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by RECEIVE_DETAIL_THREADS action
 *  - should return the talks with the new talk when given by ADD_COMMENT action
 *  - should return the talks with the toggled like talk when given by TOGGLE_UP_VOTE, TOGGLE_DOWN_VOTE action
 *  - should return the talks with the toggled like talk when given by TOGGLE_NEUTRAL_UP_VOTE, TOGGLE_NEUTRAL_DOWN_VOTE action
 */

import threadDetailReducer from './reducer'

describe('threadDetailReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []
    const action = {
      type: 'UNKNOWN'
    }

    const nextState = threadDetailReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })
  it('should return the talks when given by RECEIVE_DETAIL_THREADS action', () => {
    const initialState = null
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: []
        }

      }
    }
    const nextState = threadDetailReducer(initialState, action)
    expect(nextState).toEqual(action.payload.threadDetail)
  })
  it('should return the talks with the new talk when given by ADD_COMMENT action', () => {
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com'
        }
      },
      {
        id: 'comment-2',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-22T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    ]
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com'
          }
        }
      }
    }

    const nextState = threadDetailReducer(initialState, action)
    expect(nextState).toEqual([action.payload.comment, ...initialState])
  })
})
