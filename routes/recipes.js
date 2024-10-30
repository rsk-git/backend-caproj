import express from 'express';
import Recipe from "../models/Recipe.js";

const router = express.Router();

/**
 * GET /api/recipes/
 * Fetches all recipes.
 */
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/recipes/:id
 * Fetches a single recipe by ID.
 */
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/recipes
 * Creates a new recipe.
 */
router.post("/", async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  // Basic validation
  if (!title || !Array.isArray(ingredients) || ingredients.length === 0 || !instructions) {
    return res.status(400).json({ error: 'Invalid data. Please provide title, ingredients (array), and instructions.' });
  }

  try {
    const recipe = await Recipe.create({ title, ingredients, instructions });
    res.status(201).json(recipe);
  } catch (err) {
    console.error("Error creating recipe:", err); // Detailed log for debugging
    res.status(500).json({ error: 'Internal server error. Please check server logs for more details.' });
  }
});


/**
 * PUT /api/recipes/:id
 * Updates a recipe by ID.
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedRecipe) {
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/recipes/:id
 * Deletes a recipe by ID.
 */
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (recipe) {
      res.json({ message: "Recipe deleted" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
