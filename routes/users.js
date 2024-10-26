import express from "express";



const router = express.Router();

/**
 * GET /api/users
 */

router.get('/', async(req,res) => {
    try {
        const users = await User.find();
        res.join(users);
    } catch (error) {
        res.status(500).json({error: err.message});
    }
});

/**
 * GET /api/users/:id
 */

router.get("/:id", async(req,res) => {
    try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "User not found"});
}catch (err){
res.status(500).json({error: err.message});
}
});

/**
 * POST /api/user @description create a new user
 */
router.post("/", async(req,res) =>{
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

/**
 * PUT /api/user/:id
 */
router.put("/", async (req,res) =>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,});
            if(updatedUser) res.json({updatedUser});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * DELETE /api/user/:id
 */

router.delete("/", async(req,res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})

export default router;