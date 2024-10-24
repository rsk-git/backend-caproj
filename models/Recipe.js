import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            
          },

          ingredients: {
            type: String,
            required: true,
            
          },
          instructions: {
            type: String,
            required: true,
            
          },

        }
    )

    const Recipe = new mongoose.model('Recipe', recipeSchema);
export default Recipe;