import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import recipesRouter from './routes/recipes.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1018;

// ----Connecting to DB---
try {await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}catch(error) {
console.error(error);
}

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



// ---Error handling middlewares --

app.use((e,req,res,next) => {
    console.log(e);
    res.status(500).json({message: e.message, error:e});
});

app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))