import util from './utils.js'
import Player from './player.js'

const state = {
    players: {},
    fruits: {},
    score: {},
    screen: {
        height: 10,
        width: 10,
    },
    playerSize: {
        height: 1,
        width: 1,
    }

}

const observers = []

function start() {
    return setInterval(addFruit, 250)
}

function stop(handle) {
    clearInterval(handle)
}

function subscribe(observerFunction) {
    observers.push(observerFunction)
}

function notifyAll(command) {
    observers.forEach(obs => obs(command))
}

function setScreen(emlScreen) {
    emlScreen.setAttribute('width', state.screen.width)
    emlScreen.setAttribute('height', state.screen.height)
    emlScreen.classList.remove('d-none')
}

function addPlayer(command) {
    let x = 0
    let y = 0
    if (!('x' in command) || !('y' in command)) {
        const randPosition = util.getRandomXYCollision({ ...state.players, ...state.fruits })
        x = randPosition.x
        y = randPosition.y
    } else {
        x = command.x
        y = command.y
    }

    state.players[command.id] = {
        x: x,
        y: y,
    }

    notifyAll({
        type: 'add-player',
        id: command.id,
        x: x,
        y: y,
    })
}

function removePlayer(command) {
    delete state.players[command.id]
    notifyAll({
        type: 'remove-player',
        id: command.id,
    })
}

function haveSpace() {
    const spaces = (state.screen.height / state.playerSize.height) * (state.screen.width / state.playerSize.width)
    const qtdeElements = Object.keys({ ...state.fruits, ...state.players }).length

    return spaces > qtdeElements
}

function addFruit(command) {
    if (!haveSpace()) {
        notifyAll({
            type: 'none',
        })
        return
    }

    let id = command && 'id' in command ? command.id : Math.floor(Math.random() * 999999)
    let x = 0
    let y = 0
    if (!command || !('x' in command) || !('y' in command)) {
        const randPosition = util.getRandomXYCollision({ ...state.players, ...state.fruits })
        x = randPosition.x
        y = randPosition.y
    } else {
        x = command.x
        y = command.y
    }

    state.fruits[id] = {
        x: x,
        y: y,
    }

    notifyAll({
        type: 'add-fruit',
        id,
        x,
        y,
    })
}

function removeFruit(command) {
    delete state.fruits[command.id]
    notifyAll({
        type: 'remove-fruit',
        command,
    })
}

function movePlayer(command) {

    const player = state.players[command.id]
    const keyPressed = command.keyPressed
    const moveFunction = Player.acceptedMoves[keyPressed]

    if (player && moveFunction) {
        moveFunction(player, state)
        checkForFruitCollision(command.id)
    }

    notifyAll(command)
}

function checkForFruitCollision(playerId) {
    const player = state.players[playerId]
    for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId]
        if (player.x === fruit.x && player.y === fruit.y) {
            removeFruit({
                id: fruitId
            })

        }
    }
}

function setState(newState) {
    Object.assign(state, newState)
}

function getState() {
    return state
}

export default {
    checkForFruitCollision,
    addPlayer,
    movePlayer,
    removePlayer,
    addFruit,
    removeFruit,
    setState,
    getState,
    subscribe,
    start,
    stop,
    setScreen,
}
