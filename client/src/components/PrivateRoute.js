import React from 'react'
import { Navigate } from 'react-router-dom'

//private route component, would not work unless i used props.children
function PrivateRoute(props) {
  if (props.user) {
    return props.children
  }
  else {
    return <Navigate replace to="/signin" />
  }
}

export default PrivateRoute
