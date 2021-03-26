function getRandomXYCollision(listPositions, {
    minRange = 0,
    maxRange = 500,
    width = 10,
    height = 10,
}) {
    let position = false
    do {

        position = getRandomXY({
            minRange: minRange,
            maxRange: maxRange,
            width: width,
            height: height
        })
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
