import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String], // Array of strings for ingredients
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Link to user who created the recipe
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
