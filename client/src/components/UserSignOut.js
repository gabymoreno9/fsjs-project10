import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserSignOut(props) {
  //This component is a bit of an oddball as it doesn't 
  //render any visual elements. Instead, it signs out the 
  //authenticated user and redirects the user to the default 
  //route (i.e. the list of courses).
  let navigate = useNavigate()
  React.useEffect(function() {
    props.signOut()
    navigate('/')
  })
  return <></>
}

export default UserSignOut