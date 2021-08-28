<script>
    import { generateSrc, generateSrcSets, sizes } from '$lib/utils/images'
    import 'lazysizes'

    export let value
    const { name, filePath, width, height, thumbnail } = value

    $: srcset = generateSrcSets(filePath)
    $: src = generateSrc(filePath)
</script>

<!-- TODO make thumbnail… -->
<img
    data-sizes="auto"
    data-srcset={srcset}
    src={thumbnail}
    {sizes}
    {width}
    {height}
    alt={name}
    class="lazyload"
/>

<style>
    img {
        width: 100%;
        height: auto;
    }
</style>
