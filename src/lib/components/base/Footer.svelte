<script>
    const year = new Date().getFullYear()
</script>

<footer>
    <p>
        &copy; {year} Russell McWhae.
        <a href="mailto:russell.mcwhae@gmail.com">Email Me</a>.
    </p>
    <p>
        A personal collection of <a href="/photography">images</a> and
        <a href="/journal">words</a>.
    </p>
</footer>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: var(--s1);
        margin-top: var(--s4);
        padding: var(--s2) 0 var(--s1);
        border-top: 1px solid var(--light-grey);
        color: var(--medium-grey);
        font-size: var(--text-xs);
    }

    p {
        margin: 0;
    }

    a {
        color: var(--medium-grey);
        font-weight: 500;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.18em;
    }

    a:hover {
        color: var(--high-contrast-color);
    }

    @include for-phone-only {
        footer {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    :global(body.toc-fab-visible) footer {
        padding-bottom: calc(
            56px + var(--s2) + 0.75rem + env(safe-area-inset-bottom, 0px)
        );
    }
</style>
