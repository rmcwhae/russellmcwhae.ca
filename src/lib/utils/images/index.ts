import { PUBLIC_IMAGEKIT_URL_ENDPOINT } from '$app/env/public'
import type { Transformation } from '@imagekit/javascript'
import * as ImageKitJavascriptServices from '#lib/services/imageKitJavascript.js'

const BREAKPOINTS = [300, 500, 700, 900, 1200, 1600, 1800]
const MAX_BREAKPOINT = Math.max(...BREAKPOINTS)

export function buildURL(path: string, options: Transformation): string {
    return ImageKitJavascriptServices.url({
        path,
        urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
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
