<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import { resolve } from '$app/paths'

    let { title, description, children } = $props()
</script>

<SEO {title} {description} />

<div class="about-page">
    <section class="about-header border-bottom full-bleed">
        <div class="restricted-width">
            <header>
                <div class="kicker">Personal</div>
                <h1>{title}</h1>
                {#if description}
                    <p class="big">{description}</p>
                {/if}
            </header>
        </div>
    </section>

    <div class="about-body">
        <article class="about-prose char-limit flow">
            {@render children?.()}
        </article>

        <aside class="about-sidebar">
            <img
                src={resolve('/russell.png')}
                alt="Russell McWhae"
                class="about-portrait"
                width="260"
                height="260"
            />

            <div class="about-facts">
                <div class="fact-group">
                    <div class="fact-label">Location</div>
                    <div class="fact-value">British Columbia, Canada</div>
                </div>
                <div class="fact-group">
                    <div class="fact-label">Background</div>
                    <div class="fact-value">
                        Civil &amp; Biomedical Engineering
                    </div>
                </div>
            </div>

            <nav class="about-links">
                <a href={resolve('/photography')} class="accent-link-plain"
                    >Photography →</a
                >
                <a href={resolve('/journal')} class="accent-link-plain"
                    >Journal →</a
                >
                <a href={resolve('/uses')} class="accent-link-plain"
                    >What I Use →</a
                >
            </nav>
        </aside>
    </div>
</div>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .about-header {
        margin-bottom: var(--s1);
        padding-bottom: var(--s0);
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--s-1);
        text-align: center;
    }

    h1,
    p {
        margin: 0;
    }

    h1 {
        font-weight: normal;
        font-variant-numeric: lining-nums;
        font-feature-settings: 'lnum' 1;
    }

    .about-body {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s1);
        align-items: start;

        @include for-tablet-landscape-up {
            row-gap: var(--s1);
            column-gap: 0;
            grid-template-columns:
                calc((100% - min(60ch, 100%)) / 2)
                min(60ch, 100%)
                var(--s3)
                260px
                minmax(0, 1fr);
        }
    }

    .about-prose {
        margin: 0 auto;
        min-width: 0;
        width: 100%;
        font-variant-numeric: lining-nums;
        font-feature-settings: 'lnum' 1;

        @include for-tablet-landscape-up {
            grid-column: 2;
            margin: 0;
        }
    }

    .about-sidebar {
        display: flex;
        flex-direction: column;
        gap: var(--s2);

        @include for-tablet-portrait-down {
            order: -1;
        }

        @include for-tablet-landscape-up {
            grid-column: 4;
            width: 260px;
            position: sticky;
            top: var(--s2);
        }
    }

    .about-portrait {
        width: 100%;
        height: auto;
        border-radius: var(--radius);
        display: block;

        @include for-tablet-portrait-down {
            width: 160px;
        }
    }

    .about-facts {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        padding-top: var(--s0);
        border-top: 1px solid var(--light-grey);
    }

    .fact-group {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .fact-label {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--medium-grey);
    }

    .fact-value {
        font-size: var(--text-base);
        color: var(--high-contrast-color);
    }

    .about-links {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        padding-top: var(--s0);
        border-top: 1px solid var(--light-grey);
    }

    @include for-tablet-landscape-up {
        .about-header {
            margin-bottom: var(--s3);
            padding: var(--s3) 0 var(--s4);
        }

        header {
            align-items: flex-start;
            gap: var(--s-1);
            text-align: left;
        }

        h1 {
            font-size: max(3em, var(--text-2xl));
            line-height: 1.1;
        }

        header p {
            max-width: 70ch;
        }
    }

    @include for-laptop-only {
        .about-header {
            margin-bottom: var(--s2);
            padding: var(--s2) 0 var(--s3);
        }

        h1 {
            font-size: max(2.5em, var(--text-2xl));
        }

        header p:global(.big) {
            font-size: var(--text-xl);
        }
    }

    @include for-desktop-up {
        header {
            gap: var(--s1);
        }
    }
</style>
