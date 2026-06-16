<script>
    import { browser } from '$app/environment'

    /** @type {HTMLElement | null} */
    let currentlyOpen = null

    function closeOpen() {
        if (!currentlyOpen) return
        const el = currentlyOpen
        el.classList.remove('open')
        el.querySelector('.footnote-button')?.setAttribute(
            'aria-expanded',
            'false'
        )
        currentlyOpen = null
        // Defer removing popup-below until after the transition so the popup
        // doesn't snap position mid-fade.
        const popup = el.querySelector('.footnote-popup')
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

    /** @param {HTMLElement} sup @param {HTMLElement} btn */
    function openPopup(sup, btn) {
        // Popup is already absolutely positioned even when hidden (visibility:hidden
        // keeps layout). If its top would be negative, flip it below the reference.
        const popup = sup.querySelector('.footnote-popup')
        if (popup && popup.getBoundingClientRect().top < 0) {
            sup.classList.add('popup-below')
        }
        sup.classList.add('open')
        btn.setAttribute('aria-expanded', 'true')
        currentlyOpen = sup
    }

    /** @param {MouseEvent} e */
    function handleClick(e) {
        const btn = e.target.closest('.footnote-button')
        if (btn) {
            e.stopPropagation()
            const sup = btn.closest('.footnote-ref')
            if (!sup) return
            if (currentlyOpen === sup) {
                closeOpen()
                return
            }
            closeOpen()
            openPopup(sup, btn)
            return
        }
        if (!e.target.closest('.footnote-ref')) {
            closeOpen()
        }
    }

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.key === 'Escape' && currentlyOpen) {
            const btn = currentlyOpen.querySelector('.footnote-button')
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
