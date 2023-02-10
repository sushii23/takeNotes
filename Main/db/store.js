const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
  async getNotes() {
    try {
      const data = await readFile('db/db.json', 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async addNote({ title, text }) {
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };
    const notes = await this.getNotes();
    await writeFile('db/db.json', JSON.stringify([...notes, newNote]));
    return newNote;
  }

  async removeNote(id) {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    await writeFile('db/db.json', JSON.stringify(filteredNotes));
  }
}

module.exports = new Store();
