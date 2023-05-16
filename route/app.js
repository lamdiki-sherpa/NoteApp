const express=require('express')
const router= express.Router()
const {create,read,remove,update}=require('../controller/app')
router.route('/').get(read).post(create)
router.route('/:id').delete(remove).patch(update)

module.exports=router