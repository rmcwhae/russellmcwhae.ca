<script>
    import Button from '$lib/components/buttons/Button.svelte'
    export let filename

    const href = '/pdf/' + filename
</script>

<section>
    <a {href} target="_blank" rel="noopener noreferrer nofollow"><slot /></a>
    <div class="mb-2">
        <Button text="Preview" {href} external right />
    </div>
</section>

<style>
    div {
        margin-top: var(--s-1);
    }
</style>
