import util from './utils.js'

const state = {
    players: {},
    fruits: {},
    screen: {
        height: 10,
        width: 10,
    },
}

const observers = []

function start() {
    return setInterval(addFruit, 5000)
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

const acceptedMoves = {
    ArrowUp: (player) => {
        player.y - 1 >= 0 && player.y--
    },
    ArrowDown: (player) => {
        player.y + 1 < state.screen.height && player.y++
    },
    ArrowLeft: (player) => {
        player.x - 1 >= 0 && player.x--
    },
    ArrowRight: (player) => {
        player.x + 1 < state.screen.width && player.x++
    },
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

function addFruit(command) {
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
    const moveFunction = acceptedMoves[keyPressed]

    if (player && moveFunction) {
        moveFunction(player)
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
}
