import express from "express";
import User from "../models/User.js";
import {loginUser} from '../controllers/userController.js'

const router = express.Router();

/**
 * GET /api/users/
 */

router.get('/', async(req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({error: error.message});
    }
});

/**
 * GET /api/users/:id
 */

router.get("/:id", async(req,res) => {
    try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "User not found"});
}catch (error){
res.status(500).json({error: error.message});
}
});

/**
 * POST /api/user @description create a new user
 */
router.post("/", async(req,res) =>{
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});
/**
 * POST /api/users/login
 */
router.post('/login', async (req,res) => {
    try {
        await loginUser(req,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
})

/**
 * PUT /api/users/:id
 */
router.put("/:id", async (req,res) =>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,});
            if(!updatedUser) 
                {return res.status(404).json({error: "User not found"})}
            res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * DELETE /api/user/:id
 */

router.delete("/:id", async(req,res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

export default router;