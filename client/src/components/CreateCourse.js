import React from 'react'
import { useNavigate } from 'react-router-dom'


function CreateCourse(props) {
  let navigate = useNavigate()
  let [courseTitle, setCourseTitle] = React.useState('')
  let [estimatedTime, setEstimatedTime] = React.useState('')
  let [materialsNeeded, setMaterialsNeeded] = React.useState('')
  let [courseDescription, setCourseDescription] = React.useState('')
  let [formErrors, setFormErrors] = React.useState(null)

  function cancelCreateCourse(){
    navigate('/')
  }
  async function createCourse(event){
    event.preventDefault()
    let result = await props.createCourse(courseTitle, courseDescription, estimatedTime, materialsNeeded)
    setFormErrors(result.errors)
    if (!result.errors) {
      navigate('/')
    }
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {/* ui to show the validation errors  */}
        {formErrors ?
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {formErrors.map(error =>
                <li key={error}>{error}</li>
              )}
            </ul>
          </div>
        :
          null
        }

        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value= {courseTitle} onChange = {e => setCourseTitle(e.target.value)}  />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value= {courseDescription} onChange = {e => setCourseDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value= {estimatedTime} onChange = {e => setEstimatedTime(e.target.value)}  />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value= {materialsNeeded} onChange = {e => setMaterialsNeeded(e.target.value)} ></textarea>
            </div>
          </div>
          <button className="button" type="submit" onClick = {createCourse}>Create Course</button>
          <button className="button button-secondary" onClick = {cancelCreateCourse}>Cancel</button>
        </form>
      </div>
    </main>
  )
}

export default CreateCourse
