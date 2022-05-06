import React, {useState}  from "react";
import axios from 'axios';

const PostCreate =  () => {
  // add event handler for input whenever someone add this get's triggered.. 
  const [title,setTitle] = useState(""); // a react hook to track the state in function component 

  const onSubmit = async (event) =>{
      // prevent default submission 
      event.preventDefault();

      await axios.post("http://posts.com/posts/create",{
        title,
      });

      setTitle("");
  };
  return (
    <div>
        <form onSubmit={onSubmit}> 
            <div className="form-group">   
                <label>Title</label>
                <input 
                 value = {title} 
                 onChange ={e => setTitle(e.target.value)} 
                 className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>);

};
export default PostCreate;
 
