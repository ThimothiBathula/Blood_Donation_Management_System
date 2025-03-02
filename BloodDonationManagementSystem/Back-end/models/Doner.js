const mongoose=require('mongoose')
const donerSchema=new mongoose.Schema({
    Image:String,
    Name:String,
    Age:String,
    Phone:String,
    Email:String,
    BloodGroup:String,
    LastBloodDonate:String,
    User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    
})

module.exports = mongoose.model("Doner", donerSchema)