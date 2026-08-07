export const JOURNAL_CATEGORIES = ['Tech', 'Essays', 'Adventure'] as const

export const EDITOR_PICKS = [
    {
        slug: 'longitudinal-tech-reviews',
        title: 'Longitudinal Tech Reviews',
        description:
            'The true utility of tech products is demonstrated over longer time periods than are usually discussed.',
    },
    {
        slug: 'equilibrium',
        title: 'Equilibrium',
        description: 'How long should we pursue our dreams and passions?',
    },
    {
        slug: 'a-new-chapter',
        title: 'A New Chapter',
        description: 'Mountain-town life has finally happened.',
    },
] as const

export const LONG_READ_MINUTES = 20

export function isLongRead(readingTime: { minutes: number } | undefined) {
    return (readingTime?.minutes ?? 0) >= LONG_READ_MINUTES
}

export const CATEGORY_META: Record<
    string,
    { description: string; color: string; colorDark: string }
> = {
    Tech: {
        description: 'Living with technology',
        color: '#4a7a9e',
        colorDark: '#90b8d8',
    },
    Essays: {
        description: 'Personal reflections',
        color: '#7a5a9e',
        colorDark: '#b890d0',
    },
    Adventure: {
        description: 'The outdoor life',
        color: '#5a8f5a',
        colorDark: '#90c890',
    },
}
