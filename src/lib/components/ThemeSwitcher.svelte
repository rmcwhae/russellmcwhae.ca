<script>
    import { onMount } from 'svelte'
    import { theme as userTheme } from '$lib/stores/theme'

    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte'

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
</script>

<div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="toggle-wrapper">
        <div
            class={nextTheme === 'dark' ? 'toggle disabled' : 'toggle enabled'}
        >
            <div class="icons">
                <IoMdSunny />
                <IoIosMoon />
            </div>
            <input
                id="toggle"
                name="toggle"
                type="checkbox"
                on:click={changeTheme}
            />
        </div>
    </label>
</div>

<style>
    .toggle-wrapper {
        width: 50px;
        display: block;
        --transition: var(--duration) ease;
    }

    .toggle {
        height: 24px;
        width: 50px;
        color: var(--text-color);
        border: 1px solid var(--text-color);
        border-radius: 40px;
        padding: 2px;
        position: relative;
        transition: background var(--transition);
        cursor: pointer;
    }

    .toggle::before {
        content: '';
        display: block;
        height: 18px;
        width: 18px;
        border-radius: 30px;
        background: var(--text-color);
        position: absolute;
        z-index: 2;
        transform: translate(0);
        transition: transform var(--transition), background var(--transition);
    }

    .toggle.enabled::before {
        transform: translateX(26px);
    }

    .toggle input {
        opacity: 0;
        position: absolute;
        top: 0;
    }

    .toggle .icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        /* margin: 0 5px; */
    }

    :global(.toggle .icons svg) {
        fill: var(--text-color);
        height: 18px;
        width: 18px;
        z-index: 0;
    }
</style>
