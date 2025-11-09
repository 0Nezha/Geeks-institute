const fs = require('fs');

// Load existing notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

// Save notes
const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

// Add a note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log('✅ Note added successfully!');
  } else {
    console.log('⚠️ Note already exists!');
  }
};

// Remove a note
const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);

  if (filteredNotes.length < notes.length) {
    saveNotes(filteredNotes);
    console.log('🗑️ Note removed successfully!');
  } else {
    console.log('⚠️ Note not found!');
  }
};

// List all notes
const listNotes = () => {
  const notes = loadNotes();
  console.log('📋 Your notes:');
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note.title}`);
  });
};

// Read a note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(`📖 Title: ${note.title}`);
    console.log(`📝 Body: ${note.body}`);
  } else {
    console.log('⚠️ Note not found!');
  }
};

// Export functions
module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
