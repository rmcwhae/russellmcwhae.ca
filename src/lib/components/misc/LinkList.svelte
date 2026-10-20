<script>
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

<div>
    <h2 class="eyebrow">{heading}</h2>
    <ul class="link-list">
        {#each items as item (item.href)}
            <li>
                <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                >
                    <span class="link-list-title">{item.title}</span>
                    {#if item.description}
                        <span class="link-list-description"
                            >{item.description}</span
                        >
                    {/if}
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    h2 {
        margin: 0;
    }
</style>
