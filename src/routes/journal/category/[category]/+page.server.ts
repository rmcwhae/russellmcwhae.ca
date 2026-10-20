import { getPosts } from '#lib/services/posts.server.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const prerender = true

export function entries() {
    const categories = [
        ...new Set(
            getPosts()
                .map((post) => post.category)
                .filter(Boolean)
        ),
    ]
    return categories.map((category) => ({ category: category! }))
}

export const load: PageServerLoad = ({ params }) => {
    const { category } = params
    const posts = getPosts()
    const filteredPosts = posts.filter((post) => post.category === category)
    const allCategories = new Set(
        posts.map((post) => post.category).filter(Boolean)
    )
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
