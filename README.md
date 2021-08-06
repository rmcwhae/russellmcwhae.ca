# My Portfolio

This is my portfolio, deployed to https://russellmcwhae.ca. Feel free to have a look under the hood. Built using [SvelteKit](https://kit.svelte.dev/).

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start the development server:

```bash
npm run dev
```

Note: photos are not under source control as they would take too much space.

## Building

To create the static export, run:

```bash
npm run build
```

This will create files in `/build` that can be deployed as you see fit. In my case, I am using `rsync` to deploy these to a shared host with a local terminal alias in my `.zprofile` (requires setting up a key such as `id_rsa_deploy` for password-less SSH access):

```bash
alias deploy="cd <local-repo-directory> && npm run build && rsync -zhe \"ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa_deploy\" --links --times --delete --recursive --safe-links <local repo directory>/build/ <username>@<server-ssh-address>:public_html"
```
