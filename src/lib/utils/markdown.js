import path from 'path'
import { visit } from 'unist-util-visit'

export function slug() {
    return (_, file) => {
        const parsed = path.parse(file.filename)
        const slug = parsed.base.replace('.md', '')

        file.data.fm = {
            ...file.data.fm,
            slug,
        }
    }
}

// My first stab at a remark plugin. Ugly, but it works!
export function buildToc() {
    return (tree, file) => {
        const headingNodes = []
        visit(tree, 'heading', (node) => {
            if (node.data.id !== 'table-of-contents') {
                headingNodes.push(node)
            }
        })

        if (headingNodes.length > 0) {
            file.data.fm = {
                ...file.data.fm,
                tableOfContents: generateToc(headingNodes),
            }
        }
    }
}

function generateToc(headingNodes) {
    let html = '<ul>\n'
    html += headingNodes
        .map((node) => {
            return `<li class="toc-level-${node.depth}"><a href="#${node.data.id}">${node.children[0].value}</a></li>`
        })
        .join('\n')

    html += '\n</ul>\n'

    return html
}
