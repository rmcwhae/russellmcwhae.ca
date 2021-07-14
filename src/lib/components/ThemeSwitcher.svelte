<script>
    import { onMount } from 'svelte'
    import { theme as userTheme } from '$lib/stores/theme'

    onMount(() => {
        if (!$userTheme) {
            userTheme.set(
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
            )
        } else {
            userTheme.set($userTheme) // to trigger side effect
        }
    })
    $: nextTheme = $userTheme === 'dark' ? 'light' : 'dark'
    $: changeTheme = () => {
        userTheme.set(nextTheme)
    }
    const loading = typeof window === 'undefined'
</script>

<div>
    <button title="Use {nextTheme} theme" on:click={changeTheme}>
        {#if !loading}
            <span aria-hidden="true" class="icon">
                <!-- {#if nextTheme === "dark"}
        {:else}
        {/if} -->
            </span>
            <span class="text">
                {#if nextTheme === 'dark'}Dark{:else}Light{/if}
                mode
            </span>
        {/if}
    </button>
</div>

<style>
    /* your styles go here */
</style>
