import fs from 'fs'
import imageSize from 'image-size'
import galleries from '../_galleries'

export function get({ params }) {
    const gallery = galleries.find((post) => post.slug === params.slug)

    if (gallery) {
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

        return {
            body: JSON.stringify({
                ...gallery,
                images,
            }),
        }
    } else {
        return {
            status: 404,
        }
    }
}

function generateSrc(slug, image) {
    return '/galleries/' + slug + '/' + image
}
