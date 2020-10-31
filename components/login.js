
import React from 'react'
import Axios from "axios";
import {Link} from 'react-router-dom'
import Data from './usercontext/usercontext';

class Login extends React.Component
{
    static contextType = Data;

    constructor()
    {
        super()
        this.state = {
            email:'',
            password:'',
            status:''
        }
    }

    submit = (e) =>
    {
        e.preventDefault()
        Axios.post('/reg/login',this.state)
        .then((res) =>
        {
            localStorage.setItem('Token',JSON.stringify({
                token:res.data.Token,
                username:res.data.name
            }))
            this.resetforum()
            this.context.fetchuserdata()
            this.props.history.push('/myblog')
        })
        .catch((err) =>
        {
            this.setState({
                status:err.response.data
            })
        })
    }

    handlechange = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
     
    resetforum = () =>
    {
        this.setState({
            email:'',
            password:'',
            status:''
        })
    }

    render()
    {
        const{password,email,status} = this.state
        return(
            <div className="page">
      
            <h1 className = "heading">
               Welcome to your <br/> learning community
            </h1>
      
         
            <form className = "login" onSubmit={this.submit}>
                {
                    status?
                    <h5>{status.msg}</h5>
                    :null
                }
              
              <input
                placeholder = "Enter email_id"
                type="email"
                name = "email"
                value = {email}
                onChange={this.handlechange}
              /><br/>
      
              
              <input
                name = "password"
                value = {password}
                type="password"
                placeholder = "Enter password"
                onChange={this.handlechange}
              /><br/>
              <button type = "submit">Sign in</button>
              <h4>Don't have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/register">Click here</Link></h4>
      
              
            </form>
          </div>
            
        )
    }
}

 export default Login
