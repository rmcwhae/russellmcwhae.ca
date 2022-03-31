<script context="module">
    export function load({ error, status }) {
        const { message } = error
        return {
            props: {
                title: status,
                message,
            },
        }
    }
</script>

<script>
    export let title
    export let message
</script>

<section>
    <h1>{title + ' Error'}</h1>

    <p>{message}</p>
</section>
