export function createTitle(filename) {
    if (!filename || typeof filename !== 'string') {
        return 'Untitled'
    }

    const underscoreIndex = filename.indexOf('_')
    if (underscoreIndex === -1) {
        return filename.replace(/-/g, ' ')
    }

    filename = filename.substring(0, underscoreIndex)
    return filename.replace(/-/g, ' ')
}

export function extractDate(filename) {
    if (!filename || typeof filename !== 'string') {
        return 'Unknown Date'
    }

    const underscoreIndex = filename.indexOf('_')
    if (underscoreIndex === -1) {
        return 'Unknown Date'
    }

    return filename.substring(underscoreIndex + 1).replace('-', ' ')
}

export function preventLastTwoWordWrap(string) {
    if (!string || typeof string !== 'string') {
        return string
    }

    const words = string.split(' ')
    if (words.length <= 2) {
        return string
    }

    const firstWords = words.slice(0, -2).join(' ')
    const lastTwoWords =
        ' <span class="nowrap">' + words.slice(-2).join(' ') + '</span>'
    return firstWords + lastTwoWords
}

export function parseTitleAndDate(slug) {
    if (!slug || typeof slug !== 'string') {
        return {
            title: 'Untitled',
            date: 'Unknown Date',
        }
    }

    try {
        return {
            title: createTitle(slug),
            date: extractDate(slug),
        }
    } catch (error) {
        console.error('Error parsing title and date from slug:', slug, error)
        return {
            title: 'Untitled',
            date: 'Unknown Date',
        }
    }
}
