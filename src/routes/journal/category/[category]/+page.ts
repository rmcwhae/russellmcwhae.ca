import { getPosts } from '$lib/services/posts'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const prerender = true

export async function entries() {
    const posts = await getPosts()
    const categories = [
        ...new Set(posts.map((post) => post.category).filter(Boolean)),
    ]
    return categories.map((category) => ({ category: category! }))
}

export const load: PageLoad = async ({ params }) => {
    const { category } = params
    const posts = await getPosts()
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
