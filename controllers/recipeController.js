import Recipe from "../models/Recipe";

export const createRecipe = async (req,res) => {
    const{title, ingredients, instructions} = req.body;

    try{
        const newRecipe = new Recipe({title, ingredients, instructions});
        await newRecipe.save();
        res.status(201).json(newRecipe);
    }catch (error){
        console.log('Error creating recipe:', error)
    }
};