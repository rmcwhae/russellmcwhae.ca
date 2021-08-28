<script>
    import { generateSrcSets, sizes } from '$lib/utils/images'
    import 'lazysizes'

    export let name
    export let filePath
    export let width
    export let height
    export let thumbnail

    $: srcset = generateSrcSets(filePath)
</script>

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
