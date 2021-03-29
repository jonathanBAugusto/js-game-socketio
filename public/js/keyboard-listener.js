function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null,
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function unsubscribeAll() {
        state.observers = []
    }

    function notifyAll(command) {
        state.observers.forEach(obs => obs(command))
    }

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(e) {
        const keyPressed = e.key

        const command = {
            id: state.playerId,
            keyPressed,
        }

        notifyAll(command)
    }

    return {
        registerPlayerId,
        subscribe,
        unsubscribeAll,
    }
}

export default {
    createKeyboardListener
};
