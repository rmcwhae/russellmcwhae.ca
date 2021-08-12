export function createTitle(filename) {
    filename = filename.substring(0, filename.indexOf('_'))
    return filename.replace(/-/g, ' ')
}

export function extractDate(filename) {
    return filename.substring(filename.indexOf('_') + 1).replace('-', ' ')
}

export function preventLastTwoWordWrap(string) {
    const words = string.split(' ')
    const firstWords = words.slice(0, -2).join(' ')
    const lastTwoWords =
        ' <span class="nowrap">' + words.slice(-2).join(' ') + '</span>'
    return firstWords + lastTwoWords
}
