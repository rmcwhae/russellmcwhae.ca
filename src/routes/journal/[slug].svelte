<script context="module">
    import { posts } from '$lib/services/posts'

    export const prerender = false // Necessary for the hit counter

    export async function load({ params, fetch }) {
        const { slug } = params
        const index = posts.findIndex((post) => slug === post.slug)

        if (index === -1) {
            return {
                status: 404,
                error: new Error('Page not found'),
            }
        }

        const {
            title,
            date,
            readingTime,
            component,
            description,
            category,
            tableOfContents,
        } = posts[index]
        const relatedPosts = posts
            .filter((post) => post.title !== title)
            .filter((post) => post.category === category)
            .slice(0, 4)

        let views = null

        try {
            const json = await fetch(`/journal/${slug}.json`).then((response) =>
                response.json()
            )
            const { hits } = json
            views = hits
        } catch (error) {
            console.log('error')
        }

        return {
            props: {
                title,
                date,
                category,
                views,
                readingTime,
                description,
                relatedPosts,
                component,
                tableOfContents,
            },
        }
    }
</script>

<script>
    import Date from '$lib/components/misc/Date.svelte'
    import { onMount, onDestroy } from 'svelte'
    import { browser } from '$app/env'
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let title
    export let date
    export let views
    export let category
    export let description
    export let readingTime
    export let component
    export let relatedPosts
    export let tableOfContents

    const viewText = views === 1 ? 'view' : 'views'

    let observer

    onMount(() => {
        if (browser) {
            function handleIntersect(entries, observer) {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('id')

                    if (entry.isIntersecting) {
                        document
                            .querySelectorAll(`.toc li`)
                            .forEach((element) => {
                                element.classList.remove('active')
                            })
                        document
                            .querySelector(`.toc li a[href="#${id}"]`)
                            .parentElement.classList.add('active')
                    }
                })
            }
            // const options = { threshold: 1, rootMargin: '100% 0% -100%' }
            observer = new IntersectionObserver(handleIntersect)

            const headings = document.querySelectorAll('h2[id], h3[id]')

            headings.forEach((heading) => {
                observer.observe(heading)
            })
        }
    })

    onDestroy(() => {
        if (observer) {
            observer.disconnect()
        }
    })
</script>

<SEO title={'Journal » ' + title} {description} />

<header>
    <div class="sub">
        <Date {date} />
    </div>
    <h1>{@html preventLastTwoWordWrap(title)}</h1>
    {#if description}
        <p>{@html preventLastTwoWordWrap(description)}</p>
    {/if}
    <div class="sub">
        <span>{category}</span>
        &middot;
        <span class="nowrap">{readingTime.words} words</span>
        &middot;
        <span class="nowrap">{readingTime.text}</span>
        {#if views}
            &middot;
            <span class="nowrap">{views} {viewText}</span>
        {/if}
    </div>
</header>

<div class="wrapper" class:offset={tableOfContents}>
    {#if tableOfContents}
        <aside class="toc">
            {@html tableOfContents}
        </aside>
    {/if}

    <article class="char-limit flow">
        <svelte:component this={component} />
    </article>
</div>

<div class="restricted-width">
    <h2 class="mt-5 mb-3">Related Entries</h2>
    <JournalEntrySet posts={relatedPosts} />

    <div class="mt-3">
        <ButtonSet>
            <Button href="/journal" text="All entries" right />
        </ButtonSet>
    </div>
</div>

<style>
    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--s-1);
        margin-bottom: var(--s2);
    }
    h1,
    p {
        margin: 0;
    }
    aside {
        position: sticky;
        top: var(--s0);
        max-height: calc(100vh - var(--s0));
        overflow: auto;
        flex: 0 100000 250px;
    }
    article {
        margin: 0 auto;
    }
    .wrapper {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .offset {
        padding-right: 250px;
    }
</style>
