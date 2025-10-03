<script>
    // Thanks to https://github.com/elianiva/elianiva.my.id
    import { beforeNavigate, afterNavigate } from '$app/navigation'

    const resetProgress = () => {
        clearInterval(counter)
        width = 0
        speed = 0
    }
    const startProgress = () => {
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

    beforeNavigate(() => {
        isNavigating = true
        startProgress()
    })

    afterNavigate(() => {
        isNavigating = false
        resetProgress()
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
        background-color: var(--medium-grey);
        z-index: 50;
        transition: width ease-out 0.5s;
        width: 0;
    }
</style>
