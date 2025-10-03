<script>
    import { browser } from '$app/environment'
    import { mode } from '$lib/stores/theme'

    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte'

    $effect(() => {
        if (!$mode) {
            $mode = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
    })

    let nextMode = $derived($mode === 'dark' ? 'light' : 'dark')
    $effect(() => {
        if (browser) {
            window.document.body.setAttribute('data-theme', $mode)
        }
    })

    function changeTheme() {
        $mode = nextMode
    }
</script>

<div>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="toggle-wrapper">
        <div class={nextMode === 'dark' ? 'toggle disabled' : 'toggle enabled'}>
            <div class="icons">
                <IoMdSunny />
                <IoIosMoon />
            </div>
            <input
                id="toggle"
                name="toggle"
                type="checkbox"
                onclick={changeTheme}
            />
        </div>
    </label>
</div>

<style>
    .toggle-wrapper {
        width: 44px;
        display: block;
        --transition: var(--duration) ease;
    }

    .toggle {
        height: 22px;
        width: 44px;
        color: var(--high-contrast-color);
        border: 1px solid var(--high-contrast-color);
        border-radius: 40px;
        padding: 2px;
        position: relative;
        transition: background var(--transition);
        cursor: pointer;
    }

    .toggle::before {
        content: '';
        display: block;
        height: 16px;
        width: 16px;
        border-radius: 30px;
        background: var(--high-contrast-color);
        position: absolute;
        z-index: 2;
        transform: translate(0);
        transition:
            transform var(--transition),
            background var(--transition);
    }

    .toggle.enabled::before {
        transform: translateX(22px);
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
    }

    :global(.toggle .icons svg) {
        fill: var(--high-contrast-color);
        height: 18px;
        width: inherit;
        z-index: 0;
    }
    @media screen and (max-width: 1023px) {
        .toggle-wrapper {
            margin: 0 auto;
        }
    }
</style>
