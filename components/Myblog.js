import React from 'react'
import Data from './usercontext/usercontext'
import Axios from'axios'

class Myblog extends React.Component
{
    constructor(props) {
        super(props)
    
        this.state = {
             file:'',
             userdata:{
                 username:'',
                 college:'',
                 profilepath:''
             }
        }
    }
    
    static contextType = Data;
    logout = () =>
    {
        localStorage.removeItem('Token')
        this.context.deletetoken()
        this.props.history.push('/')
        
    }

    handlefile = (e) =>
    {
        this.setState({
            file:e.target.files[0]
        })
    }

    uploadfile = async(e) =>
    {
        try{
                e.preventDefault();
                const file = new FormData();
                file.append('pic',this.state.file)
                file.append('name',this.context.store.username)
                Axios.post('/profile/uploadprofile',file)
                .then((res) =>
                {
                    console.log(res)
                    this.fetchuserdata()
                })
                .catch((err) =>
                {
                    console.log(err)
                })

        }
        catch(err)
        {
           console.log(err)
        }

    }
    componentDidMount = () =>
    {
        
        this.fetchuserdata()
    }

    fetchuserdata = () =>
    {
        Axios.post('/profile/fetchuserdata',{name:this.context.store.username})
        .then((res) =>
        {
            this.setState({
                  userdata:res.data
            })
        })
        .catch((err) =>
        {
            console.log(err)
        });
    }

    editpage = () =>
    {
        this.props.history.push('/editpage')
    }


    render()
    {
        
        const {userdata} = this.state;
        return(
            <div className = "myblogcontainer">
               
                <div className = "profile">
                <button onClick = {this.editpage}>Edit Profile</button>
               
                   <div style = {{textAlign:"center"}}>
                       {
                           userdata.profilepath?
                           <img className = "img" src = {userdata.profilepath} alt = ""/>
                           :<img className = "img" src ="uploadprofile/1600511189252-defaultpic.jpg" alt = ""/>
                       }

                  <form onSubmit = {this.uploadfile}>
                        <label htmlFor = "file">Change Pic</label>
                        <input type = "file"
                        id = "file"
                        onChange = {this.handlefile}
                        />
                        <button type = "submit"> Save</button>

                 </form>
                       <h4>Hi! {userdata.username}</h4>
                       <h4>{userdata.college}</h4>



                        

                        <button onClick = {this.logout}>logout</button>

                   </div>
                 


              
                </div>
            </div>
        )
    }
}

export default Myblog