const yargs = require('yargs')
const notes = require('./notes.js')
const note = require('./notes.js')

yargs.version('1.1.0')

// if(process.argv.length < 3)
//     console.log('Hint: node app.js --help')

// Add a note
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        },
        TTL: {
            describe: 'Time to live',
            type: 'number'
        }
    },
    handler(argv) {
       note.addNote(argv.title, argv.body, argv.TTL)
    }
})

// Remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },  
    handler(argv) {
        notes.removeNotes(argv.title);
    }
})

// Read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.readNote(argv.title);
    }
})

// List notes
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler () {
        note.listNotes()
    }
})

yargs.command({
    command: '*',
    describe: 'handles other commands',
    handler () {
        console.log('Invalid Command!')
        console.log('Hint: node app.js --help')
    }
})

yargs.parse()