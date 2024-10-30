import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import recipesRouter from './routes/recipes.js';
import usersRouter from './routes/users.js';
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ----Connecting to DB---
async function connectDB(){
try {await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}catch(error) {
console.error(error);
}}

// call the connectDB function
connectDB();

// ---Middlewares---
app.use(morgan('dev')); // it's a logger
app.use(express.json());// parse data to the body
app.use(express.urlencoded({extended:true}));
// cors allows backend to talk to frontend in the same machine
app.use(cors());

// ---Routes---

app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);

app.get('/', (req,res) =>{
    res.send('Welcome to recipes world')
});
app.post('/login', async(req,res)=>{
    const{username, password} = req.body;

    // validation logic
    const user = await User.findOne({username}); //if user already exists in the database
    if (!user || user.password != password){
        return res.status(400).strictContentLength({message: 'Invalid username or password'});
    }
      
        {
        res.json({
            token:'sample-token',//generating token
            email: req.email ||'simple_email@sample.com',
            username: req.username,
            picture: 'user_picture || default_picture_url'
        });
    }
})


// ---Error handling middlewares --

app.use((e,req,res,next) => {
    console.log(e);
    res.status(500).json({message: e.message, error:e});
});

app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))