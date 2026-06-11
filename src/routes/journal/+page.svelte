<script>
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props()
    let posts = $derived(data.posts)
    let totalWordCount = $derived(data.totalWordCount)
</script>

<SEO title="Journal" />

<div class="journal restricted-width">
    <aside class="journal-intro">
        <div class="journal-intro-spacer" aria-hidden="true">
            <h4 class="mt-3">&nbsp;</h4>
        </div>
        <p>
            Welcome to my online journal, a collection of infrequently published,
            long-form thoughts on topics that are important to me. While AI is
            used solely to assist with editing and refining my work, all text
            generation and ideas are my own. I hope you’ll join me for a glimpse
            into my head.
        </p>
    </aside>

    <div class="journal-main">
        <JournalEntrySet {posts} layout="archive" />

        <p class="count sub mt-2">Total written words: {totalWordCount}</p>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .journal {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s2);
    }

    .journal-intro p {
        margin: 0;
    }

    .journal-intro-spacer {
        display: none;
    }

    .count {
        text-align: left;
    }

    @include for-tablet-landscape-up {
        .journal {
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            gap: var(--s4);
            align-items: start;
        }

        .journal-intro {
            grid-column: 2;
            grid-row: 1;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .journal-intro-spacer {
            display: block;
        }

        .journal-intro-spacer h4 {
            visibility: hidden;
        }

        .journal-intro p {
            margin-top: -5px;
        }

        .journal-main {
            grid-column: 1;
            grid-row: 1;
        }
    }
</style>
