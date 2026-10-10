<script>
    import dateformat from 'dateformat'

    let { date, compact = false } = $props()
</script>

<time class:caps={compact} class:compact
    >{dateformat(date, compact ? 'UTC:mmm d, yyyy' : 'UTC:mmmm d, yyyy')}</time
>

<style>
    .compact {
        color: var(--medium-grey);
    }
</style>
