import express from 'express'
import http from 'http'
import game from './public/js/game.js'
import socketsController from './src/sockets-controller.js'

const app = express()
const server = http.createServer(app)
const sockets = socketsController(server, game);

app.use(express.static('public'))

const handleGame = game.start()

game.subscribe(command => {
    console.log(`> Emiting ${command.type}`);
    sockets.emit(command.type, command)
})



server.listen(3000, () => {
    console.log('> Server listening on port 3000')
})
