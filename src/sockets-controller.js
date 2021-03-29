import * as io from 'socket.io'

function init(server, game) {
    const sockets = new io.Server(server)

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
    return sockets
}


export default init
