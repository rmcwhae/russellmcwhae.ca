import type { PageServerLoad } from './$types'
import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'
import type { ProcessedFile } from '#lib/services/imageKitNode.js'
import { parseTitleAndDate } from '#lib/utils/string/index.js'

export const prerender = true

type EventWithImages = ProcessedFile & {
    title: string
    date: string
    count: number
    featuredImage: ProcessedFile | null
}

export const load: PageServerLoad = async () => {
    try {
        const events = await ImageKitNodeServices.listFiles({
            path: '/events/',
            type: 'folder',
        })

        if (!Array.isArray(events)) {
            console.error(
                'Non-array response from ImageKit for events:',
                events
            )
            return { events: [] }
        }

        const sortedEvents = events
            .filter((event) => event && event.name) // Filter out invalid events
            .map((event) => {
                try {
                    const { name } = event
                    const { title, date } = parseTitleAndDate(name)
                    return {
                        ...event,
                        title,
                        date,
                    }
                } catch (error) {
                    console.error('Error processing event:', event, error)
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
                } catch (error) {
                    console.error('Error sorting events:', error)
                    return 0
                }
            })

        // Process images for each event with error handling
        const eventsWithImages: EventWithImages[] = []
        for (const event of sortedEvents) {
            try {
                const images = await getImagesForEvent(event.name)
                eventsWithImages.push({
                    ...event,
                    count: Array.isArray(images) ? images.length : 0,
                    featuredImage: getFeaturedImage(images),
                })
            } catch (error) {
                console.error(
                    'Error processing images for event:',
                    event.name,
                    error
                )
                eventsWithImages.push({
                    ...event,
                    count: 0,
                    featuredImage: null,
                })
            }
        }

        return { events: eventsWithImages }
    } catch (error) {
        console.error('Error in events load function:', error)
        return { events: [] }
    }
}

function getImagesForEvent(name: string | undefined): Promise<ProcessedFile[]> {
    if (!name) {
        return Promise.resolve([])
    }

    return ImageKitNodeServices.listFiles({
        path: '/events/' + name,
        sort: 'ASC_NAME',
    })
}

function getFeaturedImage(images: ProcessedFile[]): ProcessedFile | null {
    if (!Array.isArray(images) || images.length === 0) {
        return null
    }

    try {
        return (
            images.find(
                (image) => 'tags' in image && image.tags?.includes('featured')
            ) || images[0]
        )
    } catch (error) {
        console.error('Error getting featured image:', error)
        return images[0] || null
    }
}
