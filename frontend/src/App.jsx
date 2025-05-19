import { use, useEffect, useState } from 'react'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])

  const hook = () => {
    blogService
      .getAll()
      .then(initialBlogs=> {
        setBlogs(initialBlogs)
      }
    )
  }

  useEffect(hook, [])

  return(
    <div>
      <h1>Hello World</h1>
      <ul>
        {blogs.map(blog => 
          <li key={blog.id}>
            {blog}
          </li>       
        )}
      </ul>
    </div>
    
  )
  
}

export default App
