import * as path from 'path'

export function frontMatterSlug() {
    return function (
        _: unknown,
        file: {
            path?: string
            data?: { filename?: string; fm?: Record<string, unknown> }
        }
    ) {
        const filename = file.path || file.data?.filename || ''
        const parsed = path.parse(filename)
        const slug = parsed.base.replace('.md', '')

        if (!file.data) {
            file.data = {}
        }

        if (!file.data.fm) {
            file.data.fm = {}
        }

        file.data.fm = {
            ...file.data.fm,
            slug,
        }
    }
}
