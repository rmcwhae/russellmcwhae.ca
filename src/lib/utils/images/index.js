import { IMAGEKIT_URL_ENDPOINT } from '$root/env'
import * as ImageKitJavascriptServices from '$lib/services/imageKitJavascript'

const BREAKPOINTS = [300, 500, 700, 900, 1200, 1600, 1800]
const MAX_BREAKPOINT = Math.max(...BREAKPOINTS)

function buildURL(image, width = '') {
    return ImageKitJavascriptServices.url({
        path: image,
        urlEndpoint: IMAGEKIT_URL_ENDPOINT,
        transformation: [{ width }],
    })
}

export function generateSrcSets(image) {
    function generate(breakpoint) {
        const src = buildURL(image, breakpoint)

        return `${src} ${breakpoint}w`
    }

    return BREAKPOINTS.map(generate)
}

const sizes = BREAKPOINTS.slice(0, -1).map(
    (breakpoint) => `(max-width: ${breakpoint}px) ${breakpoint}px`
)

sizes.push(`${MAX_BREAKPOINT}px`)

export { sizes }
