import ImageKit from '@imagekit/nodejs'
import { IMAGEKIT_PRIVATE_KEY } from '$env/static/private'

const CONFIG_OPTIONS = {
    privateKey: IMAGEKIT_PRIVATE_KEY,
}

let client: ImageKit | null = null

function getClient(): ImageKit {
    if (client) {
        return client
    }

    client = new ImageKit(CONFIG_OPTIONS)

    return client
}

interface ImageKitFile {
    filePath: string
    url?: string
    [key: string]: string | number | boolean | undefined
}

interface ProcessedFile extends ImageKitFile {
    photoswipe: boolean
}

interface ListFilesOptions {
    path?: string
    skip?: number
    limit?: number
    sort?: string
    type?: string
    fileType?: string
    searchQuery?: string
    [key: string]: string | number | boolean | undefined
}

function isFile(item: {
    filePath?: string
    folderPath?: string
}): item is { filePath: string; url?: string; [key: string]: unknown } {
    return 'filePath' in item && typeof item.filePath === 'string'
}

export async function listFiles(
    options: ListFilesOptions
): Promise<ProcessedFile[]> {
    try {
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
        })

        const listPromise = getClient().assets.list({
            path: options.path as string | undefined,
            skip: options.skip as number | undefined,
            limit: options.limit as number | undefined,
            sort: options.sort as
                | 'ASC_NAME'
                | 'DESC_NAME'
                | 'ASC_CREATED'
                | 'DESC_CREATED'
                | 'ASC_UPDATED'
                | 'DESC_UPDATED'
                | 'ASC_HEIGHT'
                | 'DESC_HEIGHT'
                | 'ASC_WIDTH'
                | 'DESC_WIDTH'
                | 'ASC_SIZE'
                | 'DESC_SIZE'
                | 'ASC_RELEVANCE'
                | 'DESC_RELEVANCE'
                | undefined,
            type: options.type as 'file' | 'folder' | 'all' | undefined,
            fileType: options.fileType as
                | 'all'
                | 'image'
                | 'non-image'
                | undefined,
            searchQuery: options.searchQuery as string | undefined,
        })

        const items = await Promise.race([listPromise, timeoutPromise])

        if (!Array.isArray(items)) {
            console.error('ImageKit returned non-array response:', items)
            return []
        }

        return items.map((item) => {
            const filePath =
                'filePath' in item && item.filePath
                    ? item.filePath
                    : 'folderPath' in item && item.folderPath
                      ? item.folderPath
                      : ''
            const base: ImageKitFile = {
                ...item,
                filePath,
            }
            return {
                ...base,
                photoswipe: isFile(item),
            } as ProcessedFile
        })
    } catch (error) {
        console.error('Error in listFiles:', error)
        // Return empty array instead of throwing to prevent server crashes
        return []
    }
}
