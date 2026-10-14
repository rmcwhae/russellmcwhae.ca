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
        d="M2 5.15h2.15L5.2 3.4h5.6l1.05 1.75H14a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75V5.9a.75.75 0 0 1 .75-.75Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linejoin="round"
    />
    <circle
        cx="8"
        cy="8.9"
        r="1.85"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
    />
</Icon>
