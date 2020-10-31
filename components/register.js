import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:'',
            email:'',
            password:'',
            college:'',
            status:''
        }
    }
    submit = (e) =>
    {
        e.preventDefault()
        Axios.post('/reg/register',this.state)
        .then((res) =>
        {
            this.setState({
                status:res.data
            },this.resetform())
            // this.props.history.push('/')
        })
        .catch((err) =>
        {
            this.setState({
                status:err.response.data
            })
        })
    }

    resetform = () =>
    {
        this.setState({
            username:'',
            email:'',
            password:'',
            college:'',
            
        })
    }
    handlechange = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })

    }

    msgdel = () =>
    {
        this.setState({
            status:''
        })
    }
  

    render() {
     
        const {username,email,password,college,status} = this.state;
        return (
            <div >
      <h1 className = "heading2">
            Join here!
      </h1>
    
      <form onSubmit={this.submit} className = "register">
      {
          status?

         status.msg?
         <div className = "errormsg">
         <h5>{status.msg}</h5>
         <button onClick = {this.msgdel}>X</button>
        </div> 
        : <div className = "resultmsg">
         <h5>{status.rel}</h5>
         <button onClick = {this.msgdel}>X</button>
        </div>  

          :null
      }

        <input
        placeholder = "Enter username"
        type = "text"
        name = "username"
        value = {username}
        onChange = { this.handlechange}       
        />
        <input
        placeholder = "Enter college Name"
        type = "text"
        name = "college"
        value = {college}
        onChange = {this.handlechange}        
        />
        <input
          placeholder = "enter email_id"
          type="email"
          name = "email"
          value = {email}
          onChange={this.handlechange}
         />
        <input
          placeholder = "Enter password"
          type="password"
          name = "password"
          value = {password}
          onChange={this.handlechange}      
        />
        <button type = "submit">Join now</button>
        <h4>Already have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/">Click here</Link></h4>
      </form>
     
    </div>
        )
    }
}

// Register.contextType = Data;

export default Register
