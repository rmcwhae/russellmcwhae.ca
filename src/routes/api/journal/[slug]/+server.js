import { json } from '@sveltejs/kit'
import faunadb from 'faunadb'
import { FAUNA_SECRET_KEY } from '$root/env'
import { dev } from '$app/environment'

export async function GET({ params }) {
    const { slug } = params
    const q = faunadb.query
    const client = new faunadb.Client({
        secret: FAUNA_SECRET_KEY,
    })

    if (!slug) {
        return new Response(undefined, { status: 404 })
    }

    // Check and see if the doc exists.
    const doesDocExist = await client.query(
        q.Exists(q.Match(q.Index('hits_by_slug'), slug))
    )

    if (!doesDocExist) {
        await client.query(
            q.Create(q.Collection('hits'), {
                data: { slug: slug, hits: 0 },
            })
        )
    }

    // Fetch the document for-real
    const document = await client.query(
        q.Get(q.Match(q.Index('hits_by_slug'), slug))
    )

    if (!dev) {
        await client.query(
            q.Update(document.ref, {
                data: {
                    hits: document.data.hits + 1,
                },
            })
        )
        document.data.hits += 1
    }

    return json({
        hits: document.data.hits,
    })
}
