import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function UserSignIn(props) {
  let navigate = useNavigate()
  let [emailAddress, setEmailAddress] = React.useState('')
  let [password, setPassword] = React.useState('')

  function signIn(event){
    event.preventDefault()
    props.signIn(emailAddress, password)
  }
  function cancelSignIn(){
    navigate('/')
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value = {emailAddress} onChange = {e => setEmailAddress(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value = {password} onChange = {e => setPassword(e.target.value)} />
          <button className="button" type="submit" onClick = {signIn}>Sign In</button>
          <button className="button button-secondary" onClick = {cancelSignIn}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignIn