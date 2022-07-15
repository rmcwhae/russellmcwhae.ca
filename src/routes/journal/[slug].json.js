import faunadb from 'faunadb'
import { FAUNA_SECRET_KEY } from '$root/env'
import { mode } from '$app/env'

export async function GET({ params }) {
    const { slug } = params
    const q = faunadb.query
    const client = new faunadb.Client({
        secret: FAUNA_SECRET_KEY,
    })

    if (!slug) {
        return {
            status: 404,
        }
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

    if (mode !== 'development') {
        await client.query(
            q.Update(document.ref, {
                data: {
                    hits: document.data.hits + 1,
                },
            })
        )
        document.data.hits += 1
    }

    return {
        body: {
            hits: document.data.hits,
        },
    }
}
