---
title: That New-Website Look
description: Rebuilding this website using SvelteKit.
author: Russell McWhae
date: 2021-10-12
draft: 0
category: Tech
---

<script>
  import ThemeSwitcher from '$lib/components/base/ThemeSwitcher.svelte'
</script>

Though still in beta, [SvelteKit](https://kit.svelte.dev/) is a very promising front-end framework. Its support for Markdown preprocessing, static website building, and its ability to compile into native JavaScript (with no external libraries to download) make it an ideal tool for a variety of web projects, especially relatively simple websites such as this one.

The previous version of this website, built in summer 2016, used a PHP back-end with jQuery for basic front-end interactivity. At the time, I described it as “a random patchwork of scripts cobbled together that somehow hasn’t exploded yet.” Five years later, I now make my livelihood as a software developer, so better code quality was certainly an objective of this rebuild.

This post is a quick look at how I designed and developed this latest incarnation of my personal website.

## Design

My goal in redesigning this website was to keep it as simple as possible. Except for images, everything is black and white. I found no good reason to incorporate colour into the design and thus left it out. This high-contrast, monochromatic colour scheme naturally symbolizes snow and rock in the mountains. In few other environments are things so often black and white. Most western Canadians should recognize the mountain that doubles as the “scroll to top” button in the footer (check the image filename if not).

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

## Development

As mentioned, this website is built using SvelteKit. Under the hood, SvelteKit uses [Vite](https://vitejs.dev/) for bundling, which was fabulously quick and reliable.

My journal entries are written in Markdown, so transferring these from the old PHP back-end involved simply pasting all the Markdown files into this project—data migration doesn’t get much simpler than that!

### Images

Photos are a big part of this website’s _raison d'être_, so I wanted to feature them extensively while also loading images as quickly as possible. On my previous website, image galleries relied too heavily on client-side JavaScript and were quite slow. The [Events](/events) page is now much more performant and engaging—kind of fun to look back on all the adventures I’ve had over the years. Photos are hosted on [Imagekit](https://imagekit.io/) and are also served via its responsive-image pipeline and CDN. Basically, by using their service (and staying within the free tier), image-loading performance is as good as possible, with minimal infrastructure for me to manage.

### Notable Packages

The following packages were quite helpful in the development of this site:

-   [mdsvex](https://mdsvex.pngwn.io/): for combined Markdown/Svelte content (such as the above inline light/dark mode toggle—slick!)
-   [remark-reading-time](https://github.com/mattjennings/remark-reading-time) for word counts and reading time estimates
-   [Svelte Gallery](https://www.npmjs.com/package/svelte-gallery) for the photo masonry grids
-   [PhotoSwipe](https://photoswipe.com/) (v5 beta) for the full-screen photo lightboxes

### Browser Support

I haven’t bothered testing this website in Internet Explorer 11. If it looks like garbage in your browser, then try something [more modern](https://bestvpn.org/outdatedbrowser/en).

### Deployment

This website is a perfect candidate for static export as the content changes relatively rarely (via SvelteKit’s [adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)). For a hobby site such as this, the [Netlify](https://www.netlify.com/) free tier is more than adequate for the build pipeline and hosting.

During development, I often deployed the code to my already-paid shared hosting account to minimize the number of build minutes consumed by Netlify (300 per month). To automate this, I created a local terminal alias that builds and then `rsync`s the files over `ssh` to the shared server when I type `deploy` (maybe this is useful to someone):

```
alias deploy="cd <local-repo-directory> && npm run build && rsync -cvzhe \"ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa_deploy\" --links --times --delete --recursive --safe-links <local repo directory>/build/ <username>@<server-ssh-address>:public_html"
```

Performance between the shared host and Netlify seemed fairly similar, though Netlify has a CDN and is probably a bit faster overall.

If you want to get really fancy, use [adapter-netlify](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify) to get dynamic server rendering via Netlify functions. One benefit of this approach would be getting the [events](/events) list to dynamically update when a new event gallery is uploaded in Imagekit. With the static export, a full rebuild is required every time a new event is added, requiring me to manually trigger a rebuild (via a custom webook mapped to a terminal alias). Given how rarely the content changes, dynamic server rendering is overkill for a site like this, but it’s nice to know that it’s wonderfully simple to implement.

## Conclusion

This was a fun project to keep occupied while avoiding summer smoke and shoulder season here in Revelstoke. I’ll echo the consensus that seems to be, uh, developing around SvelteKit (pun intended, as usual): that it offers a terrific developer experience building modern, speedy websites with minimal configuring. Lastly, feel free to take a look under the hood of this website at its [Github repository](https://github.com/rmcwhae/russellmcwhae.ca).
