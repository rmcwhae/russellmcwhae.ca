/**
 * Custom rehype plugin to render footnotes as inline tooltip popups.
 *
 * mdsvex converts mdast footnotes to HTML before rehype plugins run, so this
 * transforms the rendered GFM output (`sup#fnref-*` + `.footnotes` section)
 * into inline popup markup for FootnoteManager.
 */

import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'

interface ElementNode extends Node {
    type: 'element'
    tagName: string
    properties?: Record<string, string | string[] | boolean>
    children?: Node[]
}

function classNames(node: ElementNode): string[] {
    const cls = node.properties?.className
    if (!cls) return []
    return Array.isArray(cls) ? cls.map(String) : [String(cls)]
}

function hasClass(node: ElementNode, name: string): boolean {
    return classNames(node).includes(name)
}

function nodeId(node: ElementNode): string | undefined {
    const id = node.properties?.id
    return typeof id === 'string' ? id : undefined
}

function footnoteIdFromLi(id: string): string | undefined {
    const match = id.match(/^(?:user-content-)?fn-(.+)$/)
    return match?.[1]
}

function footnoteIdFromSup(id: string): string | undefined {
    const match = id.match(/^(?:user-content-)?fnref-(.+)$/)
    return match?.[1]
}

function footnoteIdFromRefLink(node: ElementNode): string | undefined {
    const href = node.properties?.href
    if (typeof href !== 'string') return undefined
    const match = href.match(/#(?:user-content-)?fn-(.+)$/)
    return match?.[1]
}

function withoutBackrefs(children: Node[]): Node[] {
    return children.filter((child) => {
        if ((child as ElementNode).type !== 'element') return true
        const el = child as ElementNode
        return !(el.tagName === 'a' && hasClass(el, 'footnote-backref'))
    })
}

function isFootnotesSection(node: ElementNode): boolean {
    if (node.tagName === 'section' && node.properties?.dataFootnotes) return true
    return node.tagName === 'div' && hasClass(node, 'footnotes')
}

function rehypeFootnotes() {
    return (tree: Node & Parent) => {
        const contentMap = new Map<string, Node[]>()

        visit(tree, 'element', (node: ElementNode) => {
            if (node.tagName !== 'li') return
            const identifier = footnoteIdFromLi(nodeId(node) ?? '')
            if (!identifier) return
            contentMap.set(identifier, withoutBackrefs(node.children ?? []))
        })

        let footnoteCounter = 1
        visit(tree, 'element', (node: ElementNode) => {
            if (node.tagName !== 'sup') return

            const link = (node.children ?? []).find(
                (child) =>
                    (child as ElementNode).type === 'element' &&
                    (child as ElementNode).tagName === 'a' &&
                    (hasClass(child as ElementNode, 'footnote-ref') ||
                        (child as ElementNode).properties?.dataFootnoteRef)
            ) as ElementNode | undefined

            if (!link) return

            const identifier =
                footnoteIdFromSup(nodeId(node) ?? '') ??
                footnoteIdFromRefLink(link) ??
                nodeId(link)?.replace(/^(?:user-content-)?fnref-/, '')

            if (!identifier) return

            const counter = footnoteCounter++
            const popupId = `footnote-popup-${identifier}-${counter}`
            const content = contentMap.get(identifier) ?? []

            node.properties = {
                className: ['footnote-ref'],
                id: `footnote-ref-${identifier}`,
            }

            node.children = [
                {
                    type: 'element',
                    tagName: 'button',
                    properties: {
                        className: ['footnote-button'],
                        type: 'button',
                        'aria-label': `Footnote ${counter}`,
                        'aria-expanded': 'false',
                        'aria-controls': popupId,
                    },
                    children: [{ type: 'text', value: '…' }],
                },
                {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                        className: ['footnote-popup'],
                        id: popupId,
                        role: 'note',
                        'aria-label': `Footnote ${counter}`,
                    },
                    children: [
                        {
                            type: 'element',
                            tagName: 'span',
                            properties: { className: ['footnote-popup-inner'] },
                            children: content,
                        },
                    ],
                },
            ]
        })

        ;(tree as Parent).children = (tree as Parent).children.filter((n: Node) => {
            if ((n as ElementNode).type !== 'element') return true
            return !isFootnotesSection(n as ElementNode)
        })
    }
}

export default rehypeFootnotes
