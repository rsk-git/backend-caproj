import User from '../models/User.js';
import jwt from 'jsonwebtoken'// for token generation

export const loginUser = async(req,res)=> {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: 'Invalid username or password'});
        }
        if(user.password!==password){
            return res.status(400).json({message:'Invalid username or password'});
        }
            // generating JWT token
            const token = jwt.sign({id: user_id}, process.env.JWT_SECRET,{expiresIn:'30min'});
            
            // sending userinfo and token response
            res.json({
                token,
                username: user.username,
                picture:user.picture || 'default -picture-url'
            });
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }

};