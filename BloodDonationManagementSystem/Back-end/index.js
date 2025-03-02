const express = require('express');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const secretKey="THIMOTHI"
const AdminSecretKey="Admin"
const multer=require('multer')
const path = require('path');
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


/*user operations*/
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
  
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


const UserTokenVerify = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.User_id;
    next();
  });
}

app.post("/api/login", async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: "User does not exist. Please register first." });
      }
      if (user.password !== password) {
          return res.status(401).json({ message: "Incorrect username or password" });
      }
      const token = jwt.sign({ username, id: user._id }, secretKey, { expiresIn: "1h" });

      return res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
});





const ds = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './DonersImages/');  // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Store the file with a unique name
  }
});

const upload = multer({ storage: ds });

app.post("/api/donate",UserTokenVerify, upload.single('Image'), async (req, res) => {
  const token=req.headers
  const { Name, Age, Phone, Email, BloodGroup, LastBloodDonate } = req.body;
  if (!req.file) {
    return res.status(400).send({ message: 'Image file is required' });
  }

  try {
    const verify= jwt.verify(token.token,secretKey)
    const username=verify.username
    const User_id=verify.id
    const user = await User.findOne({username});
      if (!user) {
        return res.status(401).json({ message: 'Please Login'});
      }
    const newDonate = new Doner({
      Image: req.file.filename,  
      Name,
      Age,
      Phone,
      Email,
      BloodGroup,
      LastBloodDonate,
      User_id,
      username
    });

    await newDonate.save();
    return res.status(201).send({ message: 'Submission successful!' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error. Could not save donation.' });
  }
});

app.delete('/api/submits/delete/:id',UserTokenVerify,async (req,res)=>{
  try{
    const id= req.params.id
    const result= await Doner.deleteOne({_id:id})
    return res.status(200).send({message:"successfully deleted",result:result})
  } 
  catch(err){
    console.error("Error fetching submissions:", err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
})
app.get('/api/submits', UserTokenVerify, async (req, res) => {
  try {
    const token=req.headers.token
    const verify= jwt.verify(token,secretKey)
    const User_id=verify.id
    const data = await Doner.find({ User_id: User_id });
    if (data.length === 0) {
      return res.status(200).json({ message: 'No data found for this user', data: [] });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});



app.get("/api/doners",UserTokenVerify,async (req,res)=>{
  try {
    const doners = await Doner.find();
    return res.status(200).json(doners);
  } catch (err) {
    return res.status(500).json({message:"server error"});
  }
})

app.post('/api/contact',async(req,res)=>{
  const{Name,Email,Message}=req.body
  const c= new Contact({Name,Email,Message})
  await c.save()
  return res.status(200).send({message:"Success"})

})



/* Admin Auth*/
const AdminTokenVerify = (req, res, next) => {
  const token = req.headers.token
  // console.log(token)
  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }
  jwt.verify(token, AdminSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid or expired token');
    }
    req.user = decoded;
    next();
  });
};
app.get('/api/contacts',AdminTokenVerify,async(req,res)=>{
  try{
    const contacts= await Contact.find()
    return res.status(200).send(contacts)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:"server error"});
  }
})
app.delete("/api/deletesub/:id",UserTokenVerify,async(req,res)=>{
  try{
      const id= req.params.id
      const result= await Doner.deleteOne({_id:id})
      return res.status(200).send({message:"successfully deleted",result:result})
  }
  catch(error){
    return res.status(500).send({message:"server error"})
  }
})

app.put('/api/update/:id',async(req,res)=>{
  try{
    const userId = req.params.id;
    const {username,email,password} = req.body;
    
    const result = await User.updateOne({ _id: userId },{ $set: {username:username,email:email,password:password} });

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        message: 'User updated successfully'
      });
    } else {
      return res.status(404).json({
        message: 'User not found or no changes made'
      });
     }
     } catch (err) {
      return res.status(500).json({ message: 'Error updating donor', error: err });
  }
})

app.delete('/api/delete/:id',async(req,res)=>{
  try{
    const userId=req.params.id
    const result = await User.deleteOne({_id:userId});
    return res.status(200).json({message:'Successfully Deleted User',response:result})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:'Server Error'})
  }
})


app.get('/api/users',AdminTokenVerify, async(req,res)=>{
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"server error"});
  }
}
);

