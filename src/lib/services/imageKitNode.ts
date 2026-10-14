import ImageKit from '@imagekit/nodejs'
import { IMAGEKIT_PRIVATE_KEY } from '$app/env/private'

const CONFIG_OPTIONS = { privateKey: IMAGEKIT_PRIVATE_KEY }
let client: ImageKit | null = null

function getClient(): ImageKit {
    if (client) {
        return client
    }

    client = new ImageKit(CONFIG_OPTIONS)

    return client
}

export type ImageKitItem = ImageKit.File | ImageKit.Folder

/** An ImageKit file or folder, with a path for either and a lightbox flag */
export type ProcessedFile = ImageKitItem & {
    filePath: string
    photoswipe: boolean
}

function isFile(item: ImageKitItem): item is ImageKit.File {
    return 'filePath' in item && typeof item.filePath === 'string'
}

export async function listFiles(
    options: ImageKit.AssetListParams
): Promise<ProcessedFile[]> {
    try {
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
        })

        const listPromise = getClient().assets.list(options)

        const items = await Promise.race([listPromise, timeoutPromise])

        if (!Array.isArray(items)) {
            console.error('ImageKit returned non-array response:', items)
            return []
        }

        return items.map((item) => {
            const file = isFile(item)
            const filePath = file
                ? (item.filePath ?? '')
                : ('folderPath' in item && item.folderPath) || ''
            return {
                ...item,
                filePath,
                photoswipe: file,
            }
        })
    } catch (error) {
        console.error('Error in listFiles:', error)
        // Return empty array instead of throwing to prevent server crashes
        return []
    }
}
