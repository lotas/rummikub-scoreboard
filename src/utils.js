export function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/**
 * find next element after the given one
 * @param {Object} elm {name: <String>}
 * @param {Array} array
 */
export function next(elm, array) {
    if (!elm || !elm.name) {
        return array[0];
    }

    let idx = 0;
    for (; idx < array.length; idx++) {
        if (array[idx].name === elm.name) {
            break;
        }
    }

    return array[(idx + 1) % (array.length)];
}


/**
 *
 */
export function updateScore(current, tiles, score) {
    const name = current.name;
    let newScore = Object.assign({}, score);

    if (!newScore[name]) {
        newScore[name] = [];
    }

    let turnTotal = 0;
    for (let tileStr in tiles) {
        if (!tiles[tileStr]) {
            continue;
        }
        let [, tile] = tileStr.split(':');
        turnTotal += parseInt(tile, 10);
    }

    newScore[name].push(turnTotal);

    return newScore;
}
