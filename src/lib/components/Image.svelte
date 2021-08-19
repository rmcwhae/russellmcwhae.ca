<script>
    export let src
    export let width
    export let height
    export let title
    export let description
</script>

<img
    {title}
    {description}
    data-src={src}
    {width}
    {height}
    class="lazyload"
    alt={src}
/>
