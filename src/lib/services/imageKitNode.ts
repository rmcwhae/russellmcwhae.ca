import ImageKit from 'imagekit'
import {
    PUBLIC_IMAGEKIT_PUBLIC_KEY,
    PUBLIC_IMAGEKIT_URL_ENDPOINT,
} from '$env/static/public'
import { IMAGEKIT_PRIVATE_KEY } from '$env/static/private'

const CONFIG_OPTIONS = {
    urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
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
    [key: string]: string | number | boolean | undefined
}

export async function listFiles(
    options: ListFilesOptions
): Promise<ProcessedFile[]> {
    try {
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
        })

        const listPromise = getClient().listFiles(options)

        const images = await Promise.race([listPromise, timeoutPromise])

        if (!Array.isArray(images)) {
            console.error('ImageKit returned non-array response:', images)
            return []
        }

        return images.map((file: ImageKitFile) => {
            return {
                ...file,
                photoswipe: true,
            }
        })
    } catch (error) {
        console.error('Error in listFiles:', error)
        // Return empty array instead of throwing to prevent server crashes
        return []
    }
}
