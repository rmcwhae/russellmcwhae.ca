import { error } from '@sveltejs/kit'
import { posts } from '$lib/services/posts'

export const prerender = false // Necessary for the hit counter

export async function load({ params, fetch }) {
    const { slug } = params
    const index = posts.findIndex((post) => slug === post.slug)

    if (index === -1) {
        throw error(404, 'Page not found')
    }

    const { title, date, readingTime, component, description, category } =
        posts[index]
    const relatedPosts = posts
        .filter((post) => post.title !== title)
        .filter((post) => post.category === category)
        .slice(0, 4)

    return {
        title,
        date,
        category,
        readingTime,
        description,
        relatedPosts,
        component,
    }
}
