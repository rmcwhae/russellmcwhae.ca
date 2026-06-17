<script>
    import { resolve } from '$app/paths'

    const year = new Date().getFullYear()

    function openEmail(e) {
        e.preventDefault()
        window.location.href = window.atob(
            'bWFpbHRvOnJ1c3NlbGwubWN3aGFlQGdtYWlsLmNvbQ=='
        )
    }
</script>

<footer>
    <div class="footer-inner">
        <nav class="footer-nav">
            <a href={resolve('/photography')}>Photography</a>
            <a href={resolve('/journal')}>Journal</a>
            <a href={resolve('/reading-list')}>Reading List</a>
            <a href={resolve('/about')}>About</a>
        </nav>
        <div class="footer-social">
            <a
                href="https://github.com/rmcwhae"
                target="_blank"
                rel="noopener noreferrer nofollow">GitHub</a
            >
            <a
                href="https://www.linkedin.com/in/rmcwhae/"
                target="_blank"
                rel="noopener noreferrer nofollow">LinkedIn</a
            >
            <button onclick={openEmail}>Email</button>
        </div>
    </div>
    <div class="footer-copy">
        &copy; {year} Russell McWhae. Made in Canada.
    </div>
</footer>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    footer {
        border-top: 1px solid var(--light-grey);
        padding: var(--s2) 0 var(--s1);
        margin-top: var(--s4);
        font-family: var(--font-sans);
    }

    .footer-inner {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--s2);
        flex-wrap: wrap;
        margin-bottom: var(--s1);
    }

    .footer-nav,
    .footer-social {
        display: flex;
        gap: var(--s1);
        flex-wrap: wrap;
    }

    a,
    button {
        font-size: var(--text-sm);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-color);
        text-decoration: none;
        transition: color var(--duration);

        &:hover {
            color: var(--link-color);
        }
    }

    button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-family: inherit;
    }

    .footer-copy {
        font-size: var(--text-sm);
        color: var(--text-color);
    }
</style>
