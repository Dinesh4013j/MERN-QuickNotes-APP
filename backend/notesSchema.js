const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    noteTitle:String ,
    noteContent:String
})
const notemodel=mongoose.model("notes",noteSchema)
module.exports=notemodel