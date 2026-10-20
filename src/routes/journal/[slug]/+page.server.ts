import { error } from '@sveltejs/kit'
import { getPosts } from '#lib/services/posts.server.js'
import type { PageServerLoad } from './$types'

export const prerender = true // Needs to be false if using a hit counter

export const load: PageServerLoad = ({ params }) => {
    const posts = getPosts()
    const post = posts.find((post) => post.slug === params.slug)

    if (!post) {
        throw error(404, 'Page not found')
    }

    const { title, date, description, category, readingTime } = post

    const relatedPosts = posts
        .filter((p) => p.title !== title)
        .filter((p) => p.category === category)
        .slice(0, 4)
        .map(({ href, title }) => ({ href, title }))

    return {
        title,
        date,
        category,
        readingTime,
        description,
        relatedPosts,
    }
}
