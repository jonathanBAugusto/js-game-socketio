
import keyboardListener from './keyboard-listener.js'
import socket from './socket.js'
import game from './game.js'
import render from './render.js'

function init() {
    const screen = document.querySelector('#screen')

    const kListener = keyboardListener.createKeyboardListener(document)

    socket.init(screen, kListener, game, render)
}

init()

