import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import * as StringUtils from '$lib/utils/string'

export async function get() {
    const events = await ImageKitNodeServices.listFiles({
        path: '/events/',
        type: 'folder',
    })

    const sortedEvents = events
        .map((event) => {
            const { name } = event
            const { title, date } = parseTitleAndDate(name)

            return {
                ...event,
                title,
                date,
                featuredImage: '', // TODO get featured image too…
            }
        })
        .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

    return {
        body: JSON.stringify({ events: sortedEvents }),
    }
}

export function parseTitleAndDate(slug) {
    return {
        title: StringUtils.createTitle(slug),
        date: StringUtils.extractDate(slug),
    }
}
