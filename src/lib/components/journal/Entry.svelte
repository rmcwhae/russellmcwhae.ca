<script>
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Date from '$lib/components/misc/Date.svelte'

    export let post

    $: ({ href, title, description, date, readingTime, category } = post)
</script>

<section>
    {#if date}
        <div class="sub">
            <Date {date} />
        </div>
    {/if}
    <h2>
        <a sveltekit:prefetch {href}>{@html preventLastTwoWordWrap(title)}</a>
    </h2>
    {#if description}
        <p>{@html preventLastTwoWordWrap(description)}</p>
    {/if}
    {#if category && readingTime}
        <div class="sub">
            <span>{category}</span>
            &middot;
            <span>{readingTime.text}</span>
        </div>
    {/if}
</section>

<style>
    h2 {
        margin: 0;
        line-height: 1.2;
    }
    h2 a {
        text-decoration: none;
    }
    p {
        margin: 0;
    }
    section {
        padding-bottom: var(--s0);
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        max-width: 50ch;
    }
    @media (max-width: 640px) {
        section {
            padding-bottom: var(--s0);
        }
    }
</style>
