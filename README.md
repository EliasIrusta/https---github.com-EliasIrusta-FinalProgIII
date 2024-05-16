--------------------------------------------------------------------

para iniciar el back
cd Database
npm install
npm run migrate-dev up
npm start
--------------------------------------------------------------------


para iniciar el front

cd CentroMedico
npm install
npm run dev
-------------------------------------------------------------------


la aplicacion corre con 2 usuarios (vienen en las migraciones)

User: a@a.com
Password: 1234
es el usuario que trabaja en secretaria
-----------------------------------
User: m@m.com
Password: 1234
es un medico
----------------------------------

la aplicacion tiene cargado tambien un usuario de rol paciente para realizar 
la prueba de carga de turno.



-----------------------------------------------------------------------------

archivo .env en raiz de Database


ENV=development
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/
MONGO_URL_AUTH_ENABLED=mongodb://user:password@127.0.0.1:27017/
MONGO_DB=consultorio2

-----------------------------------------------------------------------------

crear carpeta bin
    archivo www

            #!/usr/bin/env node
/* eslint-disable no-undef */

// Module dependencies.
const app = require('../app')
const debug = require('debug')('base-api-express-generator:server')
const http = require('http')
const figlet = require('figlet')
const mongoose = require('mongoose')
const pkg = require('../package.json')

const env_path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
require('dotenv').config({ path: env_path })

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// Create HTTP server.
const server = http.createServer(app)

const db_url =  'mongodb://127.0.0.1:27017/' //process.env.MONGO_URL ||
const db_name =  'consultorio2'//process.env.MONGO_DB ||

// MongoDB database initialization
initDatabase()
  .then(() => console.log('Database connection established successfully!'))
  .catch((err) => console.log(err))

async function initDatabase() {
  await mongoose.connect('mongodb://127.0.0.1:27017/consultorio2', { useNewUrlParser: true, useUnifiedTopology: true });
}

// Listen on provided port, on all network interfaces.
server.listen(port, printTitle())
server.on('error', onError)
server.on('listening', onListening)

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

// Prints the app title and more specifications
function printTitle() {
  process.stdout.write('\n')
  process.stdout.write(`${figlet.textSync(`Base API`, { font: 'Ogre' })}\n`)
  process.stdout.write('\n')
  process.stdout.write(
    `Version: ${pkg.version}, Environment: ${process.env.NODE_ENV || 'default'}\n`,
  )
  if (process.env !== 'production') {
    process.stdout.write(`Listening on port ${port}\n`)
  }
}



