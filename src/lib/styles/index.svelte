<style global>
    :root {
        --radius: 8px;
        --ratio: 1.5;
        --duration: 0.2s;
        --sm: 640px;
        --md: 768px;
        --lg: 1024px;
        --xl: 1280px;
        --2xl: 1536px;
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
        --light-grey: rgb(218, 218, 218);
        --medium-grey: #888;
        --blue: rgb(48, 89, 202);
        --blue-light: rgb(175, 194, 240);
    }
    html body[data-theme='dark'] {
        --background-color: black;
        --background-color-transparent: rgba(0, 0, 0, 0.8);
        --high-contrast-color: white;
        --text-color: rgb(172, 172, 172);
        --light-grey: rgb(56, 56, 56);
        --medium-grey: #999;
        --blue: rgb(175, 199, 255);
        --blue-light: rgb(56, 67, 102);
    }
    @media (prefers-color-scheme: dark) {
        /* Necessary to duplicate code to prevent flash on dark mode */
        :root {
            --background-color: black;
            --background-color-transparent: rgba(0, 0, 0, 0.8);
            --high-contrast-color: white;
            --text-color: rgb(172, 172, 172);
            --light-grey: rgb(56, 56, 56);
            --medium-grey: #999;
            --blue: rgb(175, 199, 255);
            --blue-light: rgb(56, 67, 102);
        }
    }

    body {
        overflow-x: hidden;
        color: var(--text-color);
        background: var(--background-color);
        /* background: var(--background-color) url('./static/test.png') no-repeat;
        background-position: bottom center;
        background-size: 16rem auto; */
        transition: color ease var(--duration);
        transition: background-color ease var(--duration);
        margin: 0;
        box-sizing: border-box;
        font-family: source-sans-3, azo-sans-web, sans-serif;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    @media screen and (max-width: 1023px) {
        body {
            font-size: 1.2rem;
        }
    }
    a {
        color: var(--high-contrast-color);
    }
    a.button {
        font-weight: 600;
        font-size: 1rem;
        padding: var(--s-1) var(--s1);
        text-decoration: none;
        border: 1px solid var(--light-grey);
        border-radius: 50px;
    }
    a.button:hover {
        border-color: var(--medium-grey);
    }
    .flex {
        display: flex;
    }
    .items-center {
        align-items: center;
    }
    .justify-between {
        justify-content: space-between;
    }
    .two-col {
        columns: 2;
        column-gap: var(--s2);
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
    .border-bottom {
        border-bottom: 1px solid var(--light-grey);
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
        max-width: 70ch;
        margin: 0 auto;
    }
    .footnote-backref {
        margin-left: var(--s-2);
    }
    article img,
    .full-bleed {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        /* width: calc(100% + 2 * var(--s3));
        margin-left: calc(-1 * var(--s3));
        margin-right: calc(-1 * var(--s3)); */
    }
    article header {
        text-align: center;
        /* padding-bottom: var(--s0); */
        /* border-bottom: 1px solid var(--light-grey); */
    }
    @media screen and (max-width: 600px) {
        article img,
        .full-bleed {
            width: calc(100% + 2 * var(--s0));
            margin-left: calc(-1 * var(--s0));
            margin-right: calc(-1 * var(--s0));
        }
    }
    /* article header {
        margin-bottom: var(--s4);
    } */
    article header,
    article nav,
    article img {
        /* margin-left: calc(-1 * var(--s2));
        margin-right: calc(-1 * var(--s2)); */
    }
    article h2 {
        margin-top: var(--s4);
    }
    article h3 {
        margin-top: var(--s3);
    }
    @media screen and (max-width: 1200px) {
        article header,
        article nav {
            margin-left: 0;
            margin-right: 0;
        }
    }
    .uppercase,
    article strong {
        text-transform: uppercase;
        font-size: 0.95rem;
        letter-spacing: 0.075em;
        /* font-weight: 700; */
    }
    .sub {
        font-weight: 600;
        font-size: 0.9rem;
    }
    .nowrap {
        white-space: nowrap;
    }
    article > * + * {
        margin-top: var(--s1);
    }
    @media (max-width: 1023px) {
        article > * + * {
            margin-top: var(--s0);
        }
        article {
            margin: 0 auto;
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
        /* background: rgba(127, 127, 127, 0.15); */
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
    }
    article li p {
        margin: 0;
    }
    pre,
    code {
        white-space: pre-wrap;
        font-size: 0.8em;
        word-break: break-word;
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
        font-size: 3.052rem;
        line-height: 1;
        margin: 0;
    }
    h1,
    h2 {
        font-family: 'ibm-plex-serif';
        font-weight: normal;
    }
    h2 {
        font-size: 1.953rem;
    }
    h3 {
        font-size: 1.25rem;
        /* text-transform: uppercase;
        letter-spacing: 0.1em; */
    }
    @media (max-width: 640px) {
        h1 {
            font-size: 1.5rem;
        }
        h2 {
            font-size: 1.25rem;
        }
    }
    @media (max-width: 1023px) {
        /* h1 {
            font-size: 1.5em;
        }
        h2 {
            font-size: 1.25em;
        }
        article header {
            text-align: center;
            margin-bottom: var(--s1);
        } */
    }
    article > hr,
    div > hr {
        height: 1px;
        /* margin: var(--s3) 0; */
        padding: 0;
        border: none;
        border-top: 1px dashed var(--light-grey);
        color: var(--light-grey);
        text-align: center;
        overflow: visible;
    }
    .mt-0 {
        margin-top: calc(-1 * var(--s2));
    }
    @media screen and (max-width: 1023px) {
        .mt-0 {
            margin-top: 0;
        }
    }
</style>
