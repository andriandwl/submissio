import React from 'react'
import PropTypes from 'prop-types'

function ThreadCommentInput ({ addCommentThread }) {
  const [content, setContent] = React.useState()

  const addComment = () => {
    if (content.trim()) {
      addCommentThread(content)
      setContent('')
    }
  }
  return (
    <div className="row g-0" style={{ border: '2px solid black', padding: '10px', borderRadius: '20px' }}>
      <article style={{ padding: '10px' }}>
        <h3>Beri Komentar</h3>
        <div className="col-lg-12">
          <form className="form-floating" onSubmit={addComment}>
            <textarea className="form-control" placeholder="Leave a comment here" value={content} onChange={({ target }) => setContent(target.value)} id="floatingTextarea2" style={{ height: '100px', width: '100%' }} />
            <button
            type="submit"
            className="mt-2"
            style={{
              width: '100%', backgroundColor: 'transparent', borderRadius: '5px', padding: '2px'
            }}
            >
            Tambah
            </button>
          </form>
        </div>
      </article>
    </div>
  )
}

ThreadCommentInput.propTypes = {
  addCommentThread: PropTypes.func.isRequired
}

export default ThreadCommentInput
