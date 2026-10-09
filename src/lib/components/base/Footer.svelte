<script>
    import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte'
    import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte'
    import IoIosMail from 'svelte-icons/io/IoIosMail.svelte'

    const year = new Date().getFullYear()
</script>

<footer>
    <div class="meta">
        <p>
            &copy; {year} Russell McWhae.
            <span class="nowrap">Made in Canada.</span>
        </p>
        <div class="icons">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a
                href="javascript:window.location.href=atob('bWFpbHRvOnJ1c3NlbGwubWN3aGFlQGdtYWlsLmNvbQ==')"
                rel="noopener noreferrer nofollow"
                aria-label="Email"><IoIosMail /></a
            >
            <a
                href="https://github.com/rmcwhae"
                rel="noopener noreferrer nofollow"
                target="_blank"
                aria-label="GitHub"><IoLogoGithub /></a
            >
            <a
                href="https://www.linkedin.com/in/rmcwhae/"
                rel="noopener noreferrer nofollow"
                target="_blank"
                aria-label="LinkedIn"><IoLogoLinkedin /></a
            >
        </div>
    </div>
    <nav aria-label="Footer">
        <a href="/photography">Photography</a>
        <a href="/journal">Journal</a>
        <a href="/about">About</a>
    </nav>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: var(--s1);
        margin-top: var(--s4);
        padding: var(--s2) 0 var(--s1);
        border-top: 1px solid var(--light-grey);
        color: var(--medium-grey);
        font-size: 0.85rem;
    }

    .meta {
        display: flex;
        flex-direction: column;
        gap: var(--s-2);
    }

    .meta p {
        margin: 0;
    }

    nav {
        display: flex;
        gap: var(--s1);
    }

    nav a {
        color: var(--medium-grey);
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-decoration: none;
        text-transform: uppercase;
    }

    nav a:hover {
        color: var(--high-contrast-color);
        text-decoration: none;
    }

    a {
        color: var(--high-contrast-color);
    }

    .icons {
        display: flex;
        align-items: center;
    }

    .icons a:not(:last-of-type) {
        margin-right: var(--s-1);
    }

    :global(.icons svg) {
        height: 1.25rem !important;
        width: auto !important;
        display: inline;
    }

    @media (max-width: 700px) {
        footer {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
