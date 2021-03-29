const actions = {
    toUp: (player, state) => {
        if (player.y - 1 >= 0) {
            player.y--
        } else {
            player.y = state.screen.height - 1
        }
    }, toDown: (player, state) => {
        if (player.y + 1 < state.screen.height) {
            player.y++
        } else {
            player.y = 0
        }
    },
    toLeft: (player, state) => {
        if (player.x - 1 >= 0) {
            player.x--
        } else {
            player.x = state.screen.width - 1
        }
    },
    toRight: (player, state) => {
        if (player.x + 1 < state.screen.width) {
            player.x++
        } else {
            player.x = 0
        }
    },
}

const acceptedMoves = {
    ArrowUp: actions.toUp,
    ArrowDown: actions.toDown,
    ArrowLeft: actions.toLeft,
    ArrowRight: actions.toRight,
    w: actions.toUp,
    s: actions.toDown,
    a: actions.toLeft,
    d: actions.toRight,
}

export default {
    acceptedMoves,
    actions,
}
