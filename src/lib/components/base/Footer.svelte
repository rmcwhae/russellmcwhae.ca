<script>
    import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte'
    import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte'
    import IoIosMail from 'svelte-icons/io/IoIosMail.svelte'

    const year = new Date().getFullYear()
</script>

<footer>
    <div class="wrapper">
        <div class="text">
            &copy; {year} Russell McWhae.
            <span class="nowrap">Made in Canada.</span>
        </div>
        <div class="icons">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a
                href="javascript:window.location.href=atob('bWFpbHRvOnJ1c3NlbGwubWN3aGFlQGdtYWlsLmNvbQ==')"
                rel="noopener noreferrer nofollow"><IoIosMail /></a
            >
            <a
                href="https://github.com/rmcwhae"
                rel="noopener noreferrer nofollow"
                target="_blank"><IoLogoGithub /></a
            >
            <a
                href="https://www.linkedin.com/in/rmcwhae/"
                rel="noopener noreferrer nofollow"
                target="_blank"><IoLogoLinkedin /></a
            >
        </div>
    </div>
</footer>

<style>
    footer {
        padding-top: var(--s0);
        margin-top: var(--s4);
        color: var(--high-contrast-color);
        font-family: var(--font-sans);
        font-size: 0.9rem;
    }
    .text {
        margin-bottom: var(--s0);
    }
    .wrapper {
        /* border-top: 1px solid var(--light-grey); */
        padding: var(--s0) 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    a {
        color: var(--high-contrast-color);
    }
    .icons a:not(:last-of-type) {
        margin-right: var(--s-2);
    }
    :global(.icons svg) {
        height: 1.5rem !important;
        width: auto !important;
        display: inline;
    }
    @media (max-width: 1023px) {
        .wrapper {
            display: block;
        }
        .text {
            margin-bottom: var(--s-1);
        }
    }
</style>
