import ImageKit from 'imagekit'
import {
    IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT,
} from '$root/env'

const CONFIG_OPTIONS = {
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
}

const imagekit = new ImageKit(CONFIG_OPTIONS)

export async function get() {
    const images = await imagekit.listFiles({
        path: '/portfolio/',
        sort: 'DESC_NAME',
    }) // TODO make me reusable…

    return {
        body: JSON.stringify({
            images,
        }),
    }
}
