const fs = require("fs");
const chalk = require("chalk");

const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const success = chalk.bold.green;
const bodyNote = chalk.magenta;
const titleNote = bodyNote.bold;

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white("Your notes\n"));
  notes.forEach((note) => {
    console.log(titleNote(note.id + " - " + note.title));
    console.log(bodyNote(note.body + "\n"));
  });
};

const addNote = (id, title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.id === id);

  if (!duplicateNote) {
    notes.push({
      id: id,
      title: title,
      body: body,
    });

    saveNotes(notes);

    console.log(success("New note added!"));
  } else {
    console.log(warning("Note id taken"));
  }
};

const removeNote = (id) => {
  const notes = loadNotes();
  const notesTokeep = notes.filter((note) => note.id !== id);

  if (notesTokeep.length < notes.length) {
    saveNotes(notesTokeep);
    console.log(success("Note removed!"));
  } else {
    console.log(warning("No note not found!"));
  }
};

const readNote = (id) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.id === id);

  if (note) {
    console.log(titleNote(note.id + " - " + note.title));
    console.log(bodyNote(note.body));
  } else {
    console.log(warning("No note not found!"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
