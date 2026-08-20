import type { PageServerLoad } from './$types'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

export const prerender = true

export const load: PageServerLoad = async () => {
    try {
        const folders = await ImageKitNodeServices.listFiles({
            path: '/events/',
            type: 'folder',
        })

        const sortedFolders = folders
            .filter((folder) => folder && folder.name)
            .map((folder) => {
                const { name } = folder
                const { date } = parseTitleAndDate(name)
                return { name, date, year: new Date(date).getFullYear() }
            })
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            )

        const years = sortedFolders
            .map((folder) => folder.year)
            .filter((year) => !Number.isNaN(year))

        const expeditionYearRange =
            years.length > 0
                ? { min: Math.min(...years), max: Math.max(...years) }
                : null

        let expeditionImage = null
        const mostRecent = sortedFolders[0]
        if (mostRecent) {
            const images = await ImageKitNodeServices.listFiles({
                path: '/events/' + mostRecent.name,
                sort: 'ASC_NAME',
            })
            expeditionImage =
                images.find(
                    (image) => image.tags && image.tags.includes('featured')
                ) ||
                images[0] ||
                null
        }

        return {
            expeditionCount: folders.length,
            expeditionYearRange,
            expeditionImage,
        }
    } catch (error) {
        console.error('Error loading expedition summary:', error)
        return {
            expeditionCount: null,
            expeditionYearRange: null,
            expeditionImage: null,
        }
    }
}
