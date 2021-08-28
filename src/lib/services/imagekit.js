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

let nodeClient = null

function getNodeClient() {
    if (nodeClient) {
        return nodeClient
    }

    nodeClient = new ImageKit(CONFIG_OPTIONS)

    return nodeClient
}

export function getFiles(options) {
    return getNodeClient().listFiles(options) // TODO make me reusable…
}
