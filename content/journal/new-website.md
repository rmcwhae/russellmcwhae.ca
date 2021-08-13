---
title: That New-Website Look
description: Rebuilding this website using SvelteKit.
author: Russell McWhae
date: 2021-08-12
draft: 0
category: Tech
---

<script>
import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte'
  </script>

Though still in beta, [SvelteKit](https://kit.svelte.dev/) is a very promising front-end framework. Its support for Markdown preprocessing, static website building, and its ability to compile into native JavaScript (with no external libraries to download) make it an ideal tool for a variety of web projects, especially relatively simple websites such as this one.

The previous version of this website, built in summer 2016, used a PHP back-end with jQuery for basic front-end interactivity. At the time, I described it as “a random patchwork of scripts cobbled together that somehow hasn’t exploded yet.” Five years later, I now make my livelihood as a software developer, so better code quality was certainly an objective of this rebuild.

This post is a quick look at how I designed and developed this latest incarnation of my personal website.

## Design

My goal in redesigning this website was to keep it as simple as possible. Except for images, everything is black and white. I found no good reason to incorporate colour into the design and thus left it out. This high-contrast, monochromatic colour scheme naturally symbolizes snow and rock in the mountains. In few other environments are things so often black and white.

Depending on your device settings, you may be viewing this site in light or dark mode. This can be changed in the menu, or via this convenient button:

<ThemeSwitcher />

Your eyeballs will likely get zapped when going from dark to light mode. While good user experience would be to reduce the contrast between light and dark mode by dulling the colours, I have intentionally keep the transition quite jarring. Snowblindness can happen easily enough up high in the mountains, so a minor dose of it here might strengthen the symbolism of my black-and-white colour scheme.

For spacing within the layout, I implemented Every Layout’s [Modular scale](https://every-layout.dev/rudiments/modular-scale/), that defines harmonic root-level CSS variables:

```
:root {
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
}
```

Margins and padding can then be defined with values such as `var(--s0)` etc., which are perhaps less arbitrary than otherwise.

As for typography, simplicity again prevails: all fonts are different weights of a single typeface.

## Development

As mentioned, this website is built using SvelteKit. Under the hood, SvelteKit uses [Vite](https://vitejs.dev/) for bundling, which was fabulously quick and reliable. Hot-module replacement worked brilliantly.

My journal entries are written in Markdown, so transferring these from the old PHP back-end involved simply pasting all the Markdown files into this project—data migration doesn’t get much simpler than that!

### Browser Support

I haven‘t bothered testing this website in Internet Explorer 11. If it looks like garbage in your browser, then get a [real one](https://bestvpn.org/outdatedbrowser/en).

### Notable Packages

The following packages were quite helpful in the development of this site:

-   [mdsvex](https://mdsvex.pngwn.io/): for combined Markdown/Svelte content (such as the above inline light/dark mode toggle—slick!)
-   [remark-reading-time](https://github.com/mattjennings/remark-reading-time) for word counts and reading time estimates

### Deployment

As this website is still hosted on a shared Namecheap account, I perform the static export locally and upload only the final bundle of files. To automate this, I created a local terminal alias that builds and then `rsync`s the files over `ssh` when I type `deploy`:

```
alias deploy="cd <local-repo-directory> && npm run build && rsync -zhe \"ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa_deploy\" --links --times --delete --recursive --safe-links <local repo directory>/build/ <username>@<server-ssh-address>:public_html"
```

I likely could get away with the free tier on Heroku or another cloud service such as Amazon S3; however, that would require putting all my images in the cloud and crunching them during the static export process. I have enough images that it might start testing the limits of the free tiers of such cloud services, so I’ve decided to do all the building locally instead. I am also the only one working on this website, so there isn‘t a strong case for proper cloud deployments.

## Conclusion

This was a fun project to keep occupied while avoiding the smoke here in Revelstoke, BC. I’ll echo the consensus that seems to be developing around SvelteKit (pun intended, as usual): that it offers a terrific developer experience building modern, speedy websites with minimal configuring. Lastly, feel free to take a look under the hood of this website at its [Github repository](https://github.com/rmcwhae/russellmcwhae.ca).
