import { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)
    const [addBlogVisible, setAddBlogVisible] = useState(false)

    const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
    .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }
  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }
    return(
    <div>
      <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>Add new blog</button>
        </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">save</button>
        </form>
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
    </div>
    )
  }

  return(
    <div>
        {blogForm()}
    </div>
    
  )
}

export default BlogForm