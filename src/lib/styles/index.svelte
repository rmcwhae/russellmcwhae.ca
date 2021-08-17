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
    }
    :root,
    html body[data-theme='light'] {
        --background-color: white;
        --background-color-transparent: rgba(255, 255, 255, 0.8);
        --text-color: rgb(100, 100, 100);
        --high-contrast-color: black;
        --light-grey: #ccc;
        --medium-grey: #888;
        --blue: rgb(48, 89, 202);
        --blue-light: rgb(175, 194, 240);
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
    @media screen and (max-width: 1023px) {
        body {
            font-size: 1.2rem;
            line-height: 1.8rem;
        }
    }
    @media (prefers-color-scheme: dark) {
        body {
            --background-color: black;
            --background-color-transparent: rgba(0, 0, 0, 0.8);
            --high-contrast-color: white;
            --text-color: rgb(172, 172, 172);
            --light-grey: #333;
            --medium-grey: #999;
            --blue: rgb(175, 199, 255);
            --blue-light: rgb(56, 67, 102);
        }
    }
    a {
        color: var(--high-contrast-color);
    }
    main a {
        text-decoration: underline;
        /* box-shadow: inset 0 0 0 0 var(--blue-light); */
        transition: var(--duration);
    }
    main ul {
        padding-left: var(--s1);
    }
    main a:hover {
        /* box-shadow: inset 0 -5px 0 0 var(--blue-light); */
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
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
        max-width: 620px;
    }
    .footnote-backref {
        margin-left: var(--s-2);
    }
    article img {
        width: calc(100% + 2 * var(--s3));
        margin-left: calc(-1 * var(--s3));
        margin-right: calc(-1 * var(--s3));
    }
    article {
        margin: 0 auto;
    }
    article header {
        color: var(--high-contrast-color);
        /* margin-bottom: var(--s3); */
        margin-bottom: var(--s0);
        border-bottom: 2px solid var(--high-contrast-color);
    }
    article header,
    article nav,
    article img,
    article h2,
    article h3 {
        /* margin-left: calc(-1 * var(--s3)); */
        /* margin-right: calc(-1 * var(--s3)); */
    }
    @media screen and (max-width: 1200px) {
        article header,
        article nav,
        article img {
            margin-left: 0;
            margin-right: 0;
        }
        article img {
            width: 100%;
        }
    }
    .uppercase,
    article strong,
    .sub {
        text-transform: uppercase;
        font-size: 0.95rem;
        letter-spacing: 0.075em;
        line-height: 1.2em;
        font-weight: 700;
    }
    .sub {
        /* margin-top: var(--s1); */
    }
    .nowrap {
        white-space: nowrap;
    }
    article > * + * {
        margin-top: var(--s2);
    }
    @media (max-width: 1023px) {
        article > * + * {
            margin-top: var(--s1);
        }
    }
    article blockquote {
        margin-left: 0;
        padding-left: var(--s1);
        margin-right: var(--s1);
        border-left: 1px solid var(--light-grey);
        font-size: 1.05rem;
    }
    article pre {
        padding: var(--s-1) var(--s1);
        background: rgba(127, 127, 127, 0.15);
        border-radius: var(--radius);
    }
    article li p {
        margin: 0;
    }
    pre,
    code {
        white-space: pre-wrap;
        font-size: 0.8em;
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
        font-size: 3.25rem;
        line-height: 1em;
        margin: 0;
    }
    @media (max-width: 1023px) {
        h1 {
            font-size: 1.5em;
            /* text-align: center; */
        }
        h2 {
            font-size: 1.25em;
            /* text-align: center; */
        }
        article header {
            text-align: center;
        }
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
