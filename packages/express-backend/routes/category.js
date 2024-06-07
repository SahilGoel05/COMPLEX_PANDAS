// routes/category.js
import express from "express";
import Category from "../models/category.js";
import Task from "../models/task.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/dev", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const categories = await Category.find({ creator: userId });
    res.json(categories);
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  if (!name) {
    return res.status(400).send({ error: "Name is required." });
  }

  const existingCategory = await Category.findOne({ name, creator: userId });
  if (existingCategory) {
    return res.status(400).send({ error: "Category name already exists." });
  }

  const category = new Category({
    name,
    creator: userId,
  });

  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      creator: req.user.userId,
    });

    if (!category) {
      return res.status(404).send();
    }

    await Task.deleteMany({ category: req.params.id });

    res.send(category);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
