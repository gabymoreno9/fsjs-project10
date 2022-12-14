import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function UserSignUp(props) {
  let navigate = useNavigate()
  let [firstName, setFirstName] = React.useState('')
  let [lastName, setLastName] = React.useState('')
  let [emailAddress, setEmailAddress] = React.useState('')
  let [password, setPassword] = React.useState('')
  let [formErrors, setFormErrors] = React.useState(null)
    
  function cancelSignUp(){
    navigate('/')
  }
  //sign up function
  async function signUp(event){
    event.preventDefault()
    let result = await props.signUp(firstName, lastName, emailAddress, password)
    setFormErrors(result.errors)
    if (!result.errors) {
      navigate('/')
    }
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {/* ui to show validation errors  */}
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
          <label htmlFor="firstName">First Name </label>
          <input id="firstName" name="firstName" type="text" value = {firstName} onChange = {e => setFirstName(e.target.value)} />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value = {lastName} onChange = {e => setLastName(e.target.value)} />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value = {emailAddress} onChange = {e => setEmailAddress(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value = {password} onChange = {e => setPassword(e.target.value)} />
          <button className="button" type="submit" onClick = {signUp}>Sign Up</button>
          <button className="button button-secondary" onClick = {cancelSignUp}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignUp