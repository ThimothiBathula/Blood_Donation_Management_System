const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
    UserName:String,
    Name:String,
    Email:String,
    Message:String
})

module.exports = mongoose.model("Contact", ContactSchema)