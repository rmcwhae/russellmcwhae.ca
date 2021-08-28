<script>
    import Image from '$lib/components/Image.svelte'

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
        <h2>{title}</h2>
    </a>
    <p class="sub">{date} &middot; {count} photos</p>
</section>

<style>
    /* div {
        position: relative;
    } */
    h2 {
        margin: var(--s0) 0 0;
    }
    a {
        text-decoration: none;
    }
    p {
        margin-top: var(--s-3);
        margin-bottom: 0;
    }
    section {
        margin-top: var(--s2);
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
    }
</style>
