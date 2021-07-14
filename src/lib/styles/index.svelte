<style global>
    :root {
        --radius: 4px;
        --ratio: 1.5;
        --s-5: calc(var(--s-4) / var(--ratio));
        --s-4: calc(var(--s-3) / var(--ratio));
        --s-3: calc(var(--s-2) / var(--ratio));
        --s-2: calc(var(--s-1) / var(--ratio));
        --s-1: calc(var(--s0) / var(--ratio));
        --s0: 1rem;
        --s1: calc(var(--s0) * var(--ratio));
        --s2: calc(var(--s1) * var(--ratio));
        --s3: calc(var(--s2) * var(--ratio));
        --s4: calc(var(--s3) * var(--ratio));
        --s5: calc(var(--s4) * var(--ratio));

        --background-color: #eee;
        --text-color: black;
        --light-grey: #ccc;
        --medium-grey: #888;
    }

    body {
        color: var(--text-color);
        background: var(--background-color);
        margin: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    }
    a {
        color: var(--text-color);
    }
    @media (prefers-color-scheme: dark) {
        body {
            --background-color: black;
            --text-color: white;
            --light-grey: #333;
            --medium-grey: #999;
        }
    }
    html body[data-theme='light'] {
        --background-color: #eee;
        --text-color: black;
        --light-grey: #ccc;
        --medium-grey: #888;
    }
</style>
