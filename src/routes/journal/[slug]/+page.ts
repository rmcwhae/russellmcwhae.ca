import { error } from '@sveltejs/kit'
import type { Component } from 'svelte'
import type { PageLoad } from './$types'

export const prerender = true

// One lazy chunk per post, so a page only downloads its own component
const postModules = import.meta.glob('/content/journal/*.md') as Record<
    string,
    () => Promise<{ default: Component }>
>

export const load: PageLoad = async ({ params, data }) => {
    const loadPost = postModules[`/content/journal/${params.slug}.md`]

    if (!loadPost) {
        throw error(404, 'Page not found')
    }

    const { default: component } = await loadPost()

    return {
        ...data,
        component,
    }
}
