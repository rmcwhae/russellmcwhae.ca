/**
 * Custom remark plugin to handle GFM-style footnotes
 * Reproduces the functionality of remark-footnotes
 */

import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'

// Define custom node types for footnotes
interface FootnoteReference extends Node {
    type: 'footnoteReference'
    identifier: string
    label: string
}

interface FootnoteDefinition extends Node {
    type: 'footnoteDefinition'
    identifier: string
    label: string
    children: Node[]
}

interface Footnotes extends Node {
    type: 'footnotes'
    children: Node[]
}

interface TextNode extends Node {
    type: 'text'
    value: string
}

interface ParagraphNode extends Node {
    type: 'paragraph'
    children: Node[]
}

interface LinkReferenceNode extends Node {
    type: 'linkReference'
    identifier: string
    referenceType?: string
    children?: Node[]
}


function remarkFootnotes() {
    return (tree: Node & Parent) => {
        const footnotes = new Map()

        // First pass: collect footnote definitions
        visit(tree, 'paragraph', (node: ParagraphNode, index, parent: Parent) => {
            if (node.children && node.children.length > 0) {
                const firstChild = node.children[0]

                // Check for footnote definition in text node
                if (
                    firstChild.type === 'text' &&
                    /^\[\^[^\]]+\]:\s*/.test((firstChild as TextNode).value)
                ) {
                    // This is a footnote definition
                    const match = (firstChild as TextNode).value.match(
                        /^\[\^([^\]]+)\]:\s*(.*)$/
                    )
                    if (match) {
                        const [, identifier, content] = match

                        // Create footnote definition node
                        const footnoteDef: FootnoteDefinition = {
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
                                        } as TextNode,
                                    ],
                                } as ParagraphNode,
                            ],
                        }

                        footnotes.set(identifier, footnoteDef)

                        // Remove the original paragraph
                        parent!.children.splice(index, 1)
                        return index // Adjust index since we removed an element
                    }
                }

                // Check for footnote definition in linkReference node
                if (
                    firstChild.type === 'linkReference' &&
                    (firstChild as LinkReferenceNode).identifier &&
                    (firstChild as LinkReferenceNode).identifier!.startsWith('^')
                ) {
                    const identifier = (firstChild as LinkReferenceNode).identifier!.substring(1) // Remove the ^

                    // Check if there's a colon after the linkReference
                    if (
                        node.children.length > 1 &&
                        node.children[1].type === 'text' &&
                        (node.children[1] as TextNode).value.startsWith(':')
                    ) {
                        const content = (node.children[1] as TextNode).value
                            .substring(1)
                            .trim() // Remove the colon and trim

                        // Create footnote definition node
                        const footnoteDef: FootnoteDefinition = {
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
                                        } as TextNode,
                                    ],
                                } as ParagraphNode,
                            ],
                        }

                        footnotes.set(identifier, footnoteDef)

                        // Remove the original paragraph
                        parent!.children.splice(index, 1)
                        return index // Adjust index since we removed an element
                    }
                }
            }
        })

        // Second pass: convert footnote references
        visit(tree, 'text', (node: TextNode, index, parent: Parent) => {
            if (node.value.includes('[^')) {
                const parts: Node[] = []
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
                            } as TextNode)
                        }

                        // Add footnote reference
                        parts.push({
                            type: 'footnoteReference',
                            identifier: identifier,
                            label: identifier,
                        } as FootnoteReference)

                        remaining = after
                    } else {
                        // No more footnote references
                        if (remaining) {
                            parts.push({
                                type: 'text',
                                value: remaining,
                            } as TextNode)
                        }
                        break
                    }
                }

                if (parts.length > 1) {
                    // Replace the text node with multiple nodes
                    parent!.children.splice(index!, 1, ...parts)
                    return index! + parts.length - 1
                }
            }
        })

        // Also handle linkReference nodes that are footnote references
        visit(tree, 'linkReference', (node: LinkReferenceNode) => {
            if (node.identifier && node.identifier.startsWith('^')) {
                const identifier = node.identifier.substring(1) // Remove the ^

                // Convert to footnote reference
                const footnoteRef = node as unknown as FootnoteReference
                footnoteRef.type = 'footnoteReference'
                footnoteRef.identifier = identifier
                footnoteRef.label = identifier
                delete (footnoteRef as unknown as LinkReferenceNode).referenceType
                delete (footnoteRef as unknown as LinkReferenceNode).children
            }
        })

        // Third pass: add footnotes section at the end
        if (footnotes.size > 0) {
            const footnotesSection: Footnotes = {
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
