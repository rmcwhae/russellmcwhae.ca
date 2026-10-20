import ImageKit from '@imagekit/nodejs'
import { IMAGEKIT_PRIVATE_KEY } from '$app/env/private'
import { building, dev } from '$app/env'
import { placeholderFor } from './placeholders.js'

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

/**
 * An ImageKit file or folder, with a path for either, a lightbox flag, and
 * a blurred placeholder data URI for images
 */
export type ProcessedFile = ImageKitItem & {
    filePath: string
    photoswipe: boolean
    placeholder?: string
}

function isFile(item: ImageKitItem): item is ImageKit.File {
    return 'filePath' in item && typeof item.filePath === 'string'
}

/** Shares in-flight and settled listings across prerendered pages */
const cache = new Map<string, Promise<ProcessedFile[]>>()

export function listFiles(
    options: ImageKit.AssetListParams
): Promise<ProcessedFile[]> {
    if (!building) {
        return fetchFiles(options)
    }

    const key = JSON.stringify(options)
    let result = cache.get(key)

    if (!result) {
        result = fetchFiles(options)
        cache.set(key, result)
        // Drop failures so a retry isn’t served the same rejection
        result.catch(() => cache.delete(key))
    }

    return result
}

async function fetchFiles(
    options: ImageKit.AssetListParams
): Promise<ProcessedFile[]> {
    // Local dev can run without ImageKit credentials; builds can’t
    if (!IMAGEKIT_PRIVATE_KEY && dev) {
        console.warn('IMAGEKIT_PRIVATE_KEY is not set; listing no files')
        return []
    }

    try {
        const items = await getClient().assets.list(options, {
            timeout: 10000,
        })

        if (!Array.isArray(items)) {
            throw new Error(
                `ImageKit returned a non-array response: ${JSON.stringify(items)}`
            )
        }

        return await Promise.all(
            items.map(async (item) => {
                const file = isFile(item)
                const filePath = file
                    ? (item.filePath ?? '')
                    : ('folderPath' in item && item.folderPath) || ''
                const placeholder =
                    file && item.width && item.height
                        ? await placeholderFor({ ...item, filePath })
                        : undefined
                return {
                    ...item,
                    filePath,
                    photoswipe: file,
                    ...(placeholder && { placeholder }),
                }
            })
        )
    } catch (error) {
        // Fail builds and prerendering loudly rather than ship empty pages
        if (!dev) {
            throw error
        }

        console.error('Error in listFiles:', error)
        return []
    }
}
