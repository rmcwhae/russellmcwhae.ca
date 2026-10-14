<script>
    /**
     * @typedef {Object} Props
     * @property {string} avif
     * @property {string} webp
     * @property {string} jpeg
     * @property {string} src
     * @property {string} sizes
     * @property {number} width
     * @property {number} height
     * @property {string} [alt]
     * @property {'eager' | 'lazy'} [loading]
     * @property {'high' | 'low' | 'auto'} [fetchpriority]
     * @property {string} [class]
     */

    /** @type {Props} */
    let {
        avif,
        webp,
        jpeg,
        src,
        sizes,
        width,
        height,
        alt = '',
        loading = undefined,
        fetchpriority = undefined,
        class: className = undefined,
    } = $props()
</script>

<picture class={className}>
    <source type="image/avif" srcset={avif} {sizes} />
    <source type="image/webp" srcset={webp} {sizes} />
    <img
        {src}
        srcset={jpeg}
        {sizes}
        {width}
        {height}
        {alt}
        {loading}
        {fetchpriority}
    />
</picture>
