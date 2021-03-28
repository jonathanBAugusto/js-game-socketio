import express from 'express'
import http from 'http'
import * as io from 'socket.io'
import game from './public/js/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new io.Server(server)

app.use(express.static('public'))

const handleGame = game.start()

game.subscribe(command => {
    console.log(`> Emiting ${command.type}`);
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    game.addPlayer({ id: socket.id })

    socket.emit('setup', game.getState())

    socket.on('disconnect', () => {
        game.removePlayer({ id: socket.id })
    })

    socket.on('move-player', command => {
        command.id = socket.id
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log('> Server listening on port 3000')
})
