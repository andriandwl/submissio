/* eslint-disable no-undef */
/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import api from '../../utils/api'
import { receiveUsersActionCreator } from '../users/action'
import { receiveThreadsActionCreator } from '../thread/action'
import { asyncPopulateLeaderboards, asyncPopulateUsersAndThreads } from './action'
import { receiveLeaderBoardsActionCreator } from '../leaderboards/action'

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  }
]

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 5
  }
]

const fakeUsersResponse = [
  {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
  }
]

const fakeErrorResponse = new Error('Something went wrong')

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers
    api._getAllThread = api.getAllThread
  })

  afterEach(() => {
    api.getAllUsers = api._getAllUsers
    api.getAllThread = api._getAllThread

    delete api._getAllUsers
    delete api._getAllThread
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse)
    api.getAllThread = () => Promise.resolve(fakeThreadsResponse)

    // mock dispatch
    const dispatch = jest.fn()

    // action
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse))
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse))
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse)
    api.getAllThread = () => Promise.reject(fakeErrorResponse)

    // mock dispatch
    const dispatch = jest.fn()
    // mock alert
    window.alert = jest.fn()

    // action
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})

/**
 * skenario test
 *
 * - asyncPopulateLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    api._getAllLeaderboards = api.getAllLeaderboards
  })

  afterEach(() => {
    api.getAllLeaderboards = api._getAllLeaderboards

    delete api._getAllLeaderboards
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse)

    // mock dispatch
    const dispatch = jest.fn()

    // action
    await asyncPopulateLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderBoardsActionCreator(fakeLeaderboardsResponse))
  })
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllLeaderboards = () => Promise.reject(fakeErrorResponse)

    // mock dispatch
    const dispatch = jest.fn()
    // mock alert
    window.alert = jest.fn()

    // action
    await asyncPopulateLeaderboards()(dispatch)

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
