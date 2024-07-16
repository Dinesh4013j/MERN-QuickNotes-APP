const express=require('express')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const notemodel=require('./notesSchema')
mongoose.connect('mongodb://127.0.0.1:27017/notestest')
const PORT=process.env.PORT||3500;
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>res.send("dsll"))
app.post('/add',(req,res)=>{
    const noteTit=req.body.noteTitle;
    console.log(req.body)
    const noteCon=req.body.noteContent;
    notemodel.create({
        noteTitle:noteTit,
        noteContent:noteCon
    })
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.get('/get',(req,res)=>{
    notemodel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err));
})

app.delete("/delete/:id",(req,res)=>{
    const {id}=req.params;
    notemodel.deleteOne({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))  
})


app.listen(PORT,()=>console.log(`app running on ${PORT}`)) 