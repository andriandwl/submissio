import PropTypes from 'prop-types'
import React from 'react'

function ThreadCategoryItem ({ category }) {
  return (
    <>
      <span className="bungee me-2">
        {category}
      </span>
    </>
  )
}

const threadCategoryShape = {
  category: PropTypes.string.isRequired
}

ThreadCategoryItem.propTypes = {
  ...threadCategoryShape
}

export { threadCategoryShape }

export default ThreadCategoryItem
