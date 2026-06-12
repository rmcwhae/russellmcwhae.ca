export const JOURNAL_CATEGORIES = ['Tech', 'Reflection', 'Outdoor'] as const

export const LONG_READ_MINUTES = 20

export function isLongRead(readingTime: { minutes: number } | undefined) {
    return (readingTime?.minutes ?? 0) >= LONG_READ_MINUTES
}
