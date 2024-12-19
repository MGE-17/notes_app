import express from "express";
import fs from "fs";

const router = express.Router();
const notesFilePath = "./data/notes.json";

// 📝 Get all notes
router.get("/", (req, res) => {
  try {
    const notesBuffer = fs.readFileSync(notesFilePath);
    const notes = JSON.parse(notesBuffer);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error reading notes file", error });
  }
});

// 📝 Get a specific note by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const notesBuffer = fs.readFileSync(notesFilePath);
    const notes = JSON.parse(notesBuffer);
    const note = notes.find((note) => note.id === id);

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading notes file", error });
  }
});

router.post("/", (req, res) => {
  const newNote = req.body;

  try {
    const notesBuffer = fs.readFileSync(notesFilePath);
    const notes = JSON.parse(notesBuffer);

    // Find the maximum ID in the notes list
    const maxId = Math.max(...notes.map(note => parseInt(note.id, 10)));

    // Assign the next available ID (maxId + 1)
    newNote.id = (maxId + 1).toString();
    
    notes.push(newNote);

    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error saving new note", error });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;

  try {
    const notesBuffer = fs.readFileSync(notesFilePath);
    const notes = JSON.parse(notesBuffer);
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex !== -1) {
      notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
      fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
      res.status(200).json(notes[noteIndex]);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});

// 🗑️ Delete a note
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const notesBuffer = fs.readFileSync(notesFilePath);
    const notes = JSON.parse(notesBuffer);
    const updatedNotes = notes.filter((note) => note.id !== id);

    if (updatedNotes.length !== notes.length) {
      fs.writeFileSync(notesFilePath, JSON.stringify(updatedNotes, null, 2));
      res.status(200).json({ message: "Note deleted" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

export default router;