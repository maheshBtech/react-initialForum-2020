import './App.css'
import React, { Component } from 'react'
import Register from './components/register'
import Login from './components/login'
import Headers from "./components/headers"
import Myblog from './components/Myblog'
import {Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import { Provider } from './components/usercontext/usercontext'
import Editpage from './components/editprofile'
import Contact from './components/Contact'
import Home from './components/homepage'
import Auth from './components/auth'


 class App extends Component {
 constructor() {
   super()
   this.state = {
    store:{
      token:undefined,
      username:undefined
    }
   }
   
}
 
componentDidMount = () =>
{
    this.fetchuserdata()
}

  fetchuserdata = () =>
  {
    const storage = JSON.parse(localStorage.getItem('Token'))
    if(storage && storage.username)
    {
      this.setState({
        store:storage
      })
      
    }
  }

  deletetoken = () =>
  {
    this.setState({
      store:{
        token:undefined,
        username:undefined
      }
    })
  }

  render() {
    const {fetchuserdata,deletetoken} = this
    const {store} = this.state
    return (
      <div>
         <Router>
           <Provider value = {{store,fetchuserdata,deletetoken}}>
             <Headers/>

                <Switch>

                  <Route exact path = "/" component = {Login} />
                  <Route  path = "/register" component = {Register} />
                  <Route path = "/myblog" component = {Myblog}/>
                  <Route path = "/editpage" component = {Editpage}/>
                  <Route path = "/contact" component = {Contact}/>
                  <Route path = "/home" component = {Home}/>
                  <Route path = "/auth/:id" component = {Auth}/>

                </Switch>
           
        </Provider>
     </Router>

      
       
        
      </div>
    )
  }
}

export default App
