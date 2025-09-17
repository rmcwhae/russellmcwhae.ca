import path from 'path'

interface FileData {
    fm: Record<string, any>
}

interface File {
    filename: string
    data: FileData
}

export function frontMatterSlug() {
    return (_: any, file: File) => {
        const parsed = path.parse(file.filename)
        const slug = parsed.base.replace('.md', '')

        file.data.fm = {
            ...file.data.fm,
            slug,
        }
    }
}
