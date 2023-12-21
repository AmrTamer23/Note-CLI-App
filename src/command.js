import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  addNote,
  findNotes,
  getAllNotes,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { startServer } from "./server.js";

const listNotes = (notes) => {
  notes.forEach((note) => {
    console.log("\n");
    console.log("id: ", note.id);
    console.log("tags: ", note.tags.join(", ")),
      console.log("note: ", note.content);
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        describe: "The note content",
      });
    },
    (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = addNote(argv.note, tags);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags for the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const match = await findNotes(argv.filter);
      listNotes(match);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      await removeNote(argv.id).then((id) => {
        console.log(`Note with id ${id} removed`);
      });
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 7777,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      startServer(notes);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes removed");
    }
  )
  .demandCommand(1)
  .parse();
