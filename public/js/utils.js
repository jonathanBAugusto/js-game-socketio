function getRandomXYCollision(
    listPositions,
    {
        minRangeX = 0,
        minRangeY = 0,
        maxRangeX = 10,
        maxRangeY = 10,
        width = 1,
        height = 1,
    } = {
            minRangeX: 0,
            minRangeY: 0,
            maxRangeX: 10,
            maxRangeY: 10,
            width: 1,
            height: 1,
        }
) {
    let position = false;
    do {
        position = getRandomXY({
            minRangeX: minRangeX,
            minRangeY: minRangeY,
            maxRangeX: maxRangeX,
            maxRangeY: maxRangeY,
            width: width,
            height: height,
        });
        if (listPositions) {
            Object.keys(listPositions).forEach((key) => {
                if (
                    position.x == listPositions[key].x &&
                    position.y == listPositions[key].y
                ) {
                    position = false;
                }
            });
        }
    } while (!position);

    return position;
}

function getRandomXY(
    {
        minRangeX = 0,
        minRangeY = 0,
        maxRangeX = 10,
        maxRangeY = 10,
        width = 1,
        height = 1,
    } = {
            minRangeX: 0,
            minRangeY: 0,
            maxRangeX: 10,
            maxRangeY: 10,
            width: 1,
            height: 1,
        }
) {
    let x = Math.floor(Math.random() * (maxRangeX - minRangeX) + minRangeX);
    let y = Math.floor(Math.random() * (maxRangeY - minRangeY) + minRangeY);

    x = x + width > maxRangeX ? x - (x + width - maxRangeX) : x;
    y = y + height > maxRangeY ? y - (y + width - maxRangeY) : y;

    return {
        x,
        y,
    };
}

function populatePlayerAndFruits(game) {
    const player = getRandomXYCollision(game.state.players);
    if (player) {
        game.addPlayer({ id: "player1", x: player.x, y: player.y });
    }
    for (let i = 0; i < 10; i++) {
        let list = game.state.players;
        list = Object.assign(list, game.state.players);

        const fruit = getRandomXYCollision(game.state.players);

        game.addFruit({ id: `fruit${i + 1}`, x: fruit.x, y: fruit.y });
    }
}

export default {
    getRandomXY,
    getRandomXYCollision,
    populatePlayerAndFruits,
};
