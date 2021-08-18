import fs from 'fs'
import * as StringUtils from '$lib/utils/string'
import imageSize from 'image-size'

export function getGalleries() {
    return fs
        .readdirSync('./static/galleries')
        .filter((file) => file !== '.DS_Store')
        .filter((file) => file !== 'manifest.json')
        .sort((a, b) => {
            return (
                new Date(StringUtils.extractDate(b)) -
                new Date(StringUtils.extractDate(a))
            )
        })
        .map((filename) => {
            return {
                slug: filename,
                title: StringUtils.createTitle(filename),
                date: StringUtils.extractDate(filename),
                // count: 0, TODO implement me
            }
        })
}

export function getImages(gallery) {
    const images = fs
        .readdirSync('./static/galleries/' + gallery.slug)
        .filter((folder) => folder !== '.DS_Store')
        .map((image) => {
            const src = generateSrc(gallery.slug, image)
            const { width, height } = imageSize(
                './static/galleries/' + gallery.slug + '/' + image
            )

            return {
                title: image,
                description: image,
                src,
                width,
                height,
            }
        })

    return images
}

function generateSrc(slug, image) {
    return '/galleries/' + slug + '/' + image
}
