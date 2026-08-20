import { getPosts } from '$lib/services/posts'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async () => {
    const posts = await getPosts()

    const totalWordCount = posts.reduce((acc, post) => {
        return acc + post.readingTime.words
    }, 0)

    const writingSinceYear = posts.reduce(
        (earliestYear, post) => {
            const year = new Date(post.date).getFullYear()
            return year < earliestYear ? year : earliestYear
        },
        new Date(posts[0]?.date ?? Date.now()).getFullYear()
    )

    const categoryCounts = posts.reduce(
        (acc, post) => {
            if (post.category) {
                acc[post.category] = (acc[post.category] ?? 0) + 1
            }
            return acc
        },
        {} as Record<string, number>
    )

    return {
        posts,
        totalWordCount,
        essayCount: posts.length,
        writingSinceYear,
        categoryCounts,
    }
}
