import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

 class Auth extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             login:false 
             
        }
    }
    componentDidMount = () =>
    {
        this.validate()
    }

    validate = () =>
    {
        const id = this.props.match.params.id
        Axios.post('/reg/validate',{token:id})
        .then((res) =>
        {
            console.log(res)
            this.setState({
                login:true
            })
        })
        .catch((err) =>
        {
            console.log(err)
        })
    }
    

    render() {
        const {login} = this.state
        return (
            <div>
               {
                   login?
                   <div>
                        <h4>Your account is activated </h4><p>click here to login</p>
                        <Link to = "/">Login</Link>
                       </div>
                    :
                    <div>
                        <h2>Something went wrong that may be time out or some other issue </h2>
                        <p>
                            please resister again ,To register again please click the below link
                        </p>
                        <Link to = "/register">Click here</Link>
                        </div>
               }
                
            </div>
        )
    }
}

export default Auth
