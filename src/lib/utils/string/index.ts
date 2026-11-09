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
    const matches = text.match(/[^.!?]+[.!?]+[)'"’”\]]*(?=\s|$)|[^.!?]+$/g)
    return matches?.map((sentence) => sentence.trim()).filter(Boolean) ?? []
}

export function extractPreview(raw: string, maxSentences = 2): string {
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

/** Splits an event folder name like `Name-Of-Event_Month-YEAR` */
export function parseTitleAndDate(slug: string): TitleAndDate {
    const underscoreIndex = slug.indexOf('_')

    if (underscoreIndex === -1) {
        return { title: slug.replace(/-/g, ' '), date: 'Unknown Date' }
    }

    return {
        title: slug.substring(0, underscoreIndex).replace(/-/g, ' '),
        date: slug.substring(underscoreIndex + 1).replace('-', ' '),
    }
}
