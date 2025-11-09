const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const y = yargs(hideBin(process.argv));
const notes = require('./notes');

// Customize yargs version
y.version('1.0.0');

// Add command
y.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Remove command
y.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// List command
y.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes();
  },
});

// Read command
y.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// Parse the arguments
y.parse();
