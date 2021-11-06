<script>
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import Button from '$lib/components/buttons/Button.svelte'

    export let title
    export let description
    export let href
    export let repoHref
    export let src
    export let stack
</script>

<img srcset={src} type="image/webp" alt={title} />

<h2>{title}</h2>
<p>{description}</p>
<div class="sub">{stack.join(' · ')}</div>

<ButtonSet>
    <Button {href} text="Visit site" right external />
    {#if repoHref}
        <Button href={repoHref} text="View repo" right external />
    {/if}
</ButtonSet>
