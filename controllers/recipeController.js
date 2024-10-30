// importing the Recipe model to interact with the database
import Recipe from "../models/Recipe";

// Controller to create a new recipe
export const createRecipe = async (req,res) => {
    const{title, ingredients, instructions} = req.body;

    try{
        // Create new recipe document using the Recipe model
        const newRecipe = new Recipe({title, ingredients, instructions});
        // Saving new recipe to the database
        await newRecipe.save();
        res.status(201).json(newRecipe);
    }catch (error){
        // log an error
        console.log('Error creating recipe:', error)
    }
};