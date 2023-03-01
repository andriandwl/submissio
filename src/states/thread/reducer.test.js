/* eslint-disable no-undef */
/**
 * test scenario for talksReducer
 *
 * - threadReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by RECEIVE_THREADS action
 *  - should return the talks with the new talk when given by ADD_THREAD action
 *  - should return the talks with the toggled like talk when given by TOGGLE_UP_VOTE, TOGGLE_DOWN_VOTE action
 *  - should return the talks with the toggled like talk when given by TOGGLE_NEUTRAL_UP_VOTE, TOGGLE_NEUTRAL_DOWN_VOTE action
 */

import threadsReducer from './reducer'

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []
    const action = {
      type: 'UNKNOWN'
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })
  it('should return the talks when given by RECEIVE_THREADS action', () => {
    const initialState = []
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 2
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-25T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 2
          }
        ]
      }
    }

    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(action.payload.threads)
  })
  it('should return the talks with the new talk when given by ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2022-12-11T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 2
      }
    ]
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: [
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-25T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 2
          }
        ]
      }
    }

    const nextState = threadsReducer(initialState, action)

    expect(nextState).toEqual([action.payload.thread, ...initialState])
  })
  it('should return the talks with the toggled like talk when given by TOGGLE_UP_VOTE, TOGGLE_DOWN_VOTE action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-05-20T07:00:00.000Z',
        ownerId: 'user-6oWew2w2Wx5xLUTU',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 2
      }
    ]
    const action = {
      type: 'TOGGLE_UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-5PqX6Ldhnk_ifroq'
      }
    }

    const nextState = threadsReducer(initialState, action)

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId]
      }
    ])

    const action2 = {
      type: 'TOGGLE_DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1'
      }
    }

    const nextState2 = threadsReducer(initialState, action2)
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action2.payload.userId]
      }
    ])
  })
  // it('should return the talks with the toggled like talk when given by TOGGLE_NEUTRAL_UP_VOTE, TOGGLE_NEUTRAL_DOWN_VOTE action', () => {
  //   const initialState = [
  //     {
  //       id: 'thread-1',
  //       title: 'Thread Pertama',
  //       body: 'Ini adalah thread kedua',
  //       category: 'General',
  //       createdAt: '2021-05-20T07:00:00.000Z',
  //       ownerId: 'user-6oWew2w2Wx5xLUTU',
  //       upVotesBy: [],
  //       downVotesBy: [],
  //       totalComments: 2
  //     }
  //   ]
  //   const action = {
  //     type: 'TOGGLE_NEUTRAL_UP_VOTE_THREAD',
  //     payload: {
  //       threadId: 'thread-1',
  //       userId: 'user-5PqX6Ldhnk_ifroq'
  //     }
  //   }

  //   const nextState = threadsReducer(initialState, action)

  //   expect(nextState).toEqual([
  //     {
  //       ...initialState[0],
  //       upVotesBy: [action.payload.userId]
  //     }
  //   ])
  // })
  // it('should return the talks with the toggled like talk when given by TOGGLE_NEUTRAL_UP_VOTE, TOGGLE_NEUTRAL_DOWN_VOTE action', () => {
  //   const initialState = [
  //     {
  //       id: 'thread-1',
  //       title: 'Thread Pertama',
  //       body: 'Ini adalah thread kedua',
  //       category: 'General',
  //       createdAt: '2021-05-20T07:00:00.000Z',
  //       ownerId: 'users-1',
  //       upVotesBy: [],
  //       downVotesBy: [],
  //       totalComments: 2
  //     }
  //   ]

  //   const action = {
  //     type: 'TOGGLE_NEUTRAL_UP_VOTE_THREAD',
  //     payload: {
  //       threadId: 'thread-1',
  //       userId: 'users-1'
  //     }
  //   }

  //   const nextState = threadsReducer(initialState, action)
  //   expect(nextState).toEqual([
  //     {
  //       ...initialState[0],
  //       upVotesBy: [action.payload.userId]
  //     }
  //   ])

  //   const action2 = {
  //     type: 'TOGGLE_NEUTRAL_DOWN_VOTE_THREAD',
  //     payload: {
  //       threadId: 'thread-1',
  //       userId: 'users-1'
  //     }
  //   }
  //   const nextState2 = threadsReducer(initialState, action2)
  //   expect(nextState2).toEqual([
  //     {
  //       ...initialState[0],
  //       downVotesBy: [action2.payload.userId]
  //     }
  //   ])
  // })
})
