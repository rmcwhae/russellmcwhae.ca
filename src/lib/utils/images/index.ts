import { env } from '$env/dynamic/public'
import * as ImageKitJavascriptServices from '$lib/services/imageKitJavascript'

const BREAKPOINTS = [300, 500, 700, 900, 1200, 1600, 1800]
const MAX_BREAKPOINT = Math.max(...BREAKPOINTS)

export const DEFAULT_SRC_WIDTH = 900
export const LIGHTBOX_MAX_WIDTH = 2000

/** Conservative fallback when rendered width is unknown (masonry tiles). */
export const masonrySizes =
    '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw'

/** Four-column homepage grid. */
export const gridSizes =
    '(max-width: 576px) 100vw, (max-width: 900px) 50vw, 25vw'

interface ImageOptions {
    width?: number
    height?: number
    quality?: number
    format?: string
    blur?: number
    [key: string]: string | number | undefined
}

export function buildURL(path: string, options: ImageOptions = {}): string {
    return ImageKitJavascriptServices.url({
        path,
        urlEndpoint: env.PUBLIC_IMAGEKIT_URL_ENDPOINT,
        transformation: [{ format: 'auto', ...options }],
    })
}

export function pickSrcWidth(displayWidth?: number): number {
    if (!displayWidth) return DEFAULT_SRC_WIDTH
    const target = Math.ceil(displayWidth)
    return BREAKPOINTS.find((bp) => bp >= target) ?? MAX_BREAKPOINT
}

export function displaySizes(displayWidth?: number): string {
    if (displayWidth) return `${Math.ceil(displayWidth)}px`
    return masonrySizes
}

export function generateSrcSets(image: string): string {
    return BREAKPOINTS.map((breakpoint) => {
        const src = buildURL(image, { width: breakpoint })
        return `${src} ${breakpoint}w`
    }).join(', ')
}

/** @deprecated Use displaySizes() or gridSizes/masonrySizes instead. */
const sizes = masonrySizes

export { sizes }
