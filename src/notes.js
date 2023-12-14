import { readDB, writeDB, insertDB } from "./jsonFileStorage.js";

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
