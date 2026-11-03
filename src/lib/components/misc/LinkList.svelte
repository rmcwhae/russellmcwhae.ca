<script>
    import { resolve } from '$app/paths'
    /**
     * @typedef {Object} Item
     * @property {string} href
     * @property {string} title
     * @property {string} [description]
     * @property {boolean} [external]
     */

    /**
     * @typedef {Object} Props
     * @property {string} heading
     * @property {Item[]} items
     */

    /** @type {Props} */
    let { heading, items } = $props()
</script>

{#snippet content(/** @type {Item} */ item)}
    <span class="link-list-title">{item.title}</span>
    {#if item.description}
        <span class="link-list-description">{item.description}</span>
    {/if}
{/snippet}

<div>
    <h2 class="eyebrow">{heading}</h2>
    <ul class="link-list">
        {#each items as item (item.href)}
            <li>
                {#if item.external}
                    <a
                        href={item.href}
                        target="_blank"
                        rel="external noopener noreferrer"
                    >
                        {@render content(item)}
                    </a>
                {:else}
                    <a href={resolve(item.href)}>
                        {@render content(item)}
                    </a>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<style>
    h2 {
        margin: 0;
    }
</style>
