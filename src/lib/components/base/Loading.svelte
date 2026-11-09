<script>
    // Thanks to https://github.com/elianiva/elianiva.my.id
    import { beforeNavigate } from '$app/navigation'

    let isNavigating = $state(false)
    let latest = $state(0)

    beforeNavigate(({ shallow, type, willUnload, complete }) => {
        // Leaving the site never completes, and a page restored from the
        // back/forward cache would show the bar stuck where it stopped
        if ((shallow && type === 'goto') || willUnload) return

        const id = ++latest
        isNavigating = true

        // Settles on success, failure or cancellation alike; a superseded
        // navigation leaves the bar to the one that replaced it
        complete
            .catch(() => {})
            .finally(() => {
                if (id === latest) isNavigating = false
            })
    })
</script>

{#if isNavigating}
    <!-- Keyed so a second navigation restarts the bar from zero -->
    {#key latest}
        <div class="loading"></div>
    {/key}
{/if}

<style>
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        height: 0.25rem;
        background-color: var(--alpine);
        z-index: 50;
        width: 95%;
        animation: progress 0.5s ease-out;
    }

    @keyframes progress {
        from {
            width: 0;
        }
    }
</style>
