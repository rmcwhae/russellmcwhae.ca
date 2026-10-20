import sharp from 'sharp'
import { buildURL } from '#lib/utils/images/index.js'

// Blurred low-quality image placeholders (LQIP), made when listings are
// fetched and inlined as data URIs so tiles show a soft preview before the
// real image loads

const PLACEHOLDER_WIDTH = 16
const CONCURRENCY = 8

interface PlaceholderSource {
    fileId?: string
    filePath: string
    updatedAt?: string
}

/** One promise per image version, shared across every listing in a build */
const cache = new Map<string, Promise<string | undefined>>()

let active = 0
const queue: (() => void)[] = []
let warned = false

/** Runs at most CONCURRENCY tasks at once so builds don’t flood ImageKit */
async function limit<T>(task: () => Promise<T>): Promise<T> {
    if (active >= CONCURRENCY) {
        await new Promise<void>((resolve) => queue.push(resolve))
    }
    active++
    try {
        return await task()
    } finally {
        active--
        queue.shift()?.()
    }
}

async function generate(filePath: string): Promise<string> {
    const response = await fetch(
        buildURL(filePath, { width: PLACEHOLDER_WIDTH * 2, quality: 50 }),
        { signal: AbortSignal.timeout(10_000) }
    )
    if (!response.ok) {
        throw new Error(`${response.status} fetching ${filePath}`)
    }

    const tiny = await sharp(Buffer.from(await response.arrayBuffer()))
        .resize(PLACEHOLDER_WIDTH)
        .webp({ quality: 40 })
        .toBuffer()

    return `data:image/webp;base64,${tiny.toString('base64')}`
}

/**
 * A tiny blurred-preview data URI for an image, or undefined if it can’t be
 * made. Placeholders are cosmetic, so failures never fail a build.
 */
export function placeholderFor(
    file: PlaceholderSource
): Promise<string | undefined> {
    const key = `${file.fileId ?? file.filePath}:${file.updatedAt ?? ''}`
    let result = cache.get(key)

    if (!result) {
        result = limit(() => generate(file.filePath)).catch((error) => {
            if (!warned) {
                warned = true
                console.warn('Could not make image placeholders:', error)
            }
            return undefined
        })
        cache.set(key, result)
    }

    return result
}
