import { IMAGEKIT_URL_ENDPOINT } from '../../../../env.ts'
import * as ImageKitJavascriptServices from '$lib/services/imageKitJavascript'

const BREAKPOINTS = [300, 500, 700, 900, 1200, 1600, 1800]
const MAX_BREAKPOINT = Math.max(...BREAKPOINTS)

interface ImageOptions {
    width?: number
    height?: number
    quality?: number
    format?: string
    blur?: number
    [key: string]: string | number | undefined
}

export function buildURL(path: string, options: ImageOptions): string {
    return ImageKitJavascriptServices.url({
        path,
        urlEndpoint: IMAGEKIT_URL_ENDPOINT,
        transformation: [options],
    })
}

export function generateSrcSets(image: string): string {
    function generate(breakpoint: number): string {
        const src = buildURL(image, { width: breakpoint })
        return `${src} ${breakpoint}w`
    }
    return BREAKPOINTS.map(generate).join(', ')
}

const sizesArray = BREAKPOINTS.slice(0, -1).map(
    (breakpoint) => `(max-width: ${breakpoint}px) ${breakpoint}px`
)
sizesArray.push(`${MAX_BREAKPOINT}px`)
const sizes = sizesArray.join(', ')

export { sizes }
