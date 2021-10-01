export const posts = Object.entries(
    import.meta.globEager('/content/journal/*.md')
)
    .map(([, post]) => ({
        // frontmatter data
        ...post.metadata,
        // the processed Svelte component from the markdown file
        component: post.default,
    }))
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
