import React from 'react'
import PropTypes from 'prop-types'
import ThreadCategoryItem, { threadCategoryShape } from './ThreadCategoryItem'

function ThreadCategoryList ({ threads }) {
  return (
    <div className="col-lg-8">
      {
        threads.map((thread) => (
          <ThreadCategoryItem key={thread.id} {...thread} />)
        )
      }
    </div>
  )
}

ThreadCategoryList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadCategoryShape)).isRequired
}

export default ThreadCategoryList
