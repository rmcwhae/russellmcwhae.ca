import { buildSrc, type Transformation } from '@imagekit/javascript'

interface UrlOptions {
    path: string
    urlEndpoint: string
    transformation?: Transformation[]
}

export function url(options: UrlOptions): string {
    return buildSrc({
        src: options.path,
        urlEndpoint: options.urlEndpoint,
        transformation: options.transformation,
    })
}
