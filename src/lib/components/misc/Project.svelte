<script>
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import { preventLastTwoWordWrap } from '$lib/utils/string'

    let { project, reverse, children } = $props();

    const { title, description, stack, href, repoHref } = project
</script>

<div class="two-col-grid" class:reverse>
    {@render children?.()}
    <div class="details mb-2">
        <h2>{title}</h2>
        <p class="big">{@html preventLastTwoWordWrap(description)}</p>
        <div class="sub mb-2">{stack.join(' · ')}</div>

        <ButtonSet>
            {#if href}
                <Button {href} text="Visit site" right external />
            {/if}
            {#if repoHref}
                <Button href={repoHref} text="View repo" right external />
            {/if}
        </ButtonSet>
    </div>
</div>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    h2 {
        margin-bottom: 0;
    }
    .details {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        gap: var(--s-2);
    }
    .reverse > *:first-child {
        grid-column: 2;
        grid-row: 1;
    }
    .reverse > *:last-child {
        grid-column: 1;
        grid-row: 1;
    }
    @include for-tablet-portrait-down {
        .reverse > *:first-child {
            grid-column: inherit;
            grid-row: inherit;
        }
        .reverse > *:last-child {
            grid-column: inherit;
            grid-row: inherit;
        }
    }
</style>
