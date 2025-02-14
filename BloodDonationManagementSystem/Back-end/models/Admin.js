const mongoose=require('mongoose')
const AdminSchema=new mongoose.Schema({
    UserName:String,
    Password:String
})

module.exports=mongoose.model('Admin',AdminSchema)