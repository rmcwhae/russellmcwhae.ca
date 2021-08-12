<style global>
    :root {
        --radius: 4px;
        --ratio: 1.5;
        --duration: 0.2s;
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

        --background-color: white;
        --background-color-transparent: rgba(255, 255, 255, 0.8);
        --text-color: rgb(119, 119, 119);
        --high-contrast-color: black;
        --light-grey: #ccc;
        --medium-grey: #888;
    }

    body {
        overflow-x: hidden;
        color: var(--text-color);
        background: var(--background-color);
        transition: color ease var(--duration);
        transition: background-color ease var(--duration);
        margin: 0;
        box-sizing: border-box;
        font-family: source-sans-3, azo-sans-web, sans-serif;
        font-size: 1.125rem;
        line-height: 1.625rem;
    }
    a {
        color: var(--high-contrast-color);
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    @media (prefers-color-scheme: dark) {
        body {
            --background-color: black;
            --background-color-transparent: rgba(0, 0, 0, 0.8);

            --high-contrast-color: white;
            --text-color: rgb(172, 172, 172);
            --light-grey: #333;
            --medium-grey: #999;
        }
    }
    html body[data-theme='light'] {
        --background-color: white;
        --background-color-transparent: rgba(255, 255, 255, 0.8);
        --text-color: rgb(119, 119, 119);
        --high-contrast-color: black;
        --light-grey: #ccc;
        --medium-grey: #888;
    }
    .overflow-hidden {
        overflow: hidden;
    }
    .full-width {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
    }
    .restricted-width {
        max-width: 600px;
    }
    .footnote-backref {
        margin-left: var(--s-2);
    }
    img {
        max-width: 100%;
    }
    article {
        margin: 0 auto;
    }
    .uppercase,
    article strong {
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.125em;
        font-weight: normal;
    }
    .sub {
        font-size: 0.85rem;
        margin-top: var(--s-3);
        margin-bottom: var(--s-3);
    }
    .nowrap {
        white-space: nowrap;
    }
    nav.toc {
        /* padding-bottom: var(--s-2); */
        /* padding-top: var(--s2); */
        /* border-bottom: 1px solid var(--light-grey); */
        /* border-top: 1px solid var(--light-grey); */
    }
    nav.toc li {
        margin-top: var(--s-5);
    }
    nav.toc a {
        text-decoration: none;
    }
    article > * + * {
        margin-top: var(--s2);
    }
    article blockquote,
    article pre {
        margin-left: var(--s1);
        margin-right: var(--s1);
        font-size: 0.9em;
    }
    pre code {
        white-space: pre-wrap;
    }
    h1 a,
    h2 a,
    h3 a,
    h4 a,
    h5 a,
    h6 a {
        text-decoration: none;
        color: var(--high-contrast-color);
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: var(--high-contrast-color);
    }
    h1 {
        font-size: 2.5em;
        line-height: 1em;
        margin: 0;
    }
    h3 {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    article > hr,
    div > hr {
        height: 1px;
        margin: var(--s3) 0;
        padding: 0;
        border: none;
        border-top: 1px solid var(--light-grey);
        color: var(--light-grey);
        text-align: center;
        overflow: visible;
    }
</style>
