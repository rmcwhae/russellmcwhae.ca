<script>
    let { text = '' } = $props()

    const words = $derived(text.split(' '))
    const needsWrap = $derived(words.length > 2)
    const lead = $derived(needsWrap ? words.slice(0, -2).join(' ') + ' ' : '')
    const tail = $derived(needsWrap ? words.slice(-2).join(' ') : text)
</script>

{#if needsWrap}
    {lead}<span class="nowrap">{tail}</span>
{:else}
    {tail}
{/if}
