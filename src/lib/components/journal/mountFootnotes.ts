const GUTTER = 16
const GAP = 10
const ARROW_INSET = 12
const ROOT_CLASS = 'has-footnote-popovers'

const clamp = (min: number, value: number, max: number) =>
    Math.min(Math.max(value, min), max)

/**
 * Show footnotes in popovers beside their references, like Bigfoot.js.
 * The rendered footnotes list stays in the page as the no-JS and print fallback.
 */
export function mountFootnotes(root: Element): { destroy: () => void } {
    const refs = root.querySelectorAll<HTMLAnchorElement>(
        'a.footnote-ref[href^="#"]'
    )
    if (!refs.length || !('togglePopover' in window.HTMLElement.prototype)) {
        return { destroy() {} }
    }

    const cleanups: Array<() => void> = []
    let open: { ref: HTMLElement; popover: HTMLElement } | null = null
    let frame = 0

    function position() {
        frame = 0
        if (!open) return
        const { ref, popover } = open
        const r = ref.getBoundingClientRect()
        const vw = document.documentElement.clientWidth
        const vh = window.innerHeight

        if (r.bottom < 0 || r.top > vh) {
            popover.hidePopover()
            return
        }

        const below = vh - r.bottom - GAP - GUTTER
        const above = r.top - GAP - GUTTER

        popover.style.maxHeight = ''
        const { width, height } = popover.getBoundingClientRect()
        const placeBelow = height <= below || below >= above
        const space = Math.max(placeBelow ? below : above, 0)
        const h = Math.min(height, space)
        popover.style.maxHeight = `${space}px`

        const centre = r.left + r.width / 2
        const left = clamp(GUTTER, centre - width / 2, vw - GUTTER - width)
        const top = placeBelow ? r.bottom + GAP : r.top - GAP - h

        popover.style.left = `${left}px`
        popover.style.top = `${top}px`
        popover.style.setProperty(
            '--arrow-x',
            `${clamp(ARROW_INSET, centre - left, width - ARROW_INSET)}px`
        )
        popover.dataset.placement = placeBelow ? 'bottom' : 'top'
    }

    function schedule() {
        if (open && !frame) frame = window.requestAnimationFrame(position)
    }

    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('scroll', schedule, {
        passive: true,
        capture: true,
    })
    cleanups.push(() => {
        window.removeEventListener('resize', schedule)
        window.removeEventListener('scroll', schedule, { capture: true })
        window.cancelAnimationFrame(frame)
    })

    refs.forEach((ref, index) => {
        const id = decodeURIComponent(ref.hash.slice(1))
        const definition = root.querySelector(`#${window.CSS.escape(id)}`)
        if (!definition) return

        const popover = document.createElement('div')
        popover.className = 'footnote-popover'
        popover.id = `footnote-popover-${index + 1}`
        popover.setAttribute('popover', 'auto')
        popover.setAttribute('role', 'note')
        const body = document.createElement('div')
        body.className = 'footnote-popover-body'
        for (const node of definition.childNodes) {
            body.append(node.cloneNode(true))
        }
        body.querySelector('.footnote-backref')?.remove()
        popover.append(body)
        document.body.append(popover)

        ref.setAttribute('role', 'button')
        ref.setAttribute('aria-controls', popover.id)
        ref.setAttribute('aria-expanded', 'false')

        // Light dismiss closes the popover on pointerdown outside it, which
        // includes its own reference, so the click must not reopen it.
        let wasOpen = false
        const onPointerDown = () => {
            wasOpen = popover.matches(':popover-open')
        }
        const onClick = (event: MouseEvent) => {
            event.preventDefault()
            if (wasOpen) popover.hidePopover()
            else popover.togglePopover()
            wasOpen = false
        }
        const onToggle = (event: Event) => {
            const isOpen = (event as ToggleEvent).newState === 'open'
            ref.setAttribute('aria-expanded', String(isOpen))
            if (isOpen) {
                open = { ref, popover }
                position()
            } else if (open?.popover === popover) {
                open = null
            }
        }

        ref.addEventListener('pointerdown', onPointerDown)
        ref.addEventListener('click', onClick)
        popover.addEventListener('toggle', onToggle)

        cleanups.push(() => {
            ref.removeEventListener('pointerdown', onPointerDown)
            ref.removeEventListener('click', onClick)
            ref.removeAttribute('role')
            ref.removeAttribute('aria-controls')
            ref.removeAttribute('aria-expanded')
            popover.remove()
        })
    })

    root.classList.add(ROOT_CLASS)
    cleanups.push(() => root.classList.remove(ROOT_CLASS))

    return {
        destroy() {
            open = null
            cleanups.forEach((cleanup) => cleanup())
        },
    }
}
