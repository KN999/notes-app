const fs = require('fs')
const chalk = require('chalk')
const NodeTtl = require('node-ttl')
const ttl = new NodeTtl()

// Add a note
const addNote = (title, body, TTL=5000) => {
    const notes = loadNotes();
    const duplicateNotes = notes.find((note) => note.title === title)
    const timeStamp = Math.round(+new Date()/1000);

    if(!duplicateNotes) {
        notes.push({
            title: title, 
            body: body,
            ttl: parseInt(timeStamp+TTL)
        })  
        
        saveNotes(notes)
        
        console.log(chalk.inverse.green('Note added successfully '));
    }
    else {
        console.log(chalk.inverse.red('Note\'s title taken'));
    }
}

// Remove a note
const removeNotes = (title) => {
    const timeStamp = Math.round(+new Date()/1000);
    const notes = loadNotes()
    const updatedNotes = notes.filter( (note) => note.title !== title)
    const findNote = notes.filter( (note) => note.title === title)

    if(updatedNotes.length !== notes.length) {
        // check for ttl validity
        if(findNote[0].ttl < timeStamp)
        return console.log("Time expired for this note to remove it!")

        saveNotes(updatedNotes); 
        console.log(chalk.inverse.green('Removed note was : ', title))
    }
    else {
        console.log(chalk.inverse.red('No note with this title exist'))
    }
}

// Read a note
const readNote = (title) => {
    const timeStamp = Math.round(+new Date()/1000);
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note) {
        if(note.ttl < timeStamp)
        return console.log("Time expired for this note to read!")

        console.log(note)
    }
    else {
        console.log(chalk.red.inverse('Note note found'));
    }
}

// List all notes
const listNotes = () => {
    const notes = loadNotes();

    const result = [];
    notes.forEach(note => {
        console.log(chalk.blue.inverse(note.title))
    });

    return result;
}

// Save notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

// Load all the notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e) {
        return []
    }
    
}

const checkNote = (title) => {
    return console.log("title : ",ttl.get(title))
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote,
    checkNote: checkNote
}
