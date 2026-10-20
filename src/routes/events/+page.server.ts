import type { PageServerLoad } from './$types'
import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'
import type { Photo, ProcessedFile } from '#lib/services/imageKitNode.js'
import { parseTitleAndDate } from '#lib/utils/string/index.js'

export const prerender = true

interface EventWithImages {
    name: string
    title: string
    date: string
    count: number
    featuredImage: Photo | null
}

export const load: PageServerLoad = async () => {
    const events = await ImageKitNodeServices.listFiles({
        path: '/events/',
        type: 'folder',
    })

    const sortedEvents = events
        .filter((event) => event && event.name) // Filter out invalid events
        .map((event) => {
            const { title, date } = parseTitleAndDate(event.name)
            return {
                name: event.name!,
                title,
                date,
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Fetch every event’s images in parallel
    const eventsWithImages: EventWithImages[] = await Promise.all(
        sortedEvents.map(async (event) => {
            const images = await getImagesForEvent(event.name)
            return {
                ...event,
                count: images.length,
                featuredImage: getFeaturedImage(images),
            }
        })
    )

    return { events: eventsWithImages }
}

function getImagesForEvent(name: string | undefined): Promise<ProcessedFile[]> {
    if (!name) {
        return Promise.resolve([])
    }

    return ImageKitNodeServices.listFiles({
        path: '/events/' + name,
        type: 'file',
        sort: 'ASC_NAME',
    })
}

function getFeaturedImage(images: ProcessedFile[]): Photo | null {
    if (!Array.isArray(images) || images.length === 0) {
        return null
    }

    try {
        return ImageKitNodeServices.toPhoto(
            images.find(
                (image) => 'tags' in image && image.tags?.includes('featured')
            ) || images[0]
        )
    } catch (error) {
        console.error('Error getting featured image:', error)
        return ImageKitNodeServices.toPhoto(images[0])
    }
}
