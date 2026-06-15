export const JOURNAL_CATEGORIES = ['Tech', 'Reflection', 'Outdoor'] as const

export const LONG_READ_MINUTES = 20

export function isLongRead(readingTime: { minutes: number } | undefined) {
    return (readingTime?.minutes ?? 0) >= LONG_READ_MINUTES
}

export const CATEGORY_META: Record<
    string,
    { description: string; color: string; colorDark: string }
> = {
    Tech: {
        description: 'Personal tech and software development.',
        color: '#4a7a9e',
        colorDark: '#90b8d8',
    },
    Outdoor: {
        description: 'Musings from wandering in the wild.',
        color: '#5a8f5a',
        colorDark: '#90c890',
    },
    Reflection: {
        description: 'Long-form personal writing.',
        color: '#7a5a9e',
        colorDark: '#b890d0',
    },
}
