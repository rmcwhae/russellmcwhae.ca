import ImageKit from 'imagekit-javascript'
import { IMAGEKIT_URL_ENDPOINT } from '../../../env.ts'

const CONFIG_OPTIONS = {
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
}

let client: ImageKit | null = null

function getClient(): ImageKit {
    if (client) {
        return client
    }

    client = new ImageKit(CONFIG_OPTIONS)

    return client
}

interface UrlOptions {
    path: string
    urlEndpoint: string
    transformation?: Record<string, string | number>[]
    [key: string]:
        | string
        | number
        | Record<string, string | number>[]
        | undefined
}

export function url(options: UrlOptions): string {
    return getClient().url(options)
}
