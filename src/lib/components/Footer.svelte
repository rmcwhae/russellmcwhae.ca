<script>
    import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte'
    import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte'
    import IoIosMail from 'svelte-icons/io/IoIosMail.svelte'
</script>

<div class="icons">
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

<style>
    a {
        font-size: 1rem;
    }
    .icons {
        display: flex;
    }
    .icons a:not(:last-of-type) {
        margin-right: var(--s-2);
    }
    :global(.icons svg) {
        height: 1.5rem !important;
    }
    @media (max-width: 1023px) {
        .icons {
            justify-content: center;
        }
    }
</style>
