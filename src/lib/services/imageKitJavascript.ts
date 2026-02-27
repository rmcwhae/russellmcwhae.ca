import { buildSrc } from '@imagekit/javascript'

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
    return buildSrc({
        src: options.path,
        urlEndpoint: options.urlEndpoint,
        transformation: options.transformation,
    })
}
