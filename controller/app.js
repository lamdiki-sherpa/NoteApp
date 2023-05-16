const Note=require('../model/app')
const create=async(req,res)=>{
try{
const note=await Note.create(req.body)
res.status(200).json({note})
}
catch(error){
res.status(500).json({msg:error})
}

}
const read=async(req,res)=>{
    const note=await Note.find()
    res.json({note,count:note.length})
}

const remove=async(req,res)=>{
try{
 const {id:noteID}=req.params
 const note=await Note.findByIdAndRemove({_id:noteID})
 if(!note){
    return  res.status(404).json({msg:`no note with id ${noteID}`})
 }
 res.json({note,msg:'deleted successfully'})

}
catch (error) {
    res.status(500).json({msg:error})
    }
 
}
const update=async(req,res)=>{
    try {
        const {id:noteID} = req.params
        const note = await Note.findOneAndUpdate({_id:noteID},req.body,{
            new:true,
            runValidators:true
        })
        if(!note){
           return  res.status(404).json({msg:`No note with id ${noteID}`})
        }
        res.status(201).json({note})
    } catch (error) {
    res.status(500).json({msg:error})
    }
   }


module.exports={create,read,remove,update}