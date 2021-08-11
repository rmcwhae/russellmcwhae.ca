---
title: That New-website Look
description: Rebuilding this website using SvelteKit.
author: Russell McWhae
date: 2021-08-11
draft: 0
category: Tech
---

Though still in beta, [SvelteKit](https://kit.svelte.dev/) is a very promising front-end framework. Its support for Markdown preprocessing, static exports, and vvv make it an ideal tool for projects such as this website.

https://github.com/rmcwhae/russellmcwhae.ca

## Design

Design minimalism: no colour, like in the mtns black and white. Eye-searing light/dark mode change

## Development

### Notable Packages

-   [MDSvex](https://mdsvex.pngwn.io/)
-   [remark-reading-time](https://github.com/mattjennings/remark-reading-time) for word counts and reading time estimates

### Deployment

As this website is still hosted on a shared Namecheap account, I perform the static export locally and upload only the final bundle of files. To automate this, I created a local terminal alias that builds and then `rsync`s the files over `ssh` when I type `deploy`:

```
alias deploy="cd <local-repo-directory> && npm run build && rsync -zhe \"ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa_deploy\" --links --times --delete --recursive --safe-links <local repo directory>/build/ <username>@<server-ssh-address>:public_html"
```

I likely could get away with the free tier on Heroku or another cloud service such as Amazon S3; however, that would require putting all my images in the cloud and crunching them during the static export process. I have enough images that it might start testing the limits of the free tiers of such cloud services, so I’ve decided to do all the building locally instead. I am also the only one working on this website, so there isn‘t a strong case for proper cloud deployments.

## Conclusion

This was a fun project to keep occupied while avoiding the smoke here in Revelstoke, BC. I‘ll echo the consenus that seems to be developing around SvelteKit: that it offers a terrific developer experience, building modern, speedy websites with minimal tinkering. Lastly, feel free to take a look under the hood of this website at its [Github repository](https://github.com/rmcwhae/russellmcwhae.ca).

## Ideas
