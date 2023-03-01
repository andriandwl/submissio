import React from 'react'
import PropTypes from 'prop-types'
import CommentItem, { commentItemShape } from './CommentItem'
import {
  IoHeartCircleOutline,
  IoHeartCircleSharp,
  IoHeartDislikeCircleOutline,
  IoHeartDislikeCircleSharp
} from 'react-icons/io5'
import ThreadCommentInput from './ThreadCommentInput'
import postedAt from '../utils'
import parse from 'html-react-parser'

function ThreadDetail ({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  comments,
  upVotesBy,
  downVotesBy,
  addComment,
  commentUpVote,
  commentDownVote,
  neutralUpVoteComment,
  neutralDownVoteComment,
  authUser,
  upVoteThread,
  downVoteThread,
  neutralDownVoteThread,
  neutralUpVoteThread
}) {
  console.log(upVotesBy)
  const isThreadUpVote = upVotesBy.includes(authUser)
  const isThreadDownVote = downVotesBy.includes(authUser)

  const onUpVoteClick = (event) => {
    event.stopPropagation()
    if (!isThreadUpVote && !isThreadDownVote) {
      upVoteThread(id)
    } else if (isThreadDownVote) {
      neutralDownVoteThread(id)
      upVoteThread(id)
    } else if (isThreadUpVote) {
      neutralUpVoteThread(id)
    }
  }

  const ondownVoteClick = (event) => {
    event.stopPropagation()
    if (!isThreadUpVote && !isThreadDownVote) {
      downVoteThread(id)
    } else if (isThreadUpVote) {
      neutralUpVoteThread(id)
      downVoteThread(id)
    } else if (isThreadDownVote) {
      neutralDownVoteThread(id)
    }
  }

  return (
    <div className="container mt-2 mb-2">
      <section className="thread-detail row g-0">
        <div className="col-lg-6 d-flex mt-2 mx-2">
          <img src={owner.avatar} alt={owner} width="50px" height="50px" className="rounded-circle" />
          <p className="thread-detail__user-name ms-2 mt-3">{owner.name}</p>
        </div>
        <div className="col-lg-12">
          <article className="thread-detail__content" style={{ padding: '10px' }}>
            <h3 className="thread-detail__title manrope">{title}</h3>
            <div className="thread-detail__body" style={{ fontSize: '1em' }}>{parse(body)}</div>
          </article>
        </div>
        <div className="d-flex mt-4 mb-4 me-2">
          <div className="card-body pt-0">
            <div className="row g-0 gap-2">
              <div className="col-lg-8 d-flex justify-content-between align-items-center">
                <div className="col-lg-6 mx-2">
                <button type="button" onClick={onUpVoteClick} style={{ backgroundColor: 'transparent', border: '0' }}>
                {
                  isThreadUpVote
                    ? (
                      <IoHeartCircleSharp size={'2rem'}/>

                      )
                    : (
                      <IoHeartCircleOutline size={'2rem'}/>
                      )
                }
              </button>
              <span className="ps-2 me-4">{upVotesBy.length}</span>
              <button type="button" onClick={ondownVoteClick} style={{ backgroundColor: 'transparent', border: '0' }}>
              {
                isThreadDownVote
                  ? (

                    <IoHeartDislikeCircleSharp size={'2rem'}/>
                    )
                  : (
                    <IoHeartDislikeCircleOutline size={'2rem'}/>
                    )
              }
              </button>
                <span className="ps-2">{downVotesBy.length}</span>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                  <p className="thread-detail__category rounded-pill mt-2">
                    #
                    {category}
                  </p>
                  <p className="thread-detail__category ms-2 mt-2">
                    {postedAt(createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <p>
            Komentar
            (
            {comments.length}
            )
          </p>
          <ThreadCommentInput
          addCommentThread={addComment}
        />
          <div className="row g-0 mt-2">
            {
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                commentUpVote={commentUpVote}
                commentDownVote={commentDownVote}
                neutralUpVoteComment={neutralUpVoteComment}
                neutralDownVoteComment={neutralDownVoteComment}
                authUser={authUser}
              />
            ))
          }
          </div>
        </div>
      </section>
    </div>
  )
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  commentUpVote: PropTypes.func,
  commentDownVote: PropTypes.func,
  upVoteThread: PropTypes.func,
  downVoteThread: PropTypes.func,
  neutralDownVoteThread: PropTypes.func,
  neutralUpVoteThread: PropTypes.func,

  neutralUpVoteComment: PropTypes.func,
  neutralDownVoteComment: PropTypes.func,
  addComment: PropTypes.func,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired
}

ThreadDetail.defaultProps = {
  commentUpVote: null,
  commentDownVote: null,
  upVoteThread: null,
  downVoteThread: null,
  neutralDownVoteThread: null,
  neutralUpVoteThread: null,

  neutralUpVoteComment: null,
  neutralDownVoteComment: null
}

export { userShape }

export default ThreadDetail
