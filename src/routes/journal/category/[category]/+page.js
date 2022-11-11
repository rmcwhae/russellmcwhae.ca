import { posts } from '$lib/services/posts'
import { error } from '@sveltejs/kit'

export const prerender = true

export async function load({ params }) {
    const { category } = params
    const filteredPosts = [...posts].filter(
        (post) => post.category === category
    )
    const allCategories = new Set(posts.map((post) => post.category))
    const otherCategories = [...allCategories].filter(
        (item) => item !== category
    )

    if (filteredPosts.length === 0) {
        throw error(404, 'Page not found')
    }

    return {
        posts: filteredPosts,
        category,
        otherCategories,
    }
}
