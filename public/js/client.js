
import keyboardListener from "./keyboard-listener.js"
import socket from "./socket.js"


function init() {
    const screen = document.querySelector("#screen")

    const kListener = keyboardListener.createKeyboardListener(document)

    socket.init(screen, kListener)
}

init()
