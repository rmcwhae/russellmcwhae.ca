<script>
    import { generateSrc, generateSrcSets, sizes } from '$lib/utils/images'

    export let value
    const { name, filePath, width, height, thumbnail } = value

    $: srcset = generateSrcSets(filePath)
    $: src = generateSrc(filePath)
</script>

<!-- TODO make thumbnail… -->
<img {srcset} {src} {sizes} {width} {height} alt={name} />

<style>
    img {
        width: 100%;
        height: auto;
    }
</style>
