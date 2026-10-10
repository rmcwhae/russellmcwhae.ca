<script>
    const year = new Date().getFullYear()
</script>

<footer>
    <p>&copy; {year} Russell McWhae.</p>
    <p>
        A personal collection of <a href="/photography">images</a> and
        <a href="/journal">words</a>.
    </p>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: var(--s1);
        margin-top: var(--s4);
        padding: var(--s2) 0 var(--s1);
        border-top: 1px solid var(--light-grey);
        color: var(--medium-grey);
        font-size: 0.85rem;
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

    @media (max-width: 700px) {
        footer {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
