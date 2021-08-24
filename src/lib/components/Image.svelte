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
    data-src={`http://localhost:8000/?path=${title}&format=webp&width={width}`}
    data-sizes="auto"
    {width}
    {height}
    alt={src}
/>
