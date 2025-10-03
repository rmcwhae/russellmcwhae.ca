/**
 * Custom rehype plugin to render footnotes as HTML
 * Converts footnote nodes to proper HTML elements
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

interface ElementNode extends Node {
    type: 'element'
    tagName: string
    properties?: Record<string, string | string[]>
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

function rehypeFootnotes() {
    return (tree: Node & Parent) => {
        const footnotes = new Map()
        let footnoteCounter = 1

        // First pass: collect footnote definitions and convert references
        visit(tree, 'footnoteReference', (node: FootnoteReference) => {
            const identifier = node.identifier

            // Create HTML structure for footnote reference
            const elementNode = node as unknown as ElementNode
            elementNode.type = 'element'
            elementNode.tagName = 'sup'
            elementNode.properties = {
                id: `footnote-ref-${identifier}`,
            }
            elementNode.children = [
                {
                    type: 'element',
                    tagName: 'a',
                    properties: {
                        href: `#footnote-${identifier}`,
                        'aria-describedby': `footnote-${identifier}`,
                    },
                    children: [
                        {
                            type: 'text',
                            value: footnoteCounter.toString(),
                        } as TextNode,
                    ],
                } as ElementNode,
            ]

            footnotes.set(identifier, {
                id: identifier,
                counter: footnoteCounter++,
                content: (
                    (elementNode.children[0] as ElementNode)
                        .children[0] as TextNode
                ).value,
            })
        })

        // Second pass: convert footnote definitions
        visit(tree, 'footnoteDefinition', (node: FootnoteDefinition) => {
            const identifier = node.identifier
            const footnote = footnotes.get(identifier)

            if (footnote) {
                const elementNode = node as unknown as ElementNode
                elementNode.type = 'element'
                elementNode.tagName = 'li'
                elementNode.properties = {
                    id: `footnote-${identifier}`,
                }

                // Process the content
                const content = node.children[0] as ParagraphNode
                if (content && content.children) {
                    elementNode.children = [
                        ...content.children,
                        {
                            type: 'element',
                            tagName: 'a',
                            properties: {
                                href: `#footnote-ref-${identifier}`,
                                'aria-label': 'Back to reference',
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: '↩',
                                } as TextNode,
                            ],
                        } as ElementNode,
                    ]
                }
            }
        })

        // Third pass: convert footnotes section
        visit(tree, 'footnotes', (node: Footnotes) => {
            const elementNode = node as unknown as ElementNode
            elementNode.type = 'element'
            elementNode.tagName = 'section'
            elementNode.properties = {
                className: ['footnotes'],
            }

            // Add heading
            const heading: ElementNode = {
                type: 'element',
                tagName: 'h2',
                children: [
                    {
                        type: 'text',
                        value: 'Footnotes',
                    } as TextNode,
                ],
            }

            // Add ordered list
            const list: ElementNode = {
                type: 'element',
                tagName: 'ol',
                children: node.children,
            }

            elementNode.children = [heading, list]
        })
    }
}

export default rehypeFootnotes
