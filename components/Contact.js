import React, { Component } from 'react'
import Axios from 'axios'

class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             text:'',
             subject:'',
             status:''
        }
    }

    submit = (e) =>
    {
        e.preventDefault();
        const {subject,text,email} = this.state
        Axios.post('send/mail',{email,subject,text})
        .then((res) =>
        {
            this.setState({
                status:res.data
            })
            
            this.resetform()
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
            email:"",
            text:"",
            subject:""
        })
    }

    handlechange = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    
    render() {
        const {email,text,subject,status} = this.state;
        return (
            <div className = "contact">
                
                <form onSubmit = {this.submit}>
                <h2>Contact Here!</h2>
                    <input type = "email"
                    name = "email"
                    value = {email}
                    placeholder = "Your email_id"
                    onChange = {this.handlechange}
                    />
                    <br/>

                    <input type = "text"
                    name = "subject"
                    value = {subject}
                    placeholder = "Subject"
                    onChange = {this.handlechange}
                    /><br/>
                   
                    
                     <textarea type = "text-area"
                    name = "text"
                    rows= "5"
                    cols = "33"
                    value = {text}
                    placeholder = "text"
                    onChange = {this.handlechange}
                    />
                    <br/>
                    <button type = "submit" >submit</button>
                    {
                       status?
                    <h3>{status.msg}</h3>
                    :null
                    }

                </form>

                
            </div>
        )
    }
}

export default Contact
