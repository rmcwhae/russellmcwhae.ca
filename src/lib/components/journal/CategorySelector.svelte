<script>
    import { page } from '$app/state'
    import { resolve } from '$app/paths'
    import CategoryLink from './CategoryLink.svelte'
    import { JOURNAL_CATEGORIES } from '$lib/constants/journal'

    /** @param {string} category */
    function isCategoryActive(category) {
        return (
            page.url.pathname ===
            resolve('/journal/category/[category]', { category })
        )
    }
</script>

<nav class="category-selector" aria-label="Journal categories">
    <h3 class="category-selector-heading">Categories</h3>
    <ul class="category-selector-list">
        {#each JOURNAL_CATEGORIES as category (category)}
            <li>
                <CategoryLink {category} active={isCategoryActive(category)} />
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    .category-selector {
        margin-top: var(--s1);
    }

    .category-selector-heading {
        margin: 0 0 var(--s-2);
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-color);
    }

    .category-selector-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--s-2);
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .category-selector-list li {
        margin: 0;
    }
</style>
