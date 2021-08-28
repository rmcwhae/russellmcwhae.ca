<script>
    import Image from '$lib/components/Image.svelte'

    export let eventName
    export let title
    export let date
    export let count
    export let featuredImage

    const { name, filePath, width, height } = featuredImage
</script>

<section>
    <h2><a href={'/events/' + eventName}>{title}</a></h2>

    <p class="sub">{date} &middot; {count} photos</p>

    <Image {name} {filePath} {width} {height} />
</section>

<style>
</style>
