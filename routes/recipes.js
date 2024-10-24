import { Router } from "express";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

const router = new Router();

/**
 * GET /api/recipes/
 * @description
 * fetches all recipes.
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
 * POST /api/recipes/@ description create a new recipe
 */

router.post("/", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /api/recipes/:id
 */

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/recipes/:id
 */

router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true,
        });
    if (updatedRecipe) 
        res.json({updatedRecipe});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/recipes/:id
 */

router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});


export default router;