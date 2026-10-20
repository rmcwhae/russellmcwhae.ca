<script>
    import { resolve } from '$app/paths'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import LinkList from '#lib/components/misc/LinkList.svelte'
    import { EDITOR_PICKS } from '#lib/constants/journal'

    let { data } = $props()
    let posts = $derived(data.posts)
    let totalWordCount = $derived(data.totalWordCount)

    const starters = EDITOR_PICKS.map((pick) => ({
        href: resolve('/journal/[slug]', { slug: pick.slug }),
        title: pick.title,
    }))

    const lede = 'Long-form thoughts on technology, the outdoors, and life.'
</script>

<SEO title="Journal" description={lede} />

<header class="page-header">
    <h1>Journal</h1>
    <p class="lede">{lede}</p>
</header>

<div class="sidebar-layout">
    <div class="sidebar-layout-main archive">
        <JournalEntrySet {posts} />
    </div>

    <aside class="sidebar-layout-aside">
        <div class="about">
            <h2 class="eyebrow">About</h2>
            <p>
                I’ve kept an online journal since 2016. Text generation and
                ideas are my own, though I do use AI for editing and refining as
                <span class="nowrap">of 2025.</span>
            </p>
            <p>
                <a class="text-link" href={resolve('/reading-list')}
                    >Reading list</a
                >
            </p>
        </div>
        <LinkList heading="Start here" items={starters} />
        <p class="count">
            Total words: {totalWordCount.toLocaleString('en-US')}
        </p>
    </aside>
</div>

<style>
    .archive :global(.entries > section:last-child) {
        border-bottom: none;
    }

    .about h2 {
        margin: 0;
    }

    .about p {
        margin: var(--s0) 0 0;
        font-size: var(--text-sm);
        line-height: var(--leading-compact);
    }

    .count {
        margin: 0;
        font-size: var(--text-sm);
        color: var(--medium-grey);
    }
</style>
