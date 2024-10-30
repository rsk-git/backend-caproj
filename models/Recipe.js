import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        ingredients: {
            type: [String], // Change to array of strings
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
