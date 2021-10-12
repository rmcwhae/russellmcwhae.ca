<script>
    import { browser } from '$app/env'
    import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte'
    import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte'
    import IoIosMail from 'svelte-icons/io/IoIosMail.svelte'

    const year = new Date().getFullYear()

    function topFunction() {
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }
</script>

<footer class="restricted-width">
    <div class="up" on:click={topFunction} />
    <div class="wrapper flex justify-between align-center">
        <div>&copy; {year} Russell McWhae. Made in Canada, eh.</div>
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
        margin: var(--s4) auto 0;
        max-width: var(--lg);
        color: var(--high-contrast-color);
        font-size: 0.9rem;
        position: relative;
    }
    .wrapper {
        border-top: 1px solid var(--light-grey);
        padding: var(--s0) 0;
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
        .icons {
            text-align: center;
            margin: var(--s0) 0 var(--s2);
        }
        .icons a:not(:last-of-type) {
            margin-right: var(--s0);
        }
    }
</style>
