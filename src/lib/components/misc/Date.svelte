<script>
    import dateformat from 'dateformat'

    export let date
</script>

<time>{dateformat(date, 'UTC:mmmm d, yyyy')}</time>
