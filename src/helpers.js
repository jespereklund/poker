export function calcScore(table) {
    let scoreIndex = -1
    let values = new Array(13).fill(0)

    //count the values of the table
    table.forEach(card => {
        values[card % 13] += 1
    })

    //console.log("values", values)

    //Jacks or better
    const betterIndexes = [0, 10, 11, 12]
    values.forEach((value, index) => {
        if (betterIndexes.includes(index) && value > 0) {
            scoreIndex = 8
        }
    })

    //2 pairs
    let pairs = 0
    values.forEach(value => {
        if (value === 2) {
            pairs += 1
        }
    })
    if (pairs === 2) {
        scoreIndex = 7
    }

    //3 and 4 of a kind
    values.forEach(value => {
        if (value === 3) {
            scoreIndex = 6
        } else if (value === 4) {
            scoreIndex = 2
        }
    })

    //full house
    let fullHouse = 0
    let done2 = false
    values.forEach(value => {
        if (value === 2 && done2 === false) {
            done2 = true
            fullHouse += 1
        }

        if (value === 3) {
            fullHouse += 1
        }
    })
    if (fullHouse === 2) {
        scoreIndex = 3
    }

    //flush (cards in same suit)
    const suit = Math.floor(table[0] / 13)
    let sameSuit = true
    table.forEach(card => {
        if (Math.floor(card / 13) != suit) {
            sameSuit = false
        }
    });
    if (sameSuit === true) {
        scoreIndex = 4
    }

    //straight (cards in order, suit irrelevant)
    let straights = 0
    values.forEach(value => {
        if (value === 1) {
            straights += 1
            if (straights === 5 || (values[0] === 1 && values[9] === 1 && values[10] === 1 && values[11] === 1 && values[12] === 1)) {
                scoreIndex = 5

                //straight flush (straight in same suit)
                if (isSameSuit(table)) {
                    scoreIndex = 1
                }
            }
        } else {
            straights = 0
        }
    })

    //royal flush (straight: 0, 9, 10, 11, 12 in same suit)
    if (values[0] === 1 && values[9] === 1 && values[10] === 1 && values[11] === 1 && values[12] === 1 && isSameSuit(table)) {
        scoreIndex = 0
    }
    //console.log("scoreIndex", scoreIndex)
    return scoreIndex
}

function isSameSuit(table) {
    const suit = Math.floor(table[0] / 13)
    let sameSuit = true
    table.forEach(card => {
        if (Math.floor(card / 13) != suit) {
            sameSuit = false
        }
    });
    return sameSuit
}
