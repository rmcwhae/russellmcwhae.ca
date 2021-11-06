<script>
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import Button from '$lib/components/buttons/Button.svelte'

    export let title
    export let description
    export let href
    export let repoHref
    export let src
    export let stack
    export let index

    const reverse = index % 2 === 0
</script>

<div class="two-col-grid" class:reverse>
    <img srcset={src} type="image/webp" alt={title} />
    <div class="details">
        <h2>{title}</h2>
        <p>{description}</p>
        <div class="sub mb-2">{stack.join(' · ')}</div>

        <ButtonSet>
            <Button {href} text="Visit site" right external />
            {#if repoHref}
                <Button href={repoHref} text="View repo" right external />
            {/if}
        </ButtonSet>
    </div>
</div>

<style>
    img {
        border-radius: var(--radius);
        width: 100%;
        height: auto;
    }
    .details {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
    }
    .reverse > *:first-child {
        grid-column: 2;
        grid-row: 1;
    }
    .reverse > *:last-child {
        grid-column: 1;
        grid-row: 1;
    }
</style>
