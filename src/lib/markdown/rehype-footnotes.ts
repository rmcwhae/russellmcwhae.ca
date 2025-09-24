/**
 * Custom rehype plugin to render footnotes as HTML
 * Converts footnote nodes to proper HTML elements
 */

import { visit } from 'unist-util-visit'

function rehypeFootnotes() {
    return (tree) => {
        const footnotes = new Map()
        let footnoteCounter = 1

        // First pass: collect footnote definitions and convert references
        visit(tree, 'footnoteReference', (node) => {
            const identifier = node.identifier

            // Create HTML structure for footnote reference
            node.type = 'element'
            node.tagName = 'sup'
            node.properties = {
                id: `footnote-ref-${identifier}`,
            }
            node.children = [
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
                        },
                    ],
                },
            ]

            footnotes.set(identifier, {
                id: identifier,
                counter: footnoteCounter++,
                content: node.children[0].children[0].value,
            })
        })

        // Second pass: convert footnote definitions
        visit(tree, 'footnoteDefinition', (node) => {
            const identifier = node.identifier
            const footnote = footnotes.get(identifier)

            if (footnote) {
                node.type = 'element'
                node.tagName = 'li'
                node.properties = {
                    id: `footnote-${identifier}`,
                }

                // Process the content
                const content = node.children[0]
                if (content && content.children) {
                    node.children = [
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
                                },
                            ],
                        },
                    ]
                }
            }
        })

        // Third pass: convert footnotes section
        visit(tree, 'footnotes', (node) => {
            node.type = 'element'
            node.tagName = 'section'
            node.properties = {
                className: ['footnotes'],
            }

            // Add heading
            const heading = {
                type: 'element',
                tagName: 'h2',
                children: [
                    {
                        type: 'text',
                        value: 'Footnotes',
                    },
                ],
            }

            // Add ordered list
            const list = {
                type: 'element',
                tagName: 'ol',
                children: node.children,
            }

            node.children = [heading, list]
        })
    }
}

export default rehypeFootnotes
