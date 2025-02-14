const mongoose=require('mongoose')
const donerSchema=new mongoose.Schema({
    Image:String,
    Name:String,
    Age:String,
    Gender:String,
    Dob:String,
    Phone:String,
    Email:String,
    BloodGroup:String,
    Address:String,
    MedicalHistory:String,
    LastBloodDonate:String,
    User_id:String,
    username:String
    // user:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'user'
    //     }
    // ]
    
})

module.exports = mongoose.model("Doner", donerSchema)