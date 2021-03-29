import game from "./game.js"
import render from "./render.js"
const socket = io()

function init(screen, kListener) {
    socket.on('connect', () => {
        const playerId = socket.id
        render.renderScreen(screen, { state: game.getState() }, requestAnimationFrame, playerId)
    })

    socket.on('disconnect', () => {
        kListener.unsubscribeAll()
    })

    socket.on('setup', (state) => {
        game.setState(state)
        game.setScreen(screen)
        kListener.registerPlayerId(socket.id)
        kListener.subscribe(game.movePlayer)
        kListener.subscribe(command => {
            socket.emit('move-player', command)
        })
    })

    socket.on('add-player', command => {
        game.addPlayer(command)
    })

    socket.on('remove-player', command => {
        game.removePlayer(command)
    })

    socket.on('move-player', command => {
        const playerId = socket.id
        if (command.id != playerId) {
            game.movePlayer(command)
        }
    })

    socket.on('add-fruit', command => {
        console.log(`Receiving ${command.type} -> ${command.id}`);
        game.addFruit(command)
    })

    socket.on('remove-fruit', command => {
        game.removeFruit(command)
    })

}

export default {
    init,
}
