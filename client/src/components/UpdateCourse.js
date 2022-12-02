import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function UpdateCourse() {
  let params = useParams()
  let navigate = useNavigate()
  let [courseTitle, setCourseTitle] = React.useState('')
  let [courseDescription, setCourseDescription] = React.useState('')
  let [estimatedTime, setEstimatedTime] = React.useState('')
  let [materialsNeeded, setMaterialsNeeded] = React.useState('')

  function cancelUpdateCourse(){
    navigate(`/courses/${params.id}`)
  }
  function updateCourse(){

  }

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value= {courseTitle} onChange = {e => setCourseTitle(e.target.value)} />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value= {courseDescription} onChange = {e => setCourseDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value= {estimatedTime} onChange = {e => setEstimatedTime(e.target.value)} />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value= {materialsNeeded} onChange = {e => setMaterialsNeeded(e.target.value)}></textarea>
            </div>
          </div>
          <button className="button" type="submit" onClick = {updateCourse}>Update Course</button>
          <button className="button button-secondary" onClick = {cancelUpdateCourse}>Cancel</button>
        </form>
      </div>
    </main>
  )
}

export default UpdateCourse