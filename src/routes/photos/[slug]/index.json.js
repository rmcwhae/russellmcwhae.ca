import * as GalleryHelpers from '../_galleries'

export function get({ params }) {
    const gallery = GalleryHelpers.getGalleries().find(
        (post) => post.slug === params.slug
    )
    const images = GalleryHelpers.getImages('galleries', 0, gallery.slug)

    if (gallery) {
        return {
            body: JSON.stringify({
                ...gallery,
                images,
                count: images.length,
            }),
        }
    } else {
        return {
            status: 404,
        }
    }
}
