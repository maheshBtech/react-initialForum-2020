import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Data from './usercontext/usercontext';

class Editpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
            email:'',
            college:'',
            status:''
             
        }
    }
static contextType = Data;
   

  componentDidMount = () =>
  {
      this.fetchuserdata()
  }

  //to fetch details
  fetchuserdata = () =>
  {
     
      Axios.post('fetch/fetchdata',{name:this.context.store.username})
      .then((res) =>
      {
          const {college,email} = res.data
          this.setState({
              
              college,
              email
          })
          console.log(this.status)
      })
      .catch((err) =>
      {
          console.log(err)
      })
  }

    //to save the details
    submit = (e) =>
    {
        e.preventDefault()
        Axios.post('profile/updateregister',this.state)
        .then((res) =>
        {
           
            console.log(this.status)
            this.props.history.push('/myblog')
        })
        .catch((err) =>
        {

            this.setState({
                status:err.response.data
            })
            console.log(err)

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
       
        const {email,college,status} = this.state;
        return (
            <div >
      <h1 className = "heading2">
            Edit Your details Here!
      </h1>
    
      <form onSubmit={this.submit} className = "register">
      {
          status?
          <div className = "errormsg">
           <h5>{status.msg}</h5>
           <button onClick = {this.msgdel}>X</button>
          </div>  
          :null
      }

      College: <input
        placeholder = "Enter college Name"
        type = "text"
        name = "college"
        value = {college}
        onChange = {this.handlechange}        
        />
        Email_Id: <input
          placeholder = "enter email_id"
          type="email"
          name = "email"
          value = {email}
          onChange={this.handlechange}
         />
       
        <button type = "submit">save</button>
        <h4>Back to Myblog? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/myblog">Click here</Link></h4>
      </form>
     
    </div>
        )
    }
}

export default Editpage
