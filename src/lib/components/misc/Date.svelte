<script>
    import dateformat from 'dateformat'

    let { date } = $props()
</script>

<time>{dateformat(date, 'UTC:mmmm d, yyyy')}</time>
