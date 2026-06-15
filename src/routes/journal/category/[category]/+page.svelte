<script>
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import CategoryLink from '$lib/components/journal/CategoryLink.svelte'
    import { CATEGORY_META } from '$lib/constants/journal'
    import { resolve } from '$app/paths'

    let { data } = $props()

    let posts = $derived(data.posts)
    let category = $derived(data.category)
    let otherCategories = $derived(data.otherCategories)
    let meta = $derived(CATEGORY_META[category] ?? null)
</script>

<SEO title="Journal" />

<div class="restricted-width">
    <div class="category-header">
        {#if meta}
            <div
                class="category-rule"
                style="background: {meta.color}; --color-dark: {meta.colorDark}"
            ></div>
        {/if}
        <h2>Entries in “{category}”</h2>
        {#if meta}
            <p class="category-desc">{meta.description}</p>
        {/if}
    </div>
    <div class="flow mb-2">
        <p class="nav-line">
            <span class="nav-label">Other categories:</span>
            {#each otherCategories as otherCategory, i (otherCategory)}
                <CategoryLink
                    category={otherCategory}
                />{#if i !== otherCategories.length - 1}<span></span>{/if}
            {/each}
            <a href={resolve('/journal')} class="all-entries"
                ><span>All entries</span> →</a
            >
        </p>
    </div>

    <JournalEntrySet {posts} />
</div>

<style lang="scss">
    .category-header {
        margin-bottom: var(--s0);
    }

    .category-rule {
        width: 40px;
        height: 3px;
        margin-top: var(--s2);
        margin-bottom: var(--s-2);
    }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light'])) .category-rule {
            background: var(--color-dark) !important;
        }
    }

    :global(html body[data-theme='dark']) .category-rule {
        background: var(--color-dark) !important;
    }

    h2 {
        margin: 0 0 var(--s-2);
    }

    .category-desc {
        font-size: 15px;
        color: var(--text-color);
        margin: 0;
    }

    .nav-line {
        display: flex;
        align-items: baseline;
        font-size: 15px;
        color: var(--text-color);
        margin: 0;
    }

    span {
        margin-left: var(--s-2);
        margin-right: var(--s-2);
    }

    .nav-label {
        margin-left: 0;
        margin-right: var(--s0);
    }

    .all-entries {
        margin-left: auto;
        font-family: var(--font-sans);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--high-contrast-color);
        text-decoration: none;

        span {
            margin: 0;
            text-decoration: underline;
            text-decoration-color: var(--accent);
            text-decoration-thickness: 3px;
            text-underline-offset: 5px;
        }

        &:hover {
            color: var(--accent);

            span {
                text-decoration-color: var(--accent);
            }
        }
    }
</style>
