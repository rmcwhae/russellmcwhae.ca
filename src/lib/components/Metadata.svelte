<script>
    export let title
    export let description
    export let author
    export let date
</script>

<h1>{title}</h1>
<h2>{description}</h2>
<p class="date">on: {date}</p>
<p class="date">by: {author}</p>

<slot />

<style>
    :global(.footnote-backref) {
        margin-left: var(--s-2);
    }
</style>
