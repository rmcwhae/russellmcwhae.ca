export const posts = Object.entries(
    import.meta.globEager('/content/journal/*.md')
)
    .map(([, post]) => {
        return {
            // frontmatter data
            ...post.metadata,
            href: '/journal/' + post.metadata.slug,
            // the processed Svelte component from the markdown file
            component: post.default,
        }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
