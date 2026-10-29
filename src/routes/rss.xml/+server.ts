import { getPosts } from '#lib/services/posts.server.js'

export const prerender = true

// Prerendering runs on a placeholder origin, so URLs use the live one
const origin = 'https://russellmcwhae.ca'

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

export function GET() {
    const posts = getPosts()

    const items = posts
        .map((post) => {
            const url = origin + post.href
            const category = post.category
                ? `\n            <category>${escapeXml(post.category)}</category>`
                : ''

            return `        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>${category}
            <description>${escapeXml(post.description || post.preview)}</description>
        </item>`
        })
        .join('\n')

    const lastBuildDate = posts[0]
        ? `\n        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>`
        : ''

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Russell’s Portfolio » Journal</title>
        <link>${origin}/journal</link>
        <description>Writing by Russell McWhae</description>
        <language>en-ca</language>${lastBuildDate}
        <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
${items}
    </channel>
</rss>
`

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    })
}
