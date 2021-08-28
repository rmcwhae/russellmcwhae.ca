import ImageKit from 'imagekit'
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

export function listFiles(options) {
    return getClient().listFiles(options)
}
