<script>
    import Logo from '$lib/components/Logo.svelte'
</script>

<nav>
    <div><a href="/"><Logo /></a></div>
    <ul>
        <li><a href="/journal">Journal</a></li>
        <li><a href="/photography">Photography</a></li>
        <li><a href="/calendars">Calendars</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<style>
    li {
        display: inline;
    }
    li:not(:last-child) {
        margin-right: var(--s0);
    }
    nav {
        padding: var(--s1) 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: var(--s1);
    }
</style>
