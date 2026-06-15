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
        margin-top: 0;
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
