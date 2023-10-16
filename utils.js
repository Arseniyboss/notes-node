const fs = require('fs')
const { renderNotesPage } = require('./pages.js')

const readFile = async (filename) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filename)) return resolve()
    fs.readFile(filename, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

const processUserData = (data) => {
  return decodeURIComponent(data)
    .replace(/(.*?)=(.*)/g, (m, key, value) => value)
    .replace(/\+/g, ' ')
}

const getNotes = async (filename) => {
  const data = await readFile(filename)
  if (typeof data === 'string') {
    const notes = data.split('\n')
    return renderNotesPage(notes)
  }
  return renderNotesPage([])
}

function updateNotes(filename, note) {
  fs.readFile(filename, 'utf-8', (error, data) => {
    if (!error) createNotes(filename, [data, note].join('\n'))
    else console.error(`Could not read file ${filename}.`)
  })
}

function createNotes(filename, note) {
  fs.writeFile(filename, note, (error) => {
    if (error) {
      console.error(`Could not create file ${filename}.`)
      console.error(error)
    }
  })
}

const addNote = (data) => {
  const filename = './notes.txt'
  const note = processUserData(data)
  if (fs.existsSync(filename)) {
    updateNotes(filename, note)
  } else {
    createNotes(filename, note)
  }
}

module.exports = { addNote, getNotes }
