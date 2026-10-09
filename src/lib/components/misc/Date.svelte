<script>
    import dateformat from 'dateformat'

    let { date, compact = false } = $props()
</script>

<time class:compact
    >{dateformat(date, compact ? 'UTC:mmm d, yyyy' : 'UTC:mmmm d, yyyy')}</time
>

<style>
    .compact {
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--medium-grey);
    }
</style>
