import React from 'react'
import PropTypes from 'prop-types'
import {
  IoHeartCircleOutline,
  IoHeartCircleSharp,
  IoHeartDislikeCircleOutline,
  IoHeartDislikeCircleSharp
} from 'react-icons/io5'
import postedAt from '../utils'
import parse from 'html-react-parser'

function CommentItem ({
  id,
  content,
  createdAt,
  owner,
  commentUpVote,
  commentDownVote,
  neutralUpVoteComment,
  neutralDownVoteComment,
  authUser,
  upVotesBy,
  downVotesBy
}) {
  const isCommentUpVote = upVotesBy?.includes(authUser)
  const isCommentDownVote = downVotesBy?.includes(authUser)

  const onUpVoteClick = (event) => {
    event.stopPropagation()
    if (!isCommentUpVote && !isCommentDownVote) {
      commentUpVote(id)
    } else if (isCommentDownVote) {
      neutralDownVoteComment(id)
      commentUpVote(id)
    } else if (isCommentUpVote) {
      neutralUpVoteComment(id)
    }
  }

  const ondownVoteClick = (event) => {
    event.stopPropagation()
    if (!isCommentUpVote && !isCommentDownVote) {
      commentDownVote(id)
    } else if (isCommentUpVote) {
      neutralUpVoteComment(id)
      commentDownVote(id)
    } else if (isCommentDownVote) {
      neutralDownVoteComment(id)
    }
  }

  return (
    <>
      <div key={id} className="col-lg-12 d-flex gap-2 align-items-center mt-2 mx-4">
        <img src={owner.avatar} alt="ucing" className="rounded-circle" width="30px" height="30px"/>
        <p className="mt-3">{owner.name}</p>
      </div>
      <div className="col-lg-12 mx-4">
        <div>{parse(content)}</div>
      </div>
      <div className="col-lg-12" style={{ borderBottom: '2px solid black' }}>
        <div className="card-body pt-0">
          <div className="row g-0">
            <div className="col-lg-4 text-center my-3">
              <div className="row g-0 mb-2">
                <div className="col-lg-4">
                    <button type="button" onClick={onUpVoteClick} style={{ backgroundColor: 'transparent', border: '0' }}>
                      {
                        isCommentUpVote
                          ? (
                            <IoHeartCircleSharp size={'2rem'}/>

                            )
                          : (
                            <IoHeartCircleOutline size={'2rem'}/>
                            )
                      }
                    </button>
                  <span className="ps-2">{upVotesBy.length}</span>
                </div>
                <div className="col-lg-4">
                  <button type="button" onClick={ondownVoteClick} style={{ backgroundColor: 'transparent', border: '0' }}>
                    {
                      isCommentDownVote
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
                <div className="col-lg-4">
                  <p>{postedAt(createdAt)}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired
}

CommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.string.isRequired,
  commentUpVote: PropTypes.func.isRequired,
  commentDownVote: PropTypes.func.isRequired,
  neutralDownVoteComment: PropTypes.func.isRequired,
  neutralUpVoteComment: PropTypes.func.isRequired

}

CommentItem.defaultProps = {
  commentUpVote: null,
  commentDownVote: null,
  neutralDownVoteComment: null,
  neutralUpVoteComment: null
}

export { commentItemShape }

export default CommentItem
