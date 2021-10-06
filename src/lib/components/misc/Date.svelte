<script>
    import { format } from 'date-fns'

    export let date
</script>

<time>{format(new Date(date), 'MMMM d, yyyy')}</time>
