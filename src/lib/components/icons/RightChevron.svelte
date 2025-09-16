<script>
    import Icon from './Icon.svelte'

    /**
     * @typedef {Object} Props
     * @property {string} [height]
     */

    /** @type {Props} */
    let { height = '0.75em' } = $props();
</script>

<Icon viewBox="0 0 105 167" {height}>
    <path
        d="m20.833 0 83.334 83.333-83.334 83.334-20.833-20.834 62.5-62.5-62.5-62.5z"
    />
</Icon>
