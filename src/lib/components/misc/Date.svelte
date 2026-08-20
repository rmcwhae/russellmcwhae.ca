<script>
    import dateformat from 'dateformat'

    let { date, format = 'UTC:mmmm d, yyyy' } = $props()
</script>

<time>{dateformat(date, format)}</time>
