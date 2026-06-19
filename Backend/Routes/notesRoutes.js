const express = require("express");
const router = express.Router();
const Notes = require("../Models/Notes");



// Create a new note (POST)
router.post("/", async (req, res) => {
  try {
    const note = new Notes(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// Get all notes (GET)
router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update a note

    router.put("/:id", async (req, res) => {
        try {
          const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return the updated document
          );
          if (!updatedNote) return res.status(404).json({ message: "Note not found" });
          res.status(200).json(updatedNote);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });


      router.delete("/:id", async (req, res) => {
        try {
          const deletedNote = await Notes.findByIdAndDelete(req.params.id);
          if (!deletedNote) return res.status(404).json({ message: "Note not found" });
          res.status(200).json({ message: "Note deleted successfully" });
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });


module.exports = router;
