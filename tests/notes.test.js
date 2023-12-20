import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  readDB: jest.fn(),
  writeDB: jest.fn(),
}));

const { insertDB, readDB, writeDB } = await import("../src/db.js");

const { addNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  readDB.mockClear();
  writeDB.mockClear();
});

test("insert note", async () => {
  const noteTitle = "test body";
  const tags = ["test title", "test title2"];
  const note = {
    content: noteTitle,
    tags: tags,
    id: Date.now(),
  };
  insertDB.mockResolvedValue(note);
  const result = await addNote(noteTitle, tags);
  expect(result).toEqual(note);
});
