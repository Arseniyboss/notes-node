const http = require('http')
const router = require('./router')

const server = http.createServer(router)

const port = 3000
const hostname = '127.0.0.1'

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
