# My Portfolio

This is my portfolio, deployed to https://russellmcwhae.ca, featuring a fully responsive design and a light/dark mode toggle. Feel free to have a look under the hood. Built using [SvelteKit](https://kit.svelte.dev/). For some more detail on this project, see my journal entry, “[That New-Website Look](https://russellmcwhae.ca/journal/new-website/)”.

!["Desktop view"](./docs/desktop.png)

## Developing

To display images, you will need an [ImageKit](https://imagekit.io) account and to put your credentials in a `.env` file at the project root as in the `.env.template` file. [Portfolio](https://russellmcwhae.ca/photography) and [Event](https://russellmcwhae.ca/events) images are stored on ImageKit’s media library, with a folder structure as follows:

- portfolio
    - 1st image
    - 2nd image
    - etc.
- events
    - 1st-Event-Name_Month-YEAR
        - 1st image
        - 2nd image
        - etc.
    - 2nd-Event-Name_Month-YEAR
        - 1st image
        - 2nd image
        - etc.
    - etc.

For homepage images, add a “featured” tag to four ImageKit images in `/portfolio`. Captions can be added via a `caption` custom metadata field in ImageKit.

Next, install dependencies with `pnpm install`, then start the development server:

```bash
pnpm dev
```

## Deployment

`pnpm build` then `pnpm preview`.

## Testing

End-to-end testing is done with Cypress.

While running `pnpm dev`, run `pnpm exec cypress open` or `pnpm exec cypress run` to run tests.
