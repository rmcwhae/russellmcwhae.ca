<script>
    import Date from '$lib/components/Date.svelte'

    export let post

    $: ({ slug, title, description, date, readingTime, category } = post)
</script>

<section>
    <div class="sub">
        <Date {date} />
    </div>
    <h2>
        <a sveltekit:prefetch href={'/journal/' + slug}>{title}</a>
    </h2>
    {#if description}
        <p>{description}</p>
    {/if}
    <div class="sub">
        <span>{category}</span>
        &middot;
        <span>{readingTime.text}</span>
    </div>
</section>

<style>
    h2 {
        margin: 0;
    }
    h2 a {
        text-decoration: none;
    }
    p {
        margin: 0;
    }
    section {
        padding-bottom: var(--s1);
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s1);
    }
</style>
