import ImageKit from 'imagekit'
import * as ImageUtils from '$lib/utils/images'
import {
    PUBLIC_IMAGEKIT_PUBLIC_KEY as IMAGEKIT_PUBLIC_KEY,
    PUBLIC_IMAGEKIT_URL_ENDPOINT as IMAGEKIT_URL_ENDPOINT,
} from '$env/static/public'
import { IMAGEKIT_PRIVATE_KEY } from '$env/static/private'

const CONFIG_OPTIONS = {
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    publicKey: IMAGEKIT_PUBLIC_KEY,
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
    lqip: string
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
            try {
                const lqip = ImageUtils.buildURL(file.filePath, {
                    width: 300,
                    quality: 50,
                    blur: 30,
                })

                return {
                    ...file,
                    photoswipe: true,
                    lqip,
                }
            } catch (error) {
                console.error('Error processing file:', file, error)
                // Return a fallback object to prevent crashes
                return {
                    ...file,
                    photoswipe: true,
                    lqip: file.url || '',
                }
            }
        })
    } catch (error) {
        console.error('Error in listFiles:', error)
        // Return empty array instead of throwing to prevent server crashes
        return []
    }
}
