<script>
    // Thanks to https://github.com/elianiva/elianiva.my.id
    import { beforeNavigate } from '$app/navigation'

    const resetProgress = () => {
        clearInterval(counter)
        width = 0
        speed = 0
    }
    const startProgress = () => {
        // A second navigation can start before the first one settles
        resetProgress()
        counter = setInterval(() => {
            if (width === 95) {
                clearInterval(counter)
                return
            }

            width += 5
            speed += 500
        }, speed)
    }

    let counter
    let width = $state(0)
    let speed = 10
    let isNavigating = $state(false)
    let latest = 0

    beforeNavigate(({ shallow, type, willUnload, complete }) => {
        // Leaving the site never completes, and a page restored from the
        // back/forward cache would show the bar stuck where it stopped
        if ((shallow && type === 'goto') || willUnload) return

        const id = ++latest
        isNavigating = true
        startProgress()

        // Settles on success, failure or cancellation alike; a superseded
        // navigation leaves the bar to the one that replaced it
        complete
            .catch(() => {})
            .finally(() => {
                if (id !== latest) return
                isNavigating = false
                resetProgress()
            })
    })
</script>

{#if isNavigating}
    <div class="loading" style="width: {width}%"></div>
{/if}

<style>
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        height: 0.25rem;
        background-color: var(--alpine);
        z-index: 50;
        transition: width ease-out 0.5s;
        width: 0;
    }
</style>
