<script lang="ts">
    import { browser } from '$app/environment'

    let currentlyOpen: HTMLElement | null = null

    function closeOpen() {
        if (!currentlyOpen) return
        const el = currentlyOpen
        el.classList.remove('open')
        el.querySelector<HTMLButtonElement>('.footnote-button')?.setAttribute(
            'aria-expanded',
            'false'
        )
        currentlyOpen = null
        // Defer removing popup-below until after the transition so the popup
        // doesn't snap position mid-fade.
        const popup = el.querySelector<HTMLElement>('.footnote-popup')
        if (popup) {
            popup.addEventListener(
                'transitionend',
                () => {
                    el.classList.remove('popup-below')
                },
                { once: true }
            )
        } else {
            el.classList.remove('popup-below')
        }
    }

    function openPopup(sup: HTMLElement, btn: HTMLButtonElement) {
        // Popup is already absolutely positioned even when hidden (visibility:hidden
        // keeps layout). If its top would be negative, flip it below the reference.
        const popup = sup.querySelector<HTMLElement>('.footnote-popup')
        if (popup && popup.getBoundingClientRect().top < 0) {
            sup.classList.add('popup-below')
        }
        sup.classList.add('open')
        btn.setAttribute('aria-expanded', 'true')
        currentlyOpen = sup
    }

    function handleClick(e: MouseEvent) {
        const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(
            '.footnote-button'
        )
        if (btn) {
            e.stopPropagation()
            const sup = btn.closest<HTMLElement>('.footnote-ref')!
            if (currentlyOpen === sup) {
                closeOpen()
                return
            }
            closeOpen()
            openPopup(sup, btn)
            return
        }
        if (!(e.target as HTMLElement).closest('.footnote-ref')) {
            closeOpen()
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && currentlyOpen) {
            const btn =
                currentlyOpen.querySelector<HTMLButtonElement>(
                    '.footnote-button'
                )
            closeOpen()
            btn?.focus()
        }
    }

    $effect(() => {
        if (!browser) return
        document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('keydown', handleKeydown)
        }
    })
</script>
