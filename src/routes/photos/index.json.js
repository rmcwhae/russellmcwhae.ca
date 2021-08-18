import * as GalleryHelpers from './_galleries'

export function get() {
    const body = JSON.stringify(GalleryHelpers.getGalleries())

    return {
        body,
    }
}
