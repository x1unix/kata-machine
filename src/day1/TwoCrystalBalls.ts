export default function two_crystal_balls(breaks: boolean[]): number {
    // breaks = makeProxiedArray(breaks)
    const len = breaks.length
    const jmpAmount = Math.floor(Math.sqrt(len))

    let i = jmpAmount
    for (; i < len; i += jmpAmount) {
        if (breaks[i]) {
            break
        }
    }

    i -= jmpAmount
    for (let j = 0; j < jmpAmount && i < len; ++j, ++i) {
        if (breaks[i]) {
            return i
        }
    }

    return -1
}
