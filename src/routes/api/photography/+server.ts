import type { RequestHandler } from './$types'

import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'

export const GET: RequestHandler = async () => {
    const images = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        sort: 'DESC_NAME',
    })

    return Response.json({
        images,
    })
}
