import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
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

  const canRemove = currentUser?.username === blog.user?.username

  return (
    <div className="blog">
      <div className='title'>{blog.title} {blog.author}
        <button role='button' style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button role='button' style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div className='url' style={showWhenVisible}>{blog.url}</div>
      <div className='likes' style={showWhenVisible}>Tykkäykset: {blog.likes || 0}
        <button role='button' onClick={handleLike}>like</button>
      </div>
      <div className='user' style={showWhenVisible}>Lisännyt: {blog.user.name}</div>
      <div>
        {canRemove && (
        <button role='button' onClick={handleDelete}>remove</button>
      )}
        </div>
    </div>
  )}

export default Blog