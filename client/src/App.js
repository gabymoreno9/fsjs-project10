import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import CourseDetail from './components/CourseDetail'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import PrivateRoute from './components/PrivateRoute'


function App() {
  let [user, setUser] = React.useState(null)
  let [password, setPassword] = React.useState(null)

  async function signIn(emailAddress, password){
    // Encode the username and password to base64
    // https://stackoverflow.com/questions/43842793/basic-authentication-with-fetch
    let headers = {'Authorization': 'Basic ' + btoa(emailAddress + ":" + password)}
    let response = await fetch('http://localhost:5000/api/users', { headers })
    if (response.status === 200) {
      let user = await response.json()
      setUser(user)
      setPassword(password)
      return { errors: null }
    }
    else {
      return { errors: ['Incorrect username or password'] }
    }
  }

  async function signUp(firstName, lastName, emailAddress, password) {
    let userData = JSON.stringify({ firstName, lastName, emailAddress, password })
    let headers = {'Content-Type': 'application/json'}
    let response = await fetch('http://localhost:5000/api/users', { headers, method: 'POST', body: userData })
    if (response.status === 201) {
      setUser({ firstName, lastName, emailAddress })
      setPassword(password)
      return { errors: null }
    }
    else {
      return await response.json()
    }
  }

  //signout the user function
  function signOut(){
    setUser(null)
    setPassword(null)
  }

  //create course function
  async function createCourse(title, description, estimatedTime, materialsNeeded) {
    let courseData = JSON.stringify({ title, description, estimatedTime, materialsNeeded })
    let headers = {'Authorization': 'Basic ' + btoa(user.emailAddress + ":" + password), 'Content-Type': 'application/json'}
    let response = await fetch('http://localhost:5000/api/courses', { headers, method: 'POST', body: courseData })
    if (response.status === 201) {
      return { errors: null }
    }
    else {
      return await response.json()
    }
  }

  //update course function
  async function updateCourse(courseId, title, description, estimatedTime, materialsNeeded) {
    let courseData = JSON.stringify({ title, description, estimatedTime, materialsNeeded })
    let headers = {'Authorization': 'Basic ' + btoa(user.emailAddress + ":" + password), 'Content-Type': 'application/json'}
    let response = await fetch(`http://localhost:5000/api/courses/${courseId}`, { headers, method: 'PUT', body: courseData })
    if (response.status === 204) {
      return { errors: null }
    }
    else {
      return await response.json()
    }
  }

  //function deletes course with method delete
  async function deleteCourse(courseId) {
    let headers = {'Authorization': 'Basic ' + btoa(user.emailAddress + ":" + password)}
    await fetch(`http://localhost:5000/api/courses/${courseId}`, { headers, method: 'DELETE' })
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/create" element={
          <PrivateRoute user={user}>
            <CreateCourse createCourse={createCourse} />
          </PrivateRoute>
        } />
        <Route path="/courses/:id/update" element={
          <PrivateRoute user={user}>
            <UpdateCourse updateCourse={updateCourse} />
          </PrivateRoute>
        } />
        <Route path="/courses/:id" element={<CourseDetail user={user} deleteCourse={deleteCourse} />} />
        <Route path="/signin" element={<UserSignIn signIn={signIn} />} />
        <Route path="/signup" element={<UserSignUp signUp={signUp} />} />
        <Route path="/signout" element={<UserSignOut signOut={signOut} />} />
      </Routes>
    </>
  );
}


export default App;
