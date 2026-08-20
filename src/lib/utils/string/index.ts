export function createTitle(filename: string | null | undefined): string {
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

export function extractDate(filename: string | null | undefined): string {
    if (!filename || typeof filename !== 'string') {
        return 'Unknown Date'
    }

    const underscoreIndex = filename.indexOf('_')
    if (underscoreIndex === -1) {
        return 'Unknown Date'
    }

    return filename.substring(underscoreIndex + 1).replace('-', ' ')
}

export function preventLastTwoWordWrap(
    string: string | null | undefined
): string {
    if (!string || typeof string !== 'string') {
        return string || ''
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

function stripFrontmatter(raw: string): string {
    return raw.replace(/^---[\r\n][\s\S]*?[\r\n]---[\r\n]?/, '')
}

function markdownParagraphs(body: string): string[] {
    const text = body
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<[A-Z][^>]*\/>/g, ' ')
        .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, ' ')

    const paragraphs: string[] = []
    let current: string[] = []

    for (const line of text.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed === '---') {
            if (current.length) {
                paragraphs.push(current.join(' '))
                current = []
            }
            continue
        }
        if (/^#{1,6}\s/.test(trimmed)) continue
        if (/^!\[/.test(trimmed)) continue
        if (/^<[a-z]/i.test(trimmed)) continue

        const cleaned = trimmed
            .replace(/^[-*+]\s+/, '')
            .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
            .replace(/[*_`~]/g, '')
            .replace(/^>\s?/, '')
            .trim()

        if (cleaned) current.push(cleaned)
    }

    if (current.length) paragraphs.push(current.join(' '))

    return paragraphs.filter((paragraph) => !/^Note:/i.test(paragraph))
}

function splitSentences(text: string): string[] {
    const matches = text.match(
        /[^.!?]+[.!?]+[)'"’”\]]*(?=\s|$)|[^.!?]+$/g
    )
    return matches?.map((sentence) => sentence.trim()).filter(Boolean) ?? []
}

export function extractPreview(
    raw: string | null | undefined,
    maxSentences = 2
): string {
    if (!raw || typeof raw !== 'string') {
        return ''
    }

    const paragraphs = markdownParagraphs(stripFrontmatter(raw))
    if (!paragraphs.length) {
        return ''
    }

    const sentences: string[] = []

    for (const paragraph of paragraphs) {
        for (const sentence of splitSentences(paragraph)) {
            sentences.push(sentence)
            if (sentences.length >= maxSentences) {
                return sentences.join(' ')
            }
        }
    }

    return sentences.join(' ')
}

interface TitleAndDate {
    title: string
    date: string
}

export function parseTitleAndDate(
    slug: string | null | undefined
): TitleAndDate {
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
