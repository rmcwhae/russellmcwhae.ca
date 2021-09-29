<script>
    import Image from '$lib/components/Image.svelte'
    import * as StringUtils from '$lib/utils/string'

    export let eventName
    export let title
    export let date
    export let count
    export let featuredImage

    const { name, filePath, width, height, thumbnail } = featuredImage
</script>

<section>
    <a href={'/events/' + eventName}>
        <Image {name} {filePath} {width} {height} {thumbnail} lockedRatio />
        <h2>{@html StringUtils.preventLastTwoWordWrap(title)}</h2>
    </a>
    <p class="sub">{date} &middot; {count} photos</p>
</section>

<style>
    /* div {
        position: relative;
    } */
    h2 {
        margin: var(--s-1) 0 0;
        font-weight: normal;
        font-size: 1.2em;
    }
    a {
        text-decoration: none;
    }
    p {
        margin-top: 0;
        margin-bottom: 0;
    }
    section {
        /* margin-top: var(--s0); */
        padding-bottom: var(--s0);
        /* border-bottom: 1px solid var(--light-grey); */
    }
</style>
