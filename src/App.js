import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom'
import config from './firebase/config'
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ChatArea from './ChatArea';

export default class  App extends React.Component{
render(){
  return(
    <Router>
    <div>
      <Switch>
      <Route exact path='/' component = {SignInPage}/>
      <Route path =  '/SignUp' component = {SignUpPage}/>
      <Route path = '/ChatArea' component = {ChatArea}/>
      <Route />
      </Switch>
    </div>
  </Router>)
}
}