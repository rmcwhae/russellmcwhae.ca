import * as GalleryHelpers from '../photos/_galleries'

export function get() {
    const images = GalleryHelpers.getImages('portfolio-images', 1)

    return {
        body: JSON.stringify({
            images,
        }),
    }
}
