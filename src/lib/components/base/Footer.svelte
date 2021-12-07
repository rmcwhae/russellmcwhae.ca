<script>
    import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte'
    import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte'
    import IoIosMail from 'svelte-icons/io/IoIosMail.svelte'

    const year = new Date().getFullYear()

    function topFunction() {
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }
</script>

<footer>
    <div class="up" on:click={topFunction} title="Scroll to top" />
    <div class="wrapper">
        <div class="mb-s0">
            &copy; {year} Russell McWhae.
            <span class="nowrap">Made in Canada.</span>
        </div>
        <div class="icons">
            <!-- svelte-ignore a11y-invalid-attribute -->
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
                href="https://www.linkedin.com/notifications/"
                rel="noopener noreferrer nofollow"
                target="_blank"><IoLogoLinkedin /></a
            >
        </div>
    </div>
</footer>

<style>
    footer {
        padding-top: var(--s0);
        margin-top: var(--s5);
        color: var(--high-contrast-color);
        font-size: 0.9rem;
        position: relative;
    }
    .wrapper {
        border-top: 1px solid var(--light-grey);
        padding: var(--s0) var(--s3);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .up {
        position: absolute;
        left: calc(50% - 100px);
        top: 0;
        width: 200px;
        height: 100%;
        background: url('/assiniboine.png') center bottom no-repeat;
        background-size: auto 100%;
        cursor: pointer;
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
            padding: var(--s0) 33% var(--s0) var(--s0);
        }
        .up {
            width: 33%;
            right: var(--s0);
            left: inherit;
            top: inherit;
            bottom: 0;
            background-size: 100px 56.75px;
        }
    }
</style>
