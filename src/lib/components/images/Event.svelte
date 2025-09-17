<script>
    import Image from './Image.svelte'
    import * as StringUtils from '$lib/utils/string'

    let { eventName, title, date, count, featuredImage } = $props()

    const { name, filePath, width, height, lqip } = featuredImage
</script>

<section>
    <a href={'/events/' + eventName} data-sveltekit-prefetch>
        <Image
            {name}
            {filePath}
            {width}
            {height}
            {lqip}
            lockedRatio
            photoswipe={false}
        />
        <h4>{title}</h4>
    </a>
    <p class="sub">{date} &middot; {count} photos</p>
</section>

<style>
    /* div {
        position: relative;
    } */
    h4 {
        margin: var(--s-2) 0 0;
        line-height: 1.2;
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
