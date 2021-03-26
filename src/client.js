let game = {}
let escapeOn = false
function renderScreen(context, game) {
    context.fillStyle = 'white'
    context.fillRect(0, 0, 100, 100)
    for (const playerId in game.players) {
        const player = game.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.fruits) {
        const fruit = game.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
}

function getGameInstance() {
    const game = {}
    const playersQt = 2
    const fruitsQt = 1
    game.players = {}

    for (let i = 0; i < playersQt; i++) {
        game.players['player' + (i + 1)] = getRandomXYCollision(game.players || [], { maxRange: 100, width: 1, height: 1 })
    }
    game.fruits = {}
    for (let i = 0; i < fruitsQt; i++) {
        let list = game.players
        list = Object.assign(list, game.fruits)
        game.fruits['fruit' + (i + 1)] = getRandomXYCollision(list, { maxRange: 100, width: 1, height: 1 })
    }

    return game;
}

function getRandomXYCollision(listPositions, {
    minRange = 0,
    maxRange = 500,
    width = 10,
    height = 10,
}) {
    let position = false
    do {

        position = getRandomXY({ minRange: minRange, maxRange: maxRange, width: width, height: height })
        Object.keys(listPositions).forEach(key => {

            if (position.x == listPositions[key].x && position.y == listPositions[key].y) {
                position = false
            }
        })
    } while (!position)

    return position
}

function getRandomXY({
    minRange = 0,
    maxRange = 500,
    width = 10,
    height = 10,
} = {
        minRange: 0,
        maxRange: 500,
        width: 10,
        height: 10,
    }) {

    let x = Math.round(Math.random() * (maxRange - minRange) + minRange)
    let y = Math.round(Math.random() * (maxRange - minRange) + minRange)

    x = (x + width) > maxRange ? x - ((x + width) - maxRange) : x
    y = (y + height) > maxRange ? y - ((y + width) - maxRange) : y

    return {
        x,
        y,
    }
}



function init() {
    const screen = document.querySelector('#screen')
    const context = screen.getContext('2d')
    game = getGameInstance()

    const gameLoop = setInterval(() => {
        context.fill
        renderScreen(context, game)
    }, 60)

    document.querySelector('#btnStop').addEventListener('click', () => {
        clearInterval(gameLoop)
    })

}
