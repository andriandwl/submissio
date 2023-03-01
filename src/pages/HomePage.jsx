import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import ThreadList from '../components/ThreadList'
import { asyncToggleDownVoteThread, asyncToggleNeutralDownVoteThread, asyncToggleNeutralUpVoteThread, asyncToggleUpVoteThread } from '../states/thread/action'
import ThreadCategoryList from '../components/ThreadCategoryList'

function HomePage () {
  const { threads = [], users = [], authUser } = useSelector((states) => states)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id
  }))

  const threadCategoryList = threads.filter((thread, index) => (
    threads.findIndex((fill) => fill.category === thread.category) === index
  ))

  // const threadCategoryList = threads.filter((item) => item.category).map((thread) => ({
  //   ...thread
  // }))

  const onUpVote = (id) => {
    dispatch(asyncToggleUpVoteThread(id))
  }

  const onDownVote = (id) => {
    dispatch(asyncToggleDownVoteThread(id))
  }

  const onNeutralUpVote = (id) => {
    dispatch(asyncToggleNeutralUpVoteThread(id))
  }

  const onNeutralDownVote = (id) => {
    dispatch(asyncToggleNeutralDownVoteThread(id))
  }

  return (
    <div className="container mt-2">
      <div className="row g-0 align-items-center" style={{ border: '1px solid black', borderRadius: '30px 30px 30px 30px' }}>
        <div className="col-lg-4 p-5">
          <h3 className="bungee">Category</h3>
        </div>
        <ThreadCategoryList threads={threadCategoryList}/>
      </div>
      <div className="row g-0 justify-content-center" style={{ border: '1px solid black', borderRadius: '30px 30px 30px 30px' }}>
        <div className="col-lg-12 p-5 text-center">
          <h3 className="bungee">Available</h3>
        </div>
        <ThreadList
          threads={threadList}
          upVote={onUpVote}
          downVote={onDownVote}
          neutralUpVote={onNeutralUpVote}
          neutralDownVote={onNeutralDownVote}/>
        <div className="col-lg-12 text-end p-5">
          <Link to="/addthread" style={{ textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" color="black" height="40" fill="currentColor" className="bi bi-node-plus" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6.025 7.5a5 5 0 1 1 0 1H4A1.5 1.5 0 0 1 2.5 10h-1A1.5 1.5 0 0 1 0 8.5v-1A1.5 1.5 0 0 1 1.5 6h1A1.5 1.5 0 0 1 4 7.5h2.025zM11 5a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 11 5zM1.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
