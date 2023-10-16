const defaultPage = `
  <html>
    <head>
      <title>Notes</title>
    </head>
    <body>
      <h1>This page is not available!</h1>
      <h2>Take me <a href="/">home</a></h2>
    </body>
  </html>
`

const renderNotesPage = (notes) => {
  return `
    <html>
      <head>
        <title>Notes</title>
      </head>
      <body>
        <form action="/note/add" method="POST">
          <input type="text" name="note" autofocus />
          <button type="submit">Add Note</button>
        </form>
        <ul>
          ${notes.map((note) => `<li>${note}</li>`).join('')}
        </ul>
      </body>
  </html>
`
}

module.exports = { defaultPage, renderNotesPage }
