

function renderScreen(screen, game, requestAnimationFrame, currentPlayer) {
    const context = screen.getContext('2d')
    context.clearRect(0, 0, 100, 70)

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        context.fillStyle = playerId == currentPlayer ? '#DD20CC' : 'black'

        context.fillRect(player.x, player.y, 1, 1)
    }

    requestAnimationFrame(() => { renderScreen(screen, game, requestAnimationFrame, currentPlayer) })
}

export default {
    renderScreen,
}
