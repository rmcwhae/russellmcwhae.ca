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
        d="m83.333 166.667-83.333-83.334 83.333-83.333 20.834 20.833-62.5 62.5 62.5 62.5z"
    />
</Icon>
