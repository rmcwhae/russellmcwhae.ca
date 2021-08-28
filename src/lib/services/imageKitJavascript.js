import ImageKit from 'imagekit-javascript'
import { IMAGEKIT_URL_ENDPOINT } from '$root/env'

const CONFIG_OPTIONS = {
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
}

let client = null

function getClient() {
    if (client) {
        return client
    }

    client = new ImageKit(CONFIG_OPTIONS)

    return client
}

export function url(options) {
    return getClient().url(options)
}
