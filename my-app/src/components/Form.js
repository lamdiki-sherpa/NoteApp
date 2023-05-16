import React,{useState} from 'react'
import axios from 'axios'

const Form = ({ updateNotes }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
const submitHandler=async(e)=>{
e.preventDefault()
try {
    const response = await axios.post('/api/v1/note',{
        title,
        description
    });
    const { note } = response.data;
    console.log(note)
    updateNotes(note);
    setTitle('');
    setDescription('');
  } catch (error) {
    console.log(error.response);
  }

}
  return (
<div className="container mt-3 mb-3">
<div className="row justify-content-center">
<div className="col-md-10">
<form style={{border:'2px solid #ced4da',borderRadius:'10px',padding:"20px"}}
 onSubmit={submitHandler}>
  <div className="mb-3">
    <input type="text" 
    className="form-control" 
    name='title' 
    placeholder='Title'
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    required
    />
  </div>
  <div className="mb-3">
     <label className="form-label">Description</label>
    <textarea className="form-control" 
    name="description" 
    rows='3' 
    placeholder='Enter your description'
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    required
    />
  </div>
  <button type="submit" className="btn btn-dark">Add Notes</button>
</form>

</div>
</div>
</div>
  )
}

export default Form