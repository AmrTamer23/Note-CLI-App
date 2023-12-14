import { readDB, writeDB, insertDB } from "./db.js";

export const addNote = async (note, tags) => {
  const newNote = {
    id: Date.now(),
    content: note.content,
    tags,
  };
  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const db = await readDB();
  const { notes } = db;
  return notes;
};

export const findNotes = async (filter) => {
  const db = await readDB();
  const { notes } = db;
  return notes.filter((note) => note.content.toLowerCase().includes(filter));
};

export const removeNote = async (id) => {
  const db = await readDB();
  const { notes } = db;
  const match = notes.find((note) => note.id === id);
  if (!match) {
    throw new Error(`Note with id ${id} not found`);
  } else {
    const newNotes = notes.filter((note) => note.id !== id);
    await writeDB({ notes: newNotes });
    return newNotes;
  }
};

export const removeAllNotes = () => writeDB({ notes: [] });
