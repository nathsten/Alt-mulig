// @ts-check

/**
 * @param {Object} a
 * @param {Object} b
 * @returns {number} avstand mellom a&b
 */
const dist = (a,b) => {
    const x1 = a.x;
    const x2 = b.x;
    const y1 = a.y;
    const y2 = b.y;

    const deltaX = Math.abs(x1 - x2);
    const deltaY = Math.abs(y1 - y2);

    let avstand = Math.sqrt(deltaX**2 + deltaY**2);

    return avstand;
}

const avA = {
    x: 120,
    y: 84
}

const avB = {
    x: 180,
    y: 90
}

console.log(dist(avA, avB));
