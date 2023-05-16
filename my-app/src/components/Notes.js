import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Form from './Form'
import Modal from './Modal'
import '../App.css'
const Notes = () => {
  const [note,setNote]=useState([])
  const [modal,setModal]=useState(false)
  const [editId,setEditId]=useState('')
const handleNote=async()=>{
try {
  const response = await Axios.get('/api/v1/note');
  const { note } = response.data;
  setNote(note);
  console.log(note)
    } catch (error) {
      console.log(error.response);
    }
 
}
useEffect(()=>{
    handleNote()
},[])
const handleRemove=async(_id)=>{
  try {
     await Axios.delete(`/api/v1/note/${_id}`);
    setNote((prevnote)=>prevnote.filter((note)=>note._id!==_id))
  } catch (error) {
    console.log(error.response);
  }
}
const handleUpdate =async(_id)=>{
setModal(!modal)
console.log(_id);
setEditId(_id)


}
const updateNotes = (newNote) => {
  setNote((prevNote) => [...prevNote,newNote]);
 
};
  return (
    <>
    <Form updateNotes={updateNotes} />
    {modal && <div>
      <Modal handleUpdate={handleUpdate} editId={editId} note={note} setNote={setNote}/>
      </div>}
    <div className="container mt-3 mb-3">
    <div className="row justify-content-center">
    <div className="col-md-10">
        <h2>Your Notes</h2>
       
          {note.length===0?<h4>No notes to show...</h4>:note.map((notes) => {
            const { _id, title, description } = notes;
            return (
              <div key={_id} className='mt-3'>
                <h5>{title}</h5>
                <p>{description}</p>
               
                <button className='btn btn-primary' onClick={()=>handleUpdate(_id)}>Edit</button>
                <button className='btn btn-danger mx-2' onClick={() => handleRemove(_id)}>Remove</button>
                
              </div>
            );
          })}
        
           
         
      
    </div>
    </div>
    </div>
    </>
  )
}

export default Notes