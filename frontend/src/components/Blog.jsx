import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    likeBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }

  }

  return (
    <div className="blog">
      <div className='title'>{blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div className='url' style={showWhenVisible}>{blog.url}</div>
      <div className='likes' style={showWhenVisible}>Tykkäykset: {blog.likes || 0}
        <button onClick={handleLike}>like</button>
      </div>
      <div className='user' style={showWhenVisible}>Lisännyt: {blog.user.name}</div>
      <button onClick={handleDelete}>remove</button>
    </div>
  )}

export default Blog