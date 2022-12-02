import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'

function CourseDetail() {
  let params = useParams();
  let [course, setCourse] = React.useState({User:{}})
  
  React.useEffect(function(){
    fetch(`http://localhost:5000/api/courses/${params.id}`)
      .then(results => results.json())
      .then(results => setCourse(results))
  }, [params.id])

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link to={`/courses/${course.id}/update`} className="button">Update Course</Link>
          <a className="button" href="#">Delete Course</a>
          <Link to='/' className="button button-secondary">Return to List</Link>
        </div>
      </div>
      
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User.firstName} {course.User.lastName}</p>
              <p>
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </p>

            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default CourseDetail