/*User token verify*/
app.get('/user/token/verify', (req, res) => {
  try {
    const UserToken = req.headers['token'];

    if (!UserToken) {
      return res.status(403).send('Access denied. No token provided.');
    }

    jwt.verify(UserToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
      }
      return res.status(200).send("success");
    });
  } catch (err) {
    return res.status(500).send({ message: 'Server error' });
  }
});

app.get('/admins',AdminTokenVerify,async(req,res)=>{
  try{
    const admins= await Admin.find()
    return res.status(200).json(admins)
  }
  catch(err){
    return res.status(500).json({message:'server Error'})
  }
  
})

app.post('/adminReg',AdminTokenVerify,(req,res)=>{
  try{
    const{UserName,Password}=req.body
      const newAdmin=new Admin({UserName,Password})
      newAdmin.save()
      return res.status(200).send({message:"Success to create Admin"})
  }
  catch(err){
    return res.status(401).send({message:'Create error'})
  }

})
app.delete('/admin/delete/:id',AdminTokenVerify,async(req,res)=>{
  try{
    const id= req.params.id
    const result= await Admin.deleteOne({_id:id})
    console.log(result)
    if(result['acknowledged']==true){
      return res.status(200).send({message:"Admin Deleted Sucessfull"})
    }
    return res.status(400).send({message:"User Not Found"})
  }catch(err){
    return res.status(500).send({message:"server Error"})
  }
})

app.put('/admin/update/:id',AdminTokenVerify,async(req,res)=>{
  try{
    const userId=req.params.id;
    const {UserName,Password} = req.body;
    const result = await Admin.updateOne({ _id: userId },
      { $set: {UserName:UserName,Password:Password} });

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        message: 'User updated successfully'
      });
    } else {
      return res.status(404).json({
        message: 'User not found or no changes made'
      });
    } 
  }
  catch(err){
    return res.status(500).send({message:"Server Error"})
  }
})
app.post('/adminLog', async(req,res)=>{
  try{
    const {UserName,Password}=req.body
    const AdminUser=await Admin.findOne({UserName})
    if(!AdminUser){
      return res.status(401).json({message:'Invalid UserName or Password'})
    }
    if(Password!==AdminUser.Password){
      return res.status(401).json({message:'Invalid UseNAme or Password'})
    }
    let token=jwt.sign({UserName},AdminSecretKey,{expiresIn:'1h'})
    return res.status(200).json({ message: 'Authentication successful',token:token });
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:'Server Error'})
   
  }

})


/*View Doners Data By Admin*/
app.get('/admin/token/verify',(req,res)=>{
  try{
      const AdminToken=req.headers['token']
      if (!AdminToken) {
        return res.status(403).send('Access denied. No token provided.');
      }
      jwt.verify(AdminToken, AdminSecretKey, (err, decoded) => {
        if (err) {
          return res.status(401).send({message:'Invalid or expired token'});
        }
      })
      return res.status(200).send("success")
  }
  catch(err){
    return res.status(500).send({message:'server error'})
  }
})
app.get('/api/admin/doners',AdminTokenVerify,async(req,res)=>{
  try{
    const list= await Doner.find()
    return res.status(200).send({data:list})
  }
  catch(error){
    console.log(error)
    return res.status(500).send({message:'server error'})
      
  }
})

/*Donar Updation By Admin*/
app.put('/api/admin/updateDoner/:id',AdminTokenVerify,async(req,res)=>{
  try{
      const id=req.params.id
      const { Name, Age, Gender, Dob, Phone, Email, BloodGroup, Address, MedicalHistory, LastBloodDonate } = req.body;
      const result = await Doner.updateOne({ _id: id },
        { $set: {Name:Name,Age:Age,Gender:Gender,Dob:Dob,Phone:Phone,
          Email:Email,BloodGroup:BloodGroup,Address:Address,MedicalHistory:MedicalHistory,
          LastBloodDonate:LastBloodDonate} });
        
          return res.status(200).send({message:"Success"})
  
      }
  catch(err){
    return res.status(500).send({message:'server error'})
  }
})

/*Doner Deletion By the Admin*/
app.delete('/api/admin/donerDelete/:id',AdminTokenVerify,async(req,res)=>{
  try{
    const id=req.params.id
    const response= await Doner.findByIdAndDelete({_id:id})
    return res.status(200).send({message:'Delete Success'})
  }
  catch(err){
    return res.status(500).send({message:'server error'})
  }
})



app.listen(PORT,()=>{
    console.log("server running")
  })