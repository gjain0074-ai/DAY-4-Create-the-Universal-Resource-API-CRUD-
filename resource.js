const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");

// CREATE Resource
router.post("/", async (req, res) => {
  try {
    const newResource = new Resource({
      ...req.body,
      createdBy: req.userId // from middleware
    });

    const saved = await newResource.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all resources of logged-in user
router.get("/", async (req, res) => {
  try {
    const data = await Resource.find({ createdBy: req.userId });
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single resource
router.get("/:id", async (req, res) => {
  try {
    const item = await Resource.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!item) return res.status(404).json({ message: "Not found" });

    res.json(item);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE resource
router.put("/:id", async (req, res) => {
  try {
    const updated = await Resource.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not allowed" });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE resource
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resource.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!deleted) return res.status(404).json({ message: "Not allowed" });

    res.json({ message: "Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
