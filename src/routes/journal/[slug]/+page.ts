import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/services/posts'
import type { PageLoad } from './$types'

export const prerender = false // Needs to be false if using a hit counter

export const load: PageLoad = async ({ params }) => {
    const { slug } = params
    const posts = await getPosts()
    const index = posts.findIndex((post) => slug === post.slug)

    if (index === -1) {
        throw error(404, 'Page not found')
    }

    const post = posts[index]
    const { title, date, description, category } = post
    
    // Load component and reading time asynchronously
    const [component, readingTime] = await Promise.all([
        post.loadComponent(),
        post.loadReadingTime()
    ])
    
    const relatedPosts = posts
        .filter((p) => p.title !== title)
        .filter((p) => p.category === category)
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
