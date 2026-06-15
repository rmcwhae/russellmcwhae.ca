import type { PageServerLoad } from './$types'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

export const prerender = true

interface EventWithImages {
    name: string
    title: string
    date: string
    count: number
    featuredImage: {
        name: string
        filePath: string
        width: number
        height: number
    } | null
    [key: string]:
        | string
        | number
        | {
              name: string
              filePath: string
              width: number
              height: number
          }
        | null
        | undefined
}

export const load: PageServerLoad = async () => {
    try {
        const events = await ImageKitNodeServices.listFiles({
            path: '/events/',
            type: 'folder',
        })

        if (!Array.isArray(events)) {
            return { events: [] }
        }

        const sortedEvents = events
            .filter((event) => event && event.name)
            .map((event) => {
                try {
                    const { name } = event
                    const { title, date } = parseTitleAndDate(name as string)
                    return { ...event, title, date }
                } catch {
                    return {
                        ...event,
                        title: 'Untitled Event',
                        date: 'Unknown Date',
                    }
                }
            })
            .sort((a, b) => {
                try {
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                } catch {
                    return 0
                }
            })

        const eventsWithImages: EventWithImages[] = []
        for (const event of sortedEvents) {
            try {
                const images = await ImageKitNodeServices.listFiles({
                    path: '/events/' + event.name,
                    sort: 'ASC_NAME',
                })
                const featuredImage =
                    (Array.isArray(images) &&
                        (images.find(
                            (img) => img.tags && img.tags.includes('featured')
                        ) ||
                            images[0])) ||
                    null
                eventsWithImages.push({
                    ...event,
                    count: Array.isArray(images) ? images.length : 0,
                    featuredImage,
                })
            } catch {
                eventsWithImages.push({
                    ...event,
                    count: 0,
                    featuredImage: null,
                })
            }
        }

        return { events: eventsWithImages }
    } catch {
        return { events: [] }
    }
}
