import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
const Notes = () => {
    const [notes,setnotes]=useState([])
    const [noteTitle,setNoteTitle]=useState("")
    const [isloading,setIsloading]=useState(true)
    const [noteContent,setNoteContent]=useState("")

    useEffect(()=>{
      setIsloading(true)
      axios.get("http://localhost:3500/get")
      .then(result=>{
        setnotes(result.data)
        setIsloading(false)

      }
       )
      .catch(err=>{
        console.log(err)
        setIsloading(false)
      })
      
    }
    
    ,[])

    
     
    const notesAdd=(e)=>{
      e.preventDefault();
      setIsloading(true)
       axios.post('http://localhost:3500/add',{noteTitle:noteTitle,noteContent:noteContent})
       .then(result=>{
        setnotes([...notes,result.data])
        console.log(notes)
        setIsloading(false)
        setNoteTitle("")
        setNoteContent("")
       })
       .catch(err=>{
        console.log(err)
        setIsloading(false)
      })
    }

    const handleDelete=(id)=>{
      setIsloading(true)
      axios.delete('http://localhost:3500/delete/'+id)
      .then(result=>{location.reload(),
        setIsloading(false)
      })
      .catch(err=>console.log(err))
      
    }
  return (

    <div className='totalapp'>
      <div className="appheader">
        <div className='appheaderh'>
        <h1> QuickNotes APP </h1>
        </div>
        

        <div className='appheaderform' >
          <form action="" onSubmit={notesAdd}>
          <input type="text" placeholder='Enter title' value={noteTitle} required  onChange={(e)=>setNoteTitle(e.target.value)}/>
        <textarea type="text" placeholder='Add your notes' value={noteContent} required onChange={(e)=>setNoteContent(e.target.value) }/>
        <button type='submit'>Add NOTE</button>
          </form>
        
        </div>
       
      </div>

      <div className='appbody'>
        {
          isloading?( <p>loading itemss...</p>):(

          notes.length===0 ?( <h1 className='nopost'>There is no notes to display</h1> ) :(notes.map(note=>
          <div className='notes' key={note._id}>
            <h1 className='notestitle'>{note.noteTitle}</h1>
            <p className='notescontent'>{note.noteContent}</p>   
            
            <button className='deletebutton' onClick={()=>handleDelete(note._id)}>Delete</button> 
          </div>
          ))
        )
        }
        </div>       
    </div>

    
      
    
  )
}

export default Notes
