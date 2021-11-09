<script>
    import Button from '$lib/components/buttons/Button.svelte'
    export let year
    export let filename

    const href = '/pdf/' + filename
</script>

<section>
    <a {href} target="_blank" rel="noopener noreferrer nofollow"><slot /></a>
    <div class="flex justify-between items-center mb-2">
        <h2>{year}</h2>
        <Button text="Preview" {href} external right />
    </div>
</section>

<style>
    h2 {
        margin: 0;
    }
    div {
        margin-top: var(--s-1);
    }
</style>
