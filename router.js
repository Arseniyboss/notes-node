const { defaultPage } = require('./pages.js')
const { addNote, getNotes } = require('./utils.js')

const router = async (request, response) => {
  const { url, method } = request
  response.setHeader('Content-Type', 'text/html')

  if (url === '/') {
    const notes = await getNotes('./notes.txt')
    return response.end(notes)
  }

  if (url === '/note/add' && method === 'POST') {
    const data = []

    request.on('data', (chunk) => data.push(chunk.toString()))
    request.on('end', () => addNote(data))
    response.writeHead(302, { Location: '/' })

    const notes = await getNotes('./notes.txt')
    return response.end(notes)
  }

  response.statusCode = 404
  response.end(defaultPage)
}

module.exports = router
