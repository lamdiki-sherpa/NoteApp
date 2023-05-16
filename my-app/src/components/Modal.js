import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../App.css'
const Modal = ({handleUpdate,editId,note,setNote}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const noteToEdit = note.find((val) => val._id === editId);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
    }
  }, [editId, note]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (id) => {
    try {
      await axios.patch(`/api/v1/note/${id}`, { title, description });
      handleUpdate(id);
      setNote(
        note.map((val) => {
          return val._id === id
            ? {
                _id: id,
                title:title,
                description:description
              }
            : val;
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
  <div className='section'>
  <div className='overlay'>
  <form style={{border:'2px solid #ced4da',borderRadius:'10px',padding:"10px",width:'50%'}} 
  className='modal-content'
  onSubmit={(event) => {
    event.preventDefault();
    handleSubmit(editId);
  }}>
  <div className="mb-3">
    <input type="text" 
    className="form-control" 
    name='title' 
    placeholder='Title'
    value={title}
    onChange={handleTitleChange}
    />
  </div>
  <div className="mb-3">
     <label className="form-label">Description</label>
    <textarea className="form-control" 
    name="description" 
    rows='3' 
    placeholder='Enter your description'
    value={description}
    onChange={handleDescriptionChange}
    />
  </div>
  <button type="submit" className="btn btn-dark">Edit Notes</button>
</form>
</div>
    </div>
  )
}

export default Modal