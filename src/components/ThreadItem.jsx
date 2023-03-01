import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  IoHeartCircleOutline,
  IoHeartCircleSharp,
  IoHeartDislikeCircleOutline,
  IoHeartDislikeCircleSharp
} from 'react-icons/io5'
import {
  RiChat1Line
} from 'react-icons/ri'
import postedAt from '../utils'
import parse from 'html-react-parser'

function ThreadItem ({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  authUser,
  totalComments,
  downVotesBy,
  upVote,
  downVote,
  neutralUpVote,
  neutralDownVote
}) {
  const isThreadUpVote = upVotesBy.includes(authUser)
  const isThreadDownVote = downVotesBy.includes(authUser)

  const onLikeClick = (event) => {
    event.stopPropagation()
    if (!isThreadUpVote && !isThreadDownVote) {
      upVote(id)
    } else if (isThreadDownVote) {
      neutralDownVote(id)
      upVote(id)
    } else if (isThreadUpVote) {
      neutralUpVote(id)
    }
  }

  const ondownVoteClick = (event) => {
    event.stopPropagation()
    if (!isThreadUpVote && !isThreadDownVote) {
      downVote(id)
    } else if (isThreadUpVote) {
      neutralUpVote(id)
      downVote(id)
    } else if (isThreadDownVote) {
      neutralDownVote(id)
    }
  }

  return (
    <div className="col-lg-10 card-group mb-5" key={id}>
      <div className="card profile-card-5">
        <div className="card-img-block">
          <div className="row g-0 card-img-top">
          <div className="col-lg-12 text-center">
            <p>
              <img src={user.avatar} height="30px" width="30px" className="me-2 rounded-circle"/>
              {
                user.name
              }
            </p>
          </div>
            <Link to={`/threads/${id}`} style={{ textDecoration: 'none' }}>
              <div className="col-lg-12 text-center"><h2>{title}</h2></div>
            </Link>
            <div className="col-lg-12">
              <div className="card-text text-center">
                {parse(body)}
              </div>
            </div>
          </div>
        </div>
        <div className="card profile-card-5 pt-2 pb-2 ps-2">
          <div className="row g-0 justify-content-between align-content-center mt-2">
            <div className="col-lg-8 text-center">
              <div className="row g-0 gap-1 mx-5">
                <div className="col-lg-3" style={{ backgroundColor: 'transparent', border: '1px solid black', borderRadius: '20px' }}>
                  <p style={{ marginTop: '10px' }}>#
                  {
                    category
                  }
                  </p>
                </div>
                <div className="col-lg-3 ms-2">
                  <p style={{ marginTop: '10px' }}>
                      {
                        postedAt(createdAt)
                      }
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="row g-0 gap-1 mt-2">
                <div className="col-lg-3">
                  <button type="button" onClick={onLikeClick} style={{ backgroundColor: 'transparent', border: '0' }}>
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
                <span className="ps-2">{upVotesBy.length}</span>
              </div>
                <div className="col-lg-3">
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
                <div className="col-lg-3">
                  <div>
                    <RiChat1Line size={'1.6rem'}/>
                   <span className="ps-2">{totalComments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  totalComments: PropTypes.number.isRequired
}

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralUpVote: PropTypes.func,
  neutralDownVote: PropTypes.func
}

ThreadItem.defaultProps = {
  upVote: null,
  downVote: null,
  neutralUpVote: null,
  neutralDownVote: null
}

export { threadItemShape }

export default ThreadItem
