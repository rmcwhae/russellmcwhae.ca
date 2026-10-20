const HERO_WIDTHS = [640, 960, 1280, 1920, 2560]
const PORTRAIT_WIDTHS = [160, 320, 480, 640]

function srcset(name: string, extension: string, widths: number[]): string {
    return widths
        .map((width) => `/${name}/${name}-${width}.${extension} ${width}w`)
        .join(', ')
}

export const heroPicture = {
    width: 5123,
    height: 3959,
    // Covers at least 100svh tall, so portrait screens need 1.29 × 100svh wide
    sizes: 'max(100vw, 129svh)',
    avif: srcset('hero', 'avif', HERO_WIDTHS),
    webp: srcset('hero', 'webp', HERO_WIDTHS),
    jpeg: srcset('hero', 'jpg', HERO_WIDTHS),
    src: '/hero/hero-1280.jpg',
}

export const heroPreload = '/hero/hero-1280.avif'

export const portraitPicture = {
    width: 3088,
    height: 2316,
    sizes: '(min-width: 901px) 320px, 144px',
    avif: srcset('portrait', 'avif', PORTRAIT_WIDTHS),
    webp: srcset('portrait', 'webp', PORTRAIT_WIDTHS),
    jpeg: srcset('portrait', 'jpg', PORTRAIT_WIDTHS),
    src: '/portrait/portrait-320.jpg',
}

export const gallerySizes =
    '(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw'

export const homeLeadSizes = '(max-width: 900px) 100vw, 650px'

export const homePhotoSizes =
    '(max-width: 576px) 100vw, (max-width: 900px) 50vw, 325px'

/** Uncropped width `object-fit: cover` needs for the tall 3:2 homepage cell. */
export const homeTallSizes =
    '(max-width: 576px) 50vw, (max-width: 900px) calc(1.5 * (2 * clamp(10rem, 22vw, 15rem) + 0.75rem)), calc(1.5 * (2 * clamp(12rem, 17vw, 17rem) + 0.75rem))'
