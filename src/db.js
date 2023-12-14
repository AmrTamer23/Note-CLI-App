import fs from "node:fs/promises";

const DB_PATH = "./db.json";

export async function readDB() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data));
}

export async function insertDB(note) {
  const db = await readDB();
  db.notes.push(note);
  await writeDB(db);
  return note;
}
