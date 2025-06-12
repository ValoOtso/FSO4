import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
  <div className="blog">
    <div>{blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
    </div>
    <div style={showWhenVisible}>{blog.url}</div>
    <div style={showWhenVisible}>likes {blog.likes || 0}
      <button>like</button>
    </div>
    <div style={showWhenVisible}>{blog.user}</div>{/*KORJAA BACKENDIIN POPULATE FROM 4.C */} 
  </div>  
)}

export default Blog