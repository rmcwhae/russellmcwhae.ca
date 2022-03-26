import ImageKit from 'imagekit'
import * as ImageUtils from '$lib/utils/images'
import {
    IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT,
} from '$root/env'

const CONFIG_OPTIONS = {
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
}

let client = null

function getClient() {
    if (client) {
        return client
    }

    client = new ImageKit(CONFIG_OPTIONS)

    return client
}

export async function listFiles(options) {
    const images = await getClient().listFiles(options)

    return images.map((file) => {
        const lqip = ImageUtils.buildURL(file.filePath, {
            width: 300,
            quality: 50,
            blur: 30,
        })

        return {
            ...file,
            photoswipe: true,
            lqip,
        }
    })
}
