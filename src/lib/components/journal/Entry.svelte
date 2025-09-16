<script>
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Date from '$lib/components/misc/Date.svelte'
    import CategoryLink from './CategoryLink.svelte'

    export let post
    export let featured = false

    $: ({ href, title, description, date, readingTime, category } = post)
</script>

<section class:featured>
    {#if date}
        <div class="sub">
            <Date {date} />
        </div>
    {/if}
    <h3>
        <a data-sveltekit-prefetch {href}
            >{@html preventLastTwoWordWrap(title)}</a
        >
    </h3>
    {#if description}
        <p class:big={featured}>{@html preventLastTwoWordWrap(description)}</p>
    {/if}
    {#if category && readingTime}
        <div class="sub">
            <CategoryLink {category} />
            &middot;
            <span>{readingTime.text}</span>
        </div>
    {/if}
</section>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    h3 {
        margin: 0;
        line-height: 1.2;
    }
    p {
        margin: 0;
    }
    section {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
    }
    section.featured {
        padding-top: var(--s0);
    }

    @media (max-width: 640px) {
        section {
            padding-bottom: var(--s0);
        }
    }

    @include for-tablet-portrait-up {
        section.featured {
            padding: var(--s4) 0;
        }
        .featured h3 {
            font-size: 3.052rem;
        }
    }
</style>
