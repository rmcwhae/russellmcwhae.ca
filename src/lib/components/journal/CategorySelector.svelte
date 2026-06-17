<script>
    import { page } from '$app/state'
    import { resolve } from '$app/paths'
    import CategoryLink from './CategoryLink.svelte'
    import { JOURNAL_CATEGORIES } from '$lib/constants/journal'

    /** @type {{ counts?: Record<string, number> }} */
    let { counts = {} } = $props()

    /** @param {string} category */
    function isCategoryActive(category) {
        return (
            page.url.pathname ===
            resolve('/journal/category/[category]', { category })
        )
    }
</script>

<nav class="category-selector" aria-label="Journal categories">
    <ul class="category-selector-list">
        {#each JOURNAL_CATEGORIES as category (category)}
            <li>
                <CategoryLink {category} active={isCategoryActive(category)} />
                {#if counts[category] !== undefined}
                    <span class="category-count">{counts[category]}</span>
                {/if}
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    .category-selector {
        margin-top: 0;
    }

    .category-selector-list {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .category-selector-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--s-1) 0;
        margin: 0;
    }

    .category-selector-list li + li {
        border-top: 1px solid var(--light-grey);
    }

    .category-count {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        color: var(--medium-grey);
    }
</style>
