<script>
    import { generateSrcSets, sizes } from '$lib/utils/images'
    import 'lazysizes'

    export let name
    export let filePath
    export let width
    export let height
    export let thumbnail
    export let lockedRatio = false

    const srcset = generateSrcSets(filePath)
</script>

<div class:lockedRatio>
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
</div>

<style>
    img {
        width: 100%;
        height: auto;
        border-radius: var(--radius);
    }
    .lockedRatio {
        position: relative;
    }

    /* Create a pseudo element that uses padding-bottom to take up space */
    .lockedRatio::after {
        display: block;
        content: '';
        padding-bottom: 66.67%;
    }

    /* Image is positioned absolutely relative to the parent element */
    .lockedRatio img {
        /* Image should match parent box size */
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
