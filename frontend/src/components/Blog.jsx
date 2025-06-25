import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes
    })
  }

  return (
  <div className="blog">
    <div>{blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
    </div>
    <div style={showWhenVisible}>{blog.url}</div>
    <div style={showWhenVisible}>Tykkäykset: {blog.likes || 0}
      <button onClick={handleLike(blog.id)}>like</button>
    </div>
    <div style={showWhenVisible}>Lisännyt: {blog.user.name}</div>
  </div>  
)}

export default Blog