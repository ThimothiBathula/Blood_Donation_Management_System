const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
    Name:String,
    Email:String,
    Message:String
})

module.exports = mongoose.model("Contact", ContactSchema)