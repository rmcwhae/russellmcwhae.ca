import { execSync } from 'child_process'
import type { PageServerLoad } from './$types'

export const prerender = true

export const load: PageServerLoad = () => {
    let lastUpdated: string | null = null
    try {
        const raw = execSync(
            'git log --format="%ai" -n 1 -- src/lib/data/reading-list.ts',
            { encoding: 'utf8' }
        ).trim()
        if (raw) lastUpdated = raw.split(' ')[0]
    } catch {
        // not in a git repo or no commits yet
    }
    return { lastUpdated }
}
