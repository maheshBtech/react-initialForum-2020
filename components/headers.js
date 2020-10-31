import React from 'react';
import Data from './usercontext/usercontext';
import {Link} from 'react-router-dom'


class Headers extends React.Component
{
    static contextType = Data;
    render()
    {
        const {store} = this.context;
        
        
        return(
            <div>
               {
                   store.username?
                   <div id = "navbar">
                       <Link to = "/home">Home</Link>
                       <Link to = "/contact">Contact</Link>
                       <Link to = "/myblog">My Blog</Link>
                       
                       
                   </div>
                   :
                   <div id = "logoutheader">
                        <Link to = "/">Sign In</Link>
                        <Link to = "/register">Join In</Link>
                       </div>
               }

            </div>
        )
    }
}
export default Headers