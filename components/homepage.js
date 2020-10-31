import Axios from 'axios';
import React from 'react';
import Data from './usercontext/usercontext';
import Reactplayer from 'react-player'

class Home extends React.Component
{
    static contextType = Data;
    constructor(props)
    {
        super(props);
        this.state = {
            file:'',
            desc:'',
            db:[]

        }
    }

    componentDidMount = () =>
    {
        this.fetchpost();
    }

    fetchpost = () =>
    {
        Axios.get('post/fetchevent')
        .then((res) =>
        {
            
             this.setState({
                 db:res.data
             })
            
        })
        .catch((err) =>
        {
            console.log(err)
        })
    }

   

    handlefile = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.files[0]
        })
    }

   
   submit = async(e) =>
   {
      try{
          e.preventDefault();
          const data  = new FormData();
          data.append('pic',this.state.file);
          data.append('desc',this.state.desc);
          data.append('username',this.context.store.username);
          data.append('date',new Date())
          Axios.post('/post/newpost',data)
          .then((res) =>
          {
            this.fetchpost();
          })
          .catch((err) =>
          {
              console.log(err)
          })

      }
      catch(err)
      {

      }
   }

   handleChange = (e) =>
   {
       this.setState({
           [e.target.name]:e.target.value
       })
   }

    render()
    {
        const {desc,db} = this.state;
        return(
            <div className = "homepagecontainer">
                <div className = "homepage">
                    
                 
                <form onSubmit = {this.submit}>
                <h1>Start Here!</h1>
                    <input
                    type = "text"
                    placeholder = "Start here by writing something..."
                    name = "desc"
                    value = {desc}
                    onChange = {this.handleChange}
                    />
                    <br/>
                    <input
                    type = "file"
                    id = "file"
                    name = "file"
                    onChange = {this.handlefile}
                    />
                    <label htmlFor = "file">Photo</label>
                    <label htmlFor = "file">Video</label>
                    <button type = "submit">Post</button>
                </form>

                    <h4>Latest posts</h4>
                    

                    {
                    db.length?
                    db.map(i =>(
                        <div className = "posts" key = {i._id}>
                        <h4>Posted by : {i.username}</h4><p style = {{fontSize:"10px"}}>On:{i.date}</p>
                        <p>{i.desc}</p>

                        {
                            i.picPath?
                           <div style = {{ textAlign:"center"}} >
                                <img style = {{objectFit:"cover"}} height = "200px" src = {i.picPath} alt = ""/>
                               </div>
                            :<Reactplayer controls  url = {i.vidPath} />
                        }
                      

                        </div>
                    ))
                   
                        :null
                    }
             </div>

            
            </div>
        )
    }
}

export default Home;