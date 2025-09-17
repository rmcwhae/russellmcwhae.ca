<script>
    import dateformat from 'dateformat'

    let { date } = $props()
</script>

<div class="sub">
    <time>{dateformat(date, 'UTC:mmmm d, yyyy')}</time>
</div>

<style>
    div {
        border-top: 1px solid var(--light-grey);
        padding-top: var(--s-2);
        margin-top: var(--s4);
    }
</style>
