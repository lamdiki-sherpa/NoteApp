const mongoose=require('mongoose')

const NoteSchema=new mongoose.Schema({
title:{
    type:String,
    require:true
},
description:{
    type:String
}
},{timestamps:true})

module.exports=mongoose.model('Note',NoteSchema)