/**
 * Custom remark plugin to handle GFM-style footnotes
 * Reproduces the functionality of remark-footnotes
 */

import { visit } from 'unist-util-visit'

function remarkFootnotes() {
    return (tree) => {
        const footnotes = new Map()

        // First pass: collect footnote definitions
        visit(tree, 'paragraph', (node, index, parent) => {
            if (node.children && node.children.length > 0) {
                const firstChild = node.children[0]

                // Check for footnote definition in text node
                if (
                    firstChild.type === 'text' &&
                    /^\[\^[^\]]+\]:\s*/.test(firstChild.value)
                ) {
                    // This is a footnote definition
                    const match = firstChild.value.match(
                        /^\[\^([^\]]+)\]:\s*(.*)$/
                    )
                    if (match) {
                        const [, identifier, content] = match

                        // Create footnote definition node
                        const footnoteDef = {
                            type: 'footnoteDefinition',
                            identifier: identifier,
                            label: identifier,
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            type: 'text',
                                            value: content,
                                        },
                                    ],
                                },
                            ],
                        }

                        footnotes.set(identifier, footnoteDef)

                        // Remove the original paragraph
                        parent.children.splice(index, 1)
                        return index // Adjust index since we removed an element
                    }
                }

                // Check for footnote definition in linkReference node
                if (
                    firstChild.type === 'linkReference' &&
                    firstChild.identifier &&
                    firstChild.identifier.startsWith('^')
                ) {
                    const identifier = firstChild.identifier.substring(1) // Remove the ^

                    // Check if there's a colon after the linkReference
                    if (
                        node.children.length > 1 &&
                        node.children[1].type === 'text' &&
                        node.children[1].value.startsWith(':')
                    ) {
                        const content = node.children[1].value
                            .substring(1)
                            .trim() // Remove the colon and trim

                        // Create footnote definition node
                        const footnoteDef = {
                            type: 'footnoteDefinition',
                            identifier: identifier,
                            label: identifier,
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            type: 'text',
                                            value: content,
                                        },
                                    ],
                                },
                            ],
                        }

                        footnotes.set(identifier, footnoteDef)

                        // Remove the original paragraph
                        parent.children.splice(index, 1)
                        return index // Adjust index since we removed an element
                    }
                }
            }
        })

        // Second pass: convert footnote references
        visit(tree, 'text', (node, index, parent) => {
            if (node.value.includes('[^')) {
                const parts = []
                let remaining = node.value

                while (remaining.length > 0) {
                    const match = remaining.match(/^([^[]*)\[\^([^\]]+)\](.*)$/)
                    if (match) {
                        const [, before, identifier, after] = match

                        // Add text before the footnote reference
                        if (before) {
                            parts.push({
                                type: 'text',
                                value: before,
                            })
                        }

                        // Add footnote reference
                        parts.push({
                            type: 'footnoteReference',
                            identifier: identifier,
                            label: identifier,
                        })

                        remaining = after
                    } else {
                        // No more footnote references
                        if (remaining) {
                            parts.push({
                                type: 'text',
                                value: remaining,
                            })
                        }
                        break
                    }
                }

                if (parts.length > 1) {
                    // Replace the text node with multiple nodes
                    parent.children.splice(index, 1, ...parts)
                    return index + parts.length - 1
                }
            }
        })

        // Also handle linkReference nodes that are footnote references
        visit(tree, 'linkReference', (node, index, parent) => {
            if (node.identifier && node.identifier.startsWith('^')) {
                const identifier = node.identifier.substring(1) // Remove the ^

                // Convert to footnote reference
                node.type = 'footnoteReference'
                node.identifier = identifier
                node.label = identifier
                delete node.referenceType
                delete node.children
            }
        })

        // Third pass: add footnotes section at the end
        if (footnotes.size > 0) {
            const footnotesSection = {
                type: 'footnotes',
                children: Array.from(footnotes.values()),
            }

            // Add to the end of the document
            if (tree.children) {
                tree.children.push(footnotesSection)
            }
        }
    }
}

export default remarkFootnotes
