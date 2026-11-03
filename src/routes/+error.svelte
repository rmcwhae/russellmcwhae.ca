<script>
    import { page } from '$app/state'
    import ErrorPage from '#lib/components/base/ErrorPage.svelte'

    let notFound = $derived(page.status === 404)
    let title = $derived(notFound ? 'Page not found' : 'Something went wrong')
    let lede = $derived(
        notFound
            ? 'That page doesn’t exist, or it has moved.'
            : 'Something broke on my end. Please try again in a moment.'
    )
</script>

<ErrorPage status={page.status} {title} {lede} />
