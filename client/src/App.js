import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import CourseDetail from './components/CourseDetail'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'


function App() {
  let navigate = useNavigate()
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
      navigate('/')
    }
  }

  function signOut(){
    setUser(null)
    setPassword(null)
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={<UserSignIn signIn={signIn} />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut signOut={signOut} />} />
      </Routes>
    </>
  );
}


export default App;
