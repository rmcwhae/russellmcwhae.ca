<script>
    import { onMount } from 'svelte'
    import { theme as userTheme } from '$lib/stores/theme'

    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoIosSunny from 'svelte-icons/io/IoIosSunny.svelte'

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
                {#if nextTheme === 'dark'}
                    <IoIosMoon />
                {:else}
                    <IoIosSunny />
                {/if}
            </span>
            <!-- <span class="text">
                {#if nextTheme === 'dark'}Dark{:else}Light{/if}
                mode
            </span> -->
        {/if}
    </button>
</div>

<style>
    button {
        border: 1px solid var(--medium-grey);
        color: var(--medium-grey);
        background: transparent;
        height: 1.8rem;
        border-radius: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        cursor: pointer;
        font-size: 0.9rem;
    }
    button .icon {
        height: 1rem;
        width: 1rem;
    }
</style>
