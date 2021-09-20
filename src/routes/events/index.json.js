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
            }
        })
        .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

    const promises = sortedEvents.map((event) => getImagesForEvent(event.name))

    const allImages = await Promise.all(promises)

    const eventsWithImages = sortedEvents.map((event, index) => {
        const images = allImages[index]
        return {
            ...event,
            count: images.length,
            featuredImage: getFeaturedImage(images),
        }
    })

    return {
        body: JSON.stringify(eventsWithImages),
    }
}

function getImagesForEvent(name) {
    return ImageKitNodeServices.listFiles({
        path: '/events/' + name,
        sort: 'ASC_NAME',
    })
}

function getFeaturedImage(images) {
    return (
        images.find((image) => image.tags && image.tags.includes('featured')) ||
        images[0]
    )
}

export function parseTitleAndDate(slug) {
    return {
        title: StringUtils.createTitle(slug),
        date: StringUtils.extractDate(slug),
    }
}
