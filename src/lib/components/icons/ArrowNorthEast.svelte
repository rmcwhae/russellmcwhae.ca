<script>
    import Icon from './Icon.svelte'

    /**
     * @typedef {Object} Props
     * @property {string} [height]
     */

    /** @type {Props} */
    let { height = '0.85em' } = $props()
</script>

<Icon viewBox="0 0 16 16" {height}>
    <path
        d="M4 12 12 4M12 4H6.5M12 4v5.5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</Icon>
