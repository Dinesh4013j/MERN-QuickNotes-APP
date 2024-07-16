import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3500/get")
      .then(result => {
        setNotes(result.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const notesAdd = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isEditing && editNoteId) {
      axios.put(`http://localhost:3500/edit/${editNoteId}`, { noteTitle, noteContent })
        .then(result => {
          const updatedNotes = notes.map(note => note._id === editNoteId ? result.data : note);
          setNotes(updatedNotes);
          resetForm();
          location.reload()
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      axios.post('http://localhost:3500/add', { noteTitle, noteContent })
        .then(result => {
          setNotes([...notes, result.data]);
          setNoteTitle("");
          setNoteContent("");
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios.delete('http://localhost:3500/delete/' + id)
      .then(() => {
        setNotes(notes.filter(note => note._id !== id));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    setEditNoteId(id);
    const editingNote = notes.find(note => note._id === id);
    if (editingNote) {
      setNoteTitle(editingNote.noteTitle);
      setNoteContent(editingNote.noteContent);
    }
  };

  const resetForm = () => {
    setNoteTitle("");
    setNoteContent("");
    setIsEditing(false);
    setEditNoteId(null);
  };

  return (
    <div className='totalapp'>
      <div className="appheader">
        <div className='appheaderh'>
          <h1> QuickNotes APP </h1>
        </div>

        <div className='appheaderform'>
          <form onSubmit={notesAdd}>
            <input
              type="text"
              placeholder='Enter title'
              value={noteTitle}
              required
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <textarea
              type="text"
              placeholder='Add your notes'
              value={noteContent}
              required
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button type='submit'>{isEditing ? "Edit Note" : "Add Note"}</button>
          </form>
        </div>
      </div>

      <div className='appbody'>
        {
          isLoading ? (<p>Loading items...</p>) : (
            notes.length === 0 ? (<h1 className='nopost'>There are no notes to display</h1>) : (
              notes.map(note =>
                <div className='notes' key={note._id}>
                  <h1 className='notestitle'>{note.noteTitle}</h1>
                  <p className='notescontent'>{note.noteContent}</p>
                  <button onClick={() => handleEdit(note._id)}>Edit Note</button>
                  <button className='deletebutton' onClick={() => handleDelete(note._id)}>Delete</button>
                </div>
              )
            )
          )
        }
      </div>
    </div>
  );
};

export default Notes;
