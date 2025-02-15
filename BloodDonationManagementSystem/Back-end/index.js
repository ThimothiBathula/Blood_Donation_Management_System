const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session')
const jwt=require('jsonwebtoken')
const secretKey="THIMOTHI"
const multer=require('multer')
const path = require('path');

const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const PORT =4000;
const cors =require('cors')

app.use('/images', express.static(path.join(__dirname, 'DonersImages')));

app.use(cors())
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/users")
    .then(() => {
        console.log("MongoDB Connected Succesfully!");
    })
    .catch((error) => {
        console.log(`${error}`);
    });

const User =require('./models/User')
const Doner=require("./models/Doner")

const Admin=require("./models/Admin")
const Contact=require("./models/Contact");

app.post('/api/register', async (req, res) => {
    try {
      const { username,email, password } = req.body;
      const existingUser = await User.findOne({ username });
      const existingEmail=await User.findOne({email})
      if (existingUser || existingEmail) {
        return res.status(400).json({ message: 'Username or Email already exists.' });
      }
      const newUser = new User({ username,email, password: password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


const store = new MongoDBStore({
    uri:"mongodb://localhost:27017/users",
    collection: "mySession"
})
app.use(session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: true,
    store: store
}))
const checkAuth = (req, res, next) => {
    if (req.session.isAuthicated) {
        next()
    } else {
        res.redirect('/signup')
    }
}
const Adminauth = (req, res, next) => {
  if (req.session2.isAuthicated) {
      next()
  } else {
      res.redirect('/signup')
  }
}
app.post('/api/login', async (req, res) => {
    try {

      const {username, password} = req.body
      const user = await User.findOne({ username });
      const id=user._id
      if (!user) {
        return res.status(401).json({ message: 'Incorrect UserName or password'});
      }
      // const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect UserName or password' });
      }
      let token=jwt.sign({username,id},secretKey,{expiresIn:'1h'})
      res.status(200).json({ message: 'Authentication successful',token:token });
      req.session.isAuthicated = true
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api/users', async(req,res)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  }
);


app.put('/api/update/:id',async(req,res)=>{
  try{
    const userId = req.params.id;
    const {username,email,password} = req.body;
    
    const result = await User.updateOne({ _id: userId },{ $set: {username:username,email:email,password:password} });

    if (result.modifiedCount === 1) {
      res.status(200).json({
        message: 'User updated successfully'
      });
    } else {
      res.status(404).json({
        message: 'User not found or no changes made'
      });
     }
     } catch (err) {
    res.status(500).json({ message: 'Error updating donor', error: err });
  }
})

app.delete('/api/delete/:id',async(req,res)=>{
  try{
    const userId=req.params.id
    const result = await User.deleteOne({_id:userId});
    res.status(200).json({message:'Successfully Deleted User',response:result})
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:'Server Error'})
  }
})



const ds = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './DonersImages/');  // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Store the file with a unique name
  }
});

const upload = multer({ storage: ds });

app.post("/api/donate", upload.single('Image'), async (req, res) => {
  const token=req.headers
  const { Name, Age, Gender, Dob, Phone, Email, BloodGroup, Address, MedicalHistory, LastBloodDonate } = req.body;
  if (!req.file) {
    return res.status(400).send({ message: 'Image file is required' });
  }

  try {
    const verify= jwt.verify(token.token,secretKey)
    const username=verify.username
    const User_id=verify.id
    const user = await User.findOne({username });
      if (!user) {
        return res.status(401).json({ message: 'Please Login'});
      }
    const newDonate = new Doner({
      Image: req.file.filename,  
      Name,
      Age,
      Gender,
      Dob,
      Phone,
      Email,
      BloodGroup,
      Address,
      MedicalHistory,
      LastBloodDonate,
      User_id,
      username
    });

    await newDonate.save();
    res.status(201).send({ message: 'Submission successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error. Could not save donation.' });
  }
});

app.delete("/api/deletesub/:id",async(req,res)=>{
  try{
      const id= req.params.id
      const result= await Doner.deleteOne({_id:id})
      res.status(200).send({message:"successfully deleted",result:result})
  }
  catch(error){
    res.status(500).send({message:"server error"})
  }
})
app.get('/api/submits', async (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    const verify = jwt.verify(token, secretKey); 
    const User_id = verify.User_id; 

    const data = await Doner.find({ User_id });

    if (data.length === 0) {
      return res.status(404).send({ message: 'No data found for this user' });
    }

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server error', error: err.message });
  }
});



app.get("/api/doners",async (req,res)=>{
  try {
    const doners = await Doner.find();
    res.status(200).json(doners);
  } catch (err) {
    console.log(err);
  }
})

app.post('/api/contact',async(req,res)=>{
  const{Name,Email,Message}=req.body
  const c= new Contact({Name,Email,Message})
  await c.save()
  res.status(200).send({message:"Success"})

})

app.get('/api/contacts',async(req,res)=>{
  try{
    const contacts= await Contact.find()
    res.status(200).send(contacts)
  }
  catch(err){
    console.log(err)
  }
})





app.get('/admins',async(req,res)=>{
  try{
    const admins= await Admin.find()
    res.status(200).json(admins)
  }
  catch(err){
    res.status(500).json({message:'server Error'})
  }
  
})

app.post('/adminReg',(req,res)=>{
  const{UserName,Password}=req.body
  try{
      const newAdmin=new Admin({UserName,Password})
      newAdmin.save()
      res.status(200).send({message:"Success to create Admin"})
  }
  catch(err){
      res.status(401).send({message:'Create error'})
  }

})
app.post('/adminLog', async(req,res)=>{
  const {UserName,Password}=req.body
  try{
    const AdminUser=await Admin.findOne({UserName})
    if(!AdminUser){
      return res.status(401).json({message:'Invalid UserName or Password'})
    }
    if(Password!==AdminUser.Password){
      return res.status(401).json({message:'Invalid UseNAme or Password'})
    }
    let token=jwt.sign({UserName},secretKey,{expiresIn:'1h'})
      res.status(200).json({ message: 'Authentication successful',token:token });
  }
  catch(err){
    res.status(500).json({message:'Server Error'})
    console.log(err)
  }

})

app.get('/api/admin/doners',async(req,res)=>{
  try{
    const list= await Doner.find()
    res.status(200).send({data:list})
  }
  catch(error){
    res.status(500).send({message:'server error'})
      console.log(error)
  }
})

app.put('/api/admin/updateDoner/:id',async(req,res)=>{
  try{
      const id=req.params.id
      const { Name, Age, Gender, Dob, Phone, Email, BloodGroup, Address, MedicalHistory, LastBloodDonate } = req.body;
      const result = await Doner.updateOne({ _id: id },
        { $set: {Image: req.file.filename,Name:Name,Age:Age,Gender:Gender,Dob:Dob,Phone:Phone,
          Email:Email,BloodGroup:BloodGroup,Address:Address,MedicalHistory:MedicalHistory,
          LastBloodDonate:LastBloodDonate} });
        
      res.status(200).send({message:"Success"})
  
      }
  catch(err){
    res.status(500).send({message:'server error'})
  }
})

app.delete('/api/admin/donerDelete/:id',async(req,res)=>{
  try{
    const id=req.params.id
    const response= await Doner.findByIdAndDelete({_id:id})
    res.status(200).send({message:'Delete Success'})
  }
  catch(err){
    res.status(500).send({message:'server error'})
  }
})

app.listen(PORT,()=>{
    console.log("server running")
  })