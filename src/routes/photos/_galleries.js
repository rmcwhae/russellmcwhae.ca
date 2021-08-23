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

export function getImages(folder, reverseSort = false, slug = '') {
    const images = fs
        .readdirSync('./static/' + folder + '/' + slug)
        .filter((folder) => folder !== '.DS_Store')
        .filter((folder) => folder !== 'g')
        .map((image) => {
            const src = generateSrc(folder, slug, image)
            const { width, height } = imageSize(
                './static/' + folder + '/' + slug + '/' + image
            )

            return {
                title: image,
                description: image,
                src,
                width,
                height,
            }
        })

    return reverseSort ? images.reverse() : images
}

// Helpers

function generateSrc(folder, slug, image) {
    const second = slug ? slug + '/' : ''
    return '/' + folder + '/' + second + image
}
// TODO ^ make this less ridiculous…
