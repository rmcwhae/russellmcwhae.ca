import path from 'path'

interface FileData {
    fm: Record<string, string | number | boolean | undefined>
}

interface File {
    filename: string
    data: FileData
}

export function frontMatterSlug() {
    return (_: unknown, file: File) => {
        const parsed = path.parse(file.filename)
        const slug = parsed.base.replace('.md', '')

        file.data.fm = {
            ...file.data.fm,
            slug,
        }
    }
}
