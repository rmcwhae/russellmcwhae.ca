import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

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
    }
    [key: string]:
        | string
        | number
        | {
              name: string
              filePath: string
              width: number
              height: number
          }
        | undefined
}

export const GET: RequestHandler = async () => {
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
            return json([])
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

        return json(eventsWithImages)
    } catch (error) {
        console.error('Error in events API:', error)
        return json([])
    }
}

function getImagesForEvent(name: string): Promise<
    Array<{
        filePath: string
        url?: string
        [key: string]: string | number | boolean | undefined
    }>
> {
    if (!name) {
        return Promise.resolve([])
    }

    return ImageKitNodeServices.listFiles({
        path: '/events/' + name,
        sort: 'ASC_NAME',
    })
}

function getFeaturedImage(
    images: Array<{
        filePath: string
        url?: string
        [key: string]: string | number | boolean | undefined
    }>
): {
    name: string
    filePath: string
    width: number
    height: number
} | null {
    if (!Array.isArray(images) || images.length === 0) {
        return null
    }

    try {
        return (
            images.find(
                (image) => image.tags && image.tags.includes('featured')
            ) || images[0]
        )
    } catch (error) {
        console.error('Error getting featured image:', error)
        return images[0] || null
    }
}
