import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function UpdateCourse(props) {
  let params = useParams()
  let navigate = useNavigate()
  let [courseTitle, setCourseTitle] = React.useState('')
  let [courseDescription, setCourseDescription] = React.useState('')
  let [estimatedTime, setEstimatedTime] = React.useState('')
  let [materialsNeeded, setMaterialsNeeded] = React.useState('')
  let [formErrors, setFormErrors] = React.useState(null)

  React.useEffect(function(){
    fetch(`http://localhost:5000/api/courses/${params.id}`)
      .then(results => results.json())
      .then(results => {
        setCourseTitle(results.title)
        setCourseDescription(results.description)
        setEstimatedTime(results.estimatedTime)
        setMaterialsNeeded(results.materialsNeeded)
      })
  }, [params.id])

  function cancelUpdateCourse(){
    navigate(`/courses/${params.id}`)
  }
  // if no erros happen while updating, it takes the user to that course page
  async function updateCourse(event){
    event.preventDefault()
    let result = await props.updateCourse(params.id, courseTitle, courseDescription, estimatedTime, materialsNeeded)
    setFormErrors(result.errors)
    if (!result.errors) {
      navigate(`/courses/${params.id}`)
    }
  }

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {/* ui for the validation errors  */}
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