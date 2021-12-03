<script>
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import PurchaseCalendar from '$lib/components/misc/PurchaseCalendar.svelte'

    export let filename
    export let purchase = false

    const href = '/pdf/' + filename
</script>

<section>
    <a {href} target="_blank" rel="noopener noreferrer nofollow"><slot /></a>
    <div class="mb-2">
        {#if purchase}
            <ButtonSet>
                <Button text="Preview" {href} external right />
                <PurchaseCalendar />
            </ButtonSet>
        {:else}
            <Button text="Preview" {href} external right />
        {/if}
    </div>
</section>

<style>
    div {
        margin-top: var(--s-1);
    }
</style>
