import { PUBLIC_IMAGEKIT_URL_ENDPOINT } from '$app/env/public'
import type { Transformation } from '@imagekit/javascript'
import * as ImageKitJavascriptServices from '#lib/services/imageKitJavascript.js'

const BREAKPOINTS = [300, 500, 700, 900, 1200, 1600, 1800]

/** Fallback `src` width for browsers that do not use `srcset`. */
export const DISPLAY_WIDTH = 1200

export function buildURL(path: string, options: Transformation = {}): string {
    return ImageKitJavascriptServices.url({
        path,
        urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
        transformation: [{ format: 'auto', ...options }],
    })
}

export function generateSrcSets(image: string): string {
    function generate(breakpoint: number): string {
        const src = buildURL(image, { width: breakpoint })
        return `${src} ${breakpoint}w`
    }
    return BREAKPOINTS.map(generate).join(', ')
}
