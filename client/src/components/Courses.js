import React from 'react'
import { Link } from 'react-router-dom'

function Courses() {
  let [courses, setCourses] = React.useState([])
  
  //fetches courses
  React.useEffect(function(){
    fetch('http://localhost:5000/api/courses')
      .then(results => results.json())
      .then(results => setCourses(results))
  }, [])

  return (
    <main>
      <div className="wrap main--grid">
        {courses.map(function(course){
          return (
            //using linkto to link to different pages
            <Link to={`/courses/${course.id}`} key={course.id} className="course--module course--link">
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          )
        })}
        <Link to= "/courses/create" className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  )
}

export default Courses