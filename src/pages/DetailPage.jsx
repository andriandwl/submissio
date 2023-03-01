import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralDownVoteCommentDetail,
  asyncToggleNeutralDownVoteThreadDetail,
  asyncToggleNeutralUpVoteCommentDetail,
  asyncToggleNeutralUpVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail
} from '../states/threadDetail/action'
import ThreadDetail from '../components/ThreadDetail'

function DetailPage () {
  const { id } = useParams()
  const { threadDetail = null, authUser } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
  }, [id, dispatch])

  const onAddCommentThread = (content) => {
    dispatch(asyncAddComment({ content, commentTo: id }))
  }

  const onUpVoteThread = (id) => {
    dispatch(asyncToggleUpVoteThreadDetail(id))
  }

  const onDownVoteThread = (id) => {
    dispatch(asyncToggleDownVoteThreadDetail(id))
  }

  const onNeutralUpVoteThread = (id) => {
    dispatch(asyncToggleNeutralUpVoteThreadDetail(id))
  }

  const onNeutralDownVoteThread = (id) => {
    dispatch(asyncToggleNeutralDownVoteThreadDetail(id))
  }

  const onCommentUpVote = (commentId) => {
    dispatch(asyncToggleUpVoteComment({ id, commentId }))
  }

  const onCommentDownVote = (commentId) => {
    dispatch(asyncToggleDownVoteComment({ id, commentId }))
  }

  const onCommentNeutralUpVote = (commentId) => {
    dispatch(asyncToggleNeutralUpVoteCommentDetail({ id, commentId }))
  }

  const onCommentNeutralDownVote = (commentId) => {
    dispatch(asyncToggleNeutralDownVoteCommentDetail({ id, commentId }))
  }

  if (!threadDetail) {
    return null
  }

  return (
    <div className="container">
      <div className="row g-0">
        <div className="col-lg-12">
          <section className="detail-page">
            <ThreadDetail
              {...threadDetail}
              authUser={authUser.id}
              upVoteThread={onUpVoteThread}
              downVoteThread={onDownVoteThread}
              neutralUpVoteThread={onNeutralUpVoteThread}
              neutralDownVoteThread={onNeutralDownVoteThread}
              addComment={onAddCommentThread}
              commentUpVote={onCommentUpVote}
              commentDownVote={onCommentDownVote}
              neutralUpVoteComment={onCommentNeutralUpVote}
              neutralDownVoteComment={onCommentNeutralDownVote}
            />
          </section>
        </div>
      </div>

    </div>
  )
}

export default DetailPage